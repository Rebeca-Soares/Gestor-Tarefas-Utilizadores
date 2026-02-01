export class Favorites<T> {
    
    private items: T[] = [];

    add(item: T): void {
        if (!this.exists(item)) {
            this.items.push(item);
        }
    }

    remove(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    exists(item: T): boolean {
        return this.items.includes(item);
    }

    getAll(): T[] {
        return [...this.items];
    }
}