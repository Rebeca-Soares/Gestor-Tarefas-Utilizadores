export class Comment {
    public id: number;
    public taskId: number;
    public userId: number;
    public message: string;
    public createdAt: Date;

    constructor(id: number, taskId: number, userId: number, message: string) {
        this.id = id;
        this.taskId = taskId;
        this.userId = userId;
        this.message = message;
        this.createdAt = new Date();
    }
}