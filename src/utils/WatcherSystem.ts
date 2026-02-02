export class WatcherSystem<T, U> {

    private watchers: Map<T, U[]> = new Map();

    watch(target: T, user: U): void {
        const list = this.getWatchers(target);
        list.push(user);
        this.watchers.set(target, list);
    }

    unwatch(target: T, user: U): void {
        const list = this.getWatchers(target);
        // Filtrar a lista para remover o utilizador
        const newList = list.filter(w => w !== user);
        this.watchers.set(target, newList);
    }

    getWatchers(target: T): U[] {
        return this.watchers.get(target) || [];
    }
}