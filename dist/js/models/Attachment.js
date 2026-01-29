export class Attachment {
    id;
    taskId;
    filename;
    size;
    url;
    uploadedAt;
    constructor(id, taskId, filename, size, url) {
        this.id = id;
        this.taskId = taskId;
        this.filename = filename;
        this.size = size;
        this.url = url;
        this.uploadedAt = new Date();
    }
}
