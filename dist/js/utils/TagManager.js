export class TagManager {
    tags = new Map();
    addTag(item, tag) {
        if (!this.tags.has(item)) {
            this.tags.set(item, []);
        }
        const currentTags = this.tags.get(item);
        // Evita duplicados
        if (!currentTags.includes(tag)) {
            currentTags.push(tag);
        }
    }
    removeTag(item, tag) {
        const currentTags = this.tags.get(item);
        if (currentTags) {
            const index = currentTags.indexOf(tag);
            if (index > -1) {
                currentTags.splice(index, 1);
            }
        }
    }
    getTags(item) {
        return this.tags.get(item) || [];
    }
}
