import { TaskStatus } from "../utils/TaskStatus.js";
import { systemHistory } from "../logs/HistoryLog.js";
import { notificationService } from "../notifications/NotificationService.js";
import { assignmentService } from "./assignmentService.js";
import { deadlineService } from "./deadlineService.js";
export class AutomationRulesService {
    // --- REGRAS PARA TAREFAS ---
    applyRules(task) {
        this.checkCompletedRule(task);
        this.checkBlockedRule(task);
        this.checkExpirationRule(task);
    }
    checkCompletedRule(task) {
        // Regra: Se task ficar COMPLETED → criar log automático
        if (task.status === TaskStatus.Completed) {
            systemHistory.addLog(`Tarefa "${task.title}" foi concluída automaticamente.`);
        }
    }
    checkBlockedRule(task) {
        if (task.status === TaskStatus.Blocked) {
            notificationService.notify(`ALERTA: A tarefa "${task.title}" está bloqueada!`);
        }
    }
    checkExpirationRule(task) {
        if (deadlineService.getRelativeTime(task.deadline) === "Atrasada" && task.status !== TaskStatus.Completed) {
            task.status = TaskStatus.Blocked;
            systemHistory.addLog(`Tarefa "${task.title}" expirou e foi movida para BLOCKED.`);
            this.checkBlockedRule(task);
        }
    }
    // --- REGRAS PARA UTILIZADORES ---
    applyUserRules(user) {
        if (!user.isActive()) {
            const taskIds = assignmentService.getTasksFromUser(user.id);
            taskIds.forEach(taskId => {
                assignmentService.unassignUser(taskId, user.id);
            });
            systemHistory.addLog(`Utilizador "${user.name}" inativado: Atribuições removidas.`);
        }
    }
}
export const automationRulesService = new AutomationRulesService();
