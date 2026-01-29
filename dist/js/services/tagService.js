import { TasksList } from "./taskService.js";
export class TagService {
    taskTags = new Map();
    addTag(taskId, tag) {
        if (!this.taskTags.has(taskId)) {
            this.taskTags.set(taskId, []);
        }
        const tags = this.taskTags.get(taskId);
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    }
    removeTag(taskId, tag) {
        if (this.taskTags.has(taskId)) {
            const tags = this.taskTags.get(taskId);
            this.taskTags.set(taskId, tags.filter(t => t !== tag));
        }
    }
    getTags(taskId) {
        return this.taskTags.get(taskId) || [];
    }
    getTasksByTag(tag) {
        return TasksList.filter(task => {
            const tags = this.getTags(task.id);
            return tags.includes(tag);
        });
    }
}
export const tagService = new TagService();
