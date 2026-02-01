// src/services/automationRulesService.ts
import { TasksClass } from "../models/task.js";
import { UserClass } from "../models/User.js";
import { TaskStatus } from "../utils/TaskStatus.js";
import { systemHistory } from "../logs/HistoryLog.js";
import { notificationService } from "../notifications/NotificationService.js";
import { assignmentService } from "./assignmentService.js";
import { deadlineService } from "./deadlineService.js";

export class AutomationRulesService {

    // --- REGRAS PARA TAREFAS ---

    public applyRules(task: TasksClass): void {
        this.checkCompletedRule(task);
        this.checkBlockedRule(task);
        this.checkExpirationRule(task);
    }

    private checkCompletedRule(task: TasksClass): void {
        // Regra: Se task ficar COMPLETED → criar log automático
        if (task.status === TaskStatus.Completed) {
            systemHistory.addLog(`Tarefa "${task.title}" foi concluída automaticamente.`);
        }
    }

    private checkBlockedRule(task: TasksClass): void {
        if (task.status === TaskStatus.Blocked) {
            notificationService.notify(`ALERTA: A tarefa "${task.title}" está bloqueada!`);
        }
    }

    private checkExpirationRule(task: TasksClass): void {
        if (deadlineService.getRelativeTime(task.deadline) === "Atrasada" && task.status !== TaskStatus.Completed) {
            task.status = TaskStatus.Blocked;
            systemHistory.addLog(`Tarefa "${task.title}" expirou e foi movida para BLOCKED.`);
            this.checkBlockedRule(task); 
        }
    }

    // --- REGRAS PARA UTILIZADORES ---

    public applyUserRules(user: UserClass): void {

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