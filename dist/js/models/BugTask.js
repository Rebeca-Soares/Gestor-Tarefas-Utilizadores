import { TaskStatus } from '../utils/TaskStatus.js';
export class BugTask {
    id;
    title;
    completed;
    status;
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.completed = false;
        this.status = TaskStatus.Created;
    }
    getType() {
        return "bug";
    }
    moveTo(newStatus) {
        if (this.status === TaskStatus.Archived) {
            throw new Error("Não é possível alterar o estado de uma tarefa arquivada.");
        }
        this.status = newStatus;
        this.completed = (newStatus === TaskStatus.Completed || newStatus === TaskStatus.Archived);
    }
}
