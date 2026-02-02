export class WatcherSystem {
    watchers = new Map();
    watch(target, user) {
        const list = this.getWatchers(target);
        list.push(user);
        this.watchers.set(target, list);
    }
    unwatch(target, user) {
        const list = this.getWatchers(target);
        // Filtrar a lista para remover o utilizador
        const newList = list.filter(w => w !== user);
        this.watchers.set(target, newList);
    }
    getWatchers(target) {
        return this.watchers.get(target) || [];
    }
}
