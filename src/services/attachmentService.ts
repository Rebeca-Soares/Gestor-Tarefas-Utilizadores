import { Attachment } from "../models/Attachment.js";

export class AttachmentService {
    private attachments: Attachment[] = [];


    public addAttachment(taskId: number, filename: string, size: number, url: string): Attachment {
        const newId = Date.now(); 
        const newAttachment = new Attachment(newId, taskId, filename, size, url);
        
        this.attachments.push(newAttachment);
        return newAttachment;
    }

    public getAttachments(taskId: number): Attachment[] {
        return this.attachments.filter(a => a.taskId === taskId);
    }


    public removeAttachment(attachmentId: number): void {
        this.attachments = this.attachments.filter(a => a.id !== attachmentId);
    }
}

export const attachmentService = new AttachmentService();