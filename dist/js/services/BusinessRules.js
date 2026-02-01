export class BusinessRules {
    static canUserBeDeactivated(activeTasks) {
        return activeTasks === 0;
    }
    static canTaskBeCompleted(isBlocked) {
        return !isBlocked;
    }
    static canAssignTask(active) {
        return active;
    }
    static isValidTitle(title) {
        return title.trim().length >= 5;
    }
}
