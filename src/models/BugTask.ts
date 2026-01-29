import { ITask } from './ITask.js';
import { TaskStatus } from '../utils/TaskStatus.js';

export class BugTask implements ITask {
    public id: number;
    public title: string;
    public completed: boolean;
    public status: TaskStatus;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.completed = false;
        this.status = TaskStatus.Created; 
    }

    public getType(): string {
        return "bug"; 
    }

    public moveTo(newStatus: TaskStatus): void {
        if (this.status === TaskStatus.Archived) {
            throw new Error("Não é possível alterar o estado de uma tarefa arquivada.");
        }

        this.status = newStatus;

        this.completed = (newStatus === TaskStatus.Completed || newStatus === TaskStatus.Archived);
    }
}