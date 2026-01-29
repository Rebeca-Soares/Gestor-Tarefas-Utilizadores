export class Attachment {
    public id: number;
    public taskId: number;
    public filename: string;
    public size: number;
    public url: string;   
    public uploadedAt: Date;

    constructor(id: number, taskId: number, filename: string, size: number, url: string) {
        this.id = id;
        this.taskId = taskId;
        this.filename = filename;
        this.size = size;
        this.url = url;
        this.uploadedAt = new Date();
    }
}