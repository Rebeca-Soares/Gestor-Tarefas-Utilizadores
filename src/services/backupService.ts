
// src/services/backupService.ts
import { UserList } from "./userService.js";
import { TasksList } from "./taskService.js";
import { assignmentService } from "./assignmentService.js";

export class BackupService {
    
    exportUsers(): string {
        return JSON.stringify(UserList, null, 2);
    }

    exportTasks(): string {
        return JSON.stringify(TasksList, null, 2);
    }

    exportAssignments(): string {
        const assignments = assignmentService.getAssignments();
        return JSON.stringify(Object.fromEntries(assignments), null, 2);
    }

    exportAll(): string {
        const fullBackup = {
            timestamp: new Date().toISOString(),
            users: UserList,
            tasks: TasksList,
            assignments: Object.fromEntries(assignmentService.getAssignments())
        };
        return JSON.stringify(fullBackup, null, 2);
    }
}

export const backupService = new BackupService();