// src/services/StatisticsService.ts
import { UserList } from "./userService.js";
import { TasksList } from "./taskService.js"; //
import { TaskStatus } from "../utils/TaskStatus.js";
import { deadlineService } from "./deadlineService.js";
export class StatisticsService {
    // --- Estatísticas de Utilizadores ---
    getTotalUsers() { return UserList.length; }
    getActiveUsersCount() { return UserList.filter(u => u.isActive()).length; }
    getActivePercentage() {
        const total = this.getTotalUsers();
        const ativos = this.getActiveUsersCount();
        return total > 0 ? ((ativos / total) * 100).toFixed(0) : "0";
    }
    // --- ESTATÍSTICAS DE TAREFAS ---
    getPendingTasksCount() {
        return TasksList.filter(t => !t.completed).length;
    }
    hasCompletedTasks() {
        return TasksList.some(t => t.completed);
    }
    getBlockedTasksCount() {
        return TasksList.filter(t => t.status === TaskStatus.Blocked).length;
    }
    getExpiredTasksCount() {
        return TasksList.filter(t => deadlineService.getRelativeTime(t.deadline) === "Atrasada").length;
    }
}
export const statisticsService = new StatisticsService();
