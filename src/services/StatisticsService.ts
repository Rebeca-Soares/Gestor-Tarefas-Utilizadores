// src/services/StatisticsService.ts
import { UserList } from "./userService.js";
import { TasksList } from "./taskService.js"; //
import { TaskStatus } from "../utils/TaskStatus.js";
import { deadlineService } from "./deadlineService.js";

export class StatisticsService {

    // --- Estatísticas de Utilizadores ---
    getTotalUsers(): number { return UserList.length; }
    getActiveUsersCount(): number { return UserList.filter(u => u.active).length; }
    getActivePercentage(): string {
        const total = this.getTotalUsers();
        const ativos = this.getActiveUsersCount();
        return total > 0 ? ((ativos / total) * 100).toFixed(0) : "0";
    }

    // --- ESTATÍSTICAS DE TAREFAS ---
    getPendingTasksCount(): number {
        return TasksList.filter(t => !t.completed).length;
    }

    hasCompletedTasks(): boolean {
        return TasksList.some(t => t.completed);
    }
    getBlockedTasksCount(): number {
        return TasksList.filter(t => t.status === TaskStatus.Blocked).length;
    }

    getExpiredTasksCount(): number {
        return TasksList.filter(t => deadlineService.getRelativeTime(t.deadline) === "Atrasada").length;
    }
}

export const statisticsService = new StatisticsService();