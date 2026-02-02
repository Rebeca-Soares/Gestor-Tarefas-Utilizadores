export class PriorityManager<T> {

    private priorities: Map<T, number> = new Map();

    setPriority(item: T, value: number): void {
        this.priorities.set(item, value);
    }

    getPriority(item: T): number | undefined {
        return this.priorities.get(item);
    }

    getAll(): Map<T, number> {
        return this.priorities;
    }
}