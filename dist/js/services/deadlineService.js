import { TasksList } from "./taskService.js";
export class DeadlineService {
    deadlines = new Map();
    setDeadline(taskId, date) {
        this.deadlines.set(taskId, date.getTime());
    }
    removeDeadline(taskId) {
        this.deadlines.delete(taskId);
    }
    getRelativeTime(deadline) {
        if (!deadline)
            return "";
        const now = this.getCurrentTimestamp();
        const deadlineTime = deadline.getTime();
        if (deadlineTime < now) {
            return "Atrasada";
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(deadline);
        targetDate.setHours(0, 0, 0, 0);
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0)
            return "Hoje";
        if (diffDays === 1)
            return "Amanhã";
        return `${diffDays} dias`;
    }
    isExpired(taskId) {
        const deadline = this.deadlines.get(taskId);
        if (deadline === undefined)
            return false;
        return deadline < this.getCurrentTimestamp();
    }
    getCurrentTimestamp() {
        return Date.now();
    }
    getExpiredTasks() {
        const now = this.getCurrentTimestamp();
        return TasksList.filter(task => {
            const taskDeadline = this.deadlines.get(task.id);
            return taskDeadline !== undefined && taskDeadline < now;
        });
    }
}
export const deadlineService = new DeadlineService();
