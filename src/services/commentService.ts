// src/services/commentService.ts
import { Comment } from "../models/Comment.js";

export class CommentService {

    private comments: Comment[] = [];

    addComment(taskId: number, userId: number, message: string): Comment {

        const newId = Date.now(); 
        const newComment = new Comment(newId, taskId, userId, message);
        
        this.comments.push(newComment);
        return newComment;
    }

    getComments(taskId: number): Comment[] {
        return this.comments.filter(c => c.taskId === taskId);
    }

    deleteComment(commentId: number): void {
        this.comments = this.comments.filter(c => c.id !== commentId);
    }
}

export const commentService = new CommentService();