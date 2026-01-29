import { TasksList } from "./taskService.js";

export class TagService {
    
    private taskTags: Map<number, string[]> = new Map();

    public addTag(taskId: number, tag: string): void {
        if (!this.taskTags.has(taskId)) {
            this.taskTags.set(taskId, []);
        }
        const tags = this.taskTags.get(taskId)!;
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    }

    public removeTag(taskId: number, tag: string): void {
        if (this.taskTags.has(taskId)) {
            const tags = this.taskTags.get(taskId)!;
            this.taskTags.set(taskId, tags.filter(t => t !== tag));
        }
    }

    public getTags(taskId: number): string[] {
        return this.taskTags.get(taskId) || [];
    }

    public getTasksByTag(tag: string) {
        
        return TasksList.filter(task => {
            const tags = this.getTags(task.id);
            return tags.includes(tag);
        });
    }
}

export const tagService = new TagService();