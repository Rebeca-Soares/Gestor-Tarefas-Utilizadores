export class DependencyGraph<T> {

    private graph: Map<T, T[]> = new Map();

    addDependency(item: T, dependsOn: T): void {
        const currentDeps = this.graph.get(item) || [];
        
        if (!currentDeps.includes(dependsOn)) {
            currentDeps.push(dependsOn);
        }
        
        this.graph.set(item, currentDeps);
    }

    getDependencies(item: T): T[] {
        return this.graph.get(item) || [];
    }

    hasDependencies(item: T): boolean {
        const deps = this.graph.get(item);
        return deps !== undefined && deps.length > 0;
    }
}