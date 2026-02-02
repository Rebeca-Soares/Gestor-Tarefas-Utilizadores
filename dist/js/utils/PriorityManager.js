export class PriorityManager {
    priorities = new Map();
    setPriority(item, value) {
        this.priorities.set(item, value);
    }
    getPriority(item) {
        return this.priorities.get(item);
    }
    getAll() {
        return this.priorities;
    }
}
