export class TagManager<T> {

    private tags: Map<T, string[]> = new Map();

    addTag(item: T, tag: string): void {
        if (!this.tags.has(item)) {
            this.tags.set(item, []);
        }
        
        const currentTags = this.tags.get(item)!;
        
        // Evita duplicados
        if (!currentTags.includes(tag)) {
            currentTags.push(tag);
        }
    }

    removeTag(item: T, tag: string): void {
        const currentTags = this.tags.get(item);
        if (currentTags) {
            const index = currentTags.indexOf(tag);
            if (index > -1) {
                currentTags.splice(index, 1);
            }
        }
    }

    getTags(item: T): string[] {
        return this.tags.get(item) || [];
    }
}