export class Favorites {
    items = [];
    add(item) {
        if (!this.exists(item)) {
            this.items.push(item);
        }
    }
    remove(item) {
        this.items = this.items.filter(i => i !== item);
    }
    exists(item) {
        return this.items.includes(item);
    }
    getAll() {
        return [...this.items];
    }
}
