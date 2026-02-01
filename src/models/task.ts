import { BaseEntity } from './BaseEntity.js';
import { ITask } from './ITask.js';
import { TaskStatus } from '../utils/TaskStatus.js';
import { PriorityRoles } from '../utils/priority.js';

export type Category = 'Estudo' | 'Pessoal' | 'Trabalho';

export class TasksClass extends BaseEntity implements ITask {
    
    static allTasks: TasksClass[] = [];

    public title: string;
    public category: Category;
    public completed: boolean;
    public status: TaskStatus;
    public priority: PriorityRoles;
    public deadline?: Date;
    public dateConclusion?: Date;

    constructor(id: number, title: string, category: Category, priority: PriorityRoles, status: TaskStatus = TaskStatus.Created, deadline?: Date) {
        super(id); 
        this.title = title;
        this.category = category;
        this.completed = false;
        this.status = status;
        this.priority = priority;
        this.deadline = deadline;
    }

    getType(): string {
        return "comum";
    }

    moveTo(newStatus: TaskStatus): void {
        this.status = newStatus;
        this.completed = (newStatus === TaskStatus.Completed);
        
        if (this.completed) {
            this.dateConclusion = new Date();
        } else {
            this.dateConclusion = undefined;
        }
    }

    markCompleted(): void {
    if (this.status === TaskStatus.Completed) {
        this.status = TaskStatus.InProgress; 
        this.completed = false;
    } else {
        this.status = TaskStatus.Completed;
        this.completed = true;
    }
}
}