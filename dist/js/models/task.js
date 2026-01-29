import { BaseEntity } from './BaseEntity.js';
import { TaskStatus } from '../utils/TaskStatus.js';
export class TasksClass extends BaseEntity {
    title;
    category;
    completed;
    status;
    priority;
    deadline;
    dateConclusion;
    constructor(id, title, category, priority, status = TaskStatus.Created, deadline) {
        super(id);
        this.title = title;
        this.category = category;
        this.completed = false;
        this.status = status;
        this.priority = priority;
        this.deadline = deadline;
    }
    getType() {
        return "comum";
    }
    moveTo(newStatus) {
        this.status = newStatus;
        this.completed = (newStatus === TaskStatus.Completed);
        if (this.completed) {
            this.dateConclusion = new Date();
        }
        else {
            this.dateConclusion = undefined;
        }
    }
    markCompleted() {
        if (this.status === TaskStatus.Completed) {
            this.status = TaskStatus.InProgress;
            this.completed = false;
        }
        else {
            this.status = TaskStatus.Completed;
            this.completed = true;
        }
    }
}
