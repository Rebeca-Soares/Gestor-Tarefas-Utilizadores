export class EntityList {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return [...this.items];
    }
    remove(predicate) {
        this.items = this.items.filter(item => !predicate(item));
    }
    getById(id) {
        return this.items.find(item => item.id === id);
    }
}
