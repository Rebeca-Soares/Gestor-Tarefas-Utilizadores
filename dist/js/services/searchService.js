// src/services/searchService.ts
import { TasksList } from "./taskService.js";
import { assignmentService } from "./assignmentService.js";
import { UserList } from "./userService.js";
export class SearchService {
    searchByTitle(text) {
        const query = text.toLowerCase().trim();
        return TasksList.getAll().filter(task => task.title.toLowerCase().includes(query));
    }
    searchByUser(userId) {
        return TasksList.getAll().filter(task => {
            const assignedUsers = assignmentService.getUsersFromTask(task.id);
            return assignedUsers.includes(userId);
        });
    }
    searchByStatus(status) {
        return TasksList.getAll().filter(task => task.status === status);
    }
    globalSearch(query) {
        if (!query.trim())
            return TasksList.getAll();
        const resultsByTitle = this.searchByTitle(query);
        const statusQuery = parseInt(query);
        const resultsByStatus = !isNaN(statusQuery) ? this.searchByStatus(statusQuery) : [];
        const combined = [...resultsByTitle, ...resultsByStatus];
        return combined.filter((task, index, self) => index === self.findIndex((t) => t.id === task.id));
    }
    searchUsersByName(query) {
        const text = query.toLowerCase().trim();
        return UserList.getAll().filter(user => user.name.toLowerCase().includes(text));
    }
}
export const searchService = new SearchService();
