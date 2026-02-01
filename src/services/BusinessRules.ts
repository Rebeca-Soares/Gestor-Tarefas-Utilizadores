export class BusinessRules {
    static canUserBeDeactivated(activeTasks: number): boolean {
        return activeTasks === 0;
    }

    static canTaskBeCompleted(isBlocked: boolean): boolean {
        return !isBlocked;
    }

    static canAssignTask(active: boolean): boolean {
        return active;
    }

    static isValidTitle(title: string): boolean {
        return title.trim().length >= 5;
    }
}