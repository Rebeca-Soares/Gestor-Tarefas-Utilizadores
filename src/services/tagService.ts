import { TagManager } from "../utils/TagManager.js";
import { TasksList } from "./taskService.js";
import { TasksClass } from "../models/task.js";

export class TagService {
    
    private manager = new TagManager<TasksClass>();

    public addTag(task: TasksClass, tag: string): void {
        this.manager.addTag(task, tag);
    }

    public removeTag(task: TasksClass, tag: string): void {
        this.manager.removeTag(task, tag);
    }

    public getTags(task: TasksClass): string[] {
        return this.manager.getTags(task);
    }

    public getTasksByTag(tag: string): TasksClass[] {
        return TasksList.getAll().filter(task => {
            const tags = this.getTags(task);
            return tags.includes(tag);
        });
    }
}

export const tagService = new TagService();