// src/services/commentService.ts
import { Comment } from "../models/Comment.js";
export class CommentService {
    comments = [];
    addComment(taskId, userId, message) {
        const newId = Date.now();
        const newComment = new Comment(newId, taskId, userId, message);
        this.comments.push(newComment);
        return newComment;
    }
    getComments(taskId) {
        return this.comments.filter(c => c.taskId === taskId);
    }
    deleteComment(commentId) {
        this.comments = this.comments.filter(c => c.id !== commentId);
    }
}
export const commentService = new CommentService();
