export class EntityList<T extends { id: number }> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items]; 
    }

    remove(predicate: (item: T) => boolean): void {
        this.items = this.items.filter(item => !predicate(item));
    }
    
    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
}