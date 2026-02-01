import { TagManager } from "../utils/TagManager.js";
import { TasksList } from "./taskService.js";
export class TagService {
    manager = new TagManager();
    addTag(task, tag) {
        // Agora usamos o método do manager genérico
        this.manager.addTag(task, tag);
    }
    removeTag(task, tag) {
        this.manager.removeTag(task, tag);
    }
    getTags(task) {
        return this.manager.getTags(task);
    }
    getTasksByTag(tag) {
        return TasksList.getAll().filter(task => {
            const tags = this.getTags(task);
            return tags.includes(tag);
        });
    }
}
export const tagService = new TagService();
