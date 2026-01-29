import { Attachment } from "../models/Attachment.js";
export class AttachmentService {
    attachments = [];
    addAttachment(taskId, filename, size, url) {
        const newId = Date.now();
        const newAttachment = new Attachment(newId, taskId, filename, size, url);
        this.attachments.push(newAttachment);
        return newAttachment;
    }
    getAttachments(taskId) {
        return this.attachments.filter(a => a.taskId === taskId);
    }
    removeAttachment(attachmentId) {
        this.attachments = this.attachments.filter(a => a.id !== attachmentId);
    }
}
export const attachmentService = new AttachmentService();
