export class DependencyGraph {
    graph = new Map();
    addDependency(item, dependsOn) {
        const currentDeps = this.graph.get(item) || [];
        // Evitar duplicados
        if (!currentDeps.includes(dependsOn)) {
            currentDeps.push(dependsOn);
        }
        this.graph.set(item, currentDeps);
    }
    getDependencies(item) {
        return this.graph.get(item) || [];
    }
    hasDependencies(item) {
        const deps = this.graph.get(item);
        return deps !== undefined && deps.length > 0;
    }
}
