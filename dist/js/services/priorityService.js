import { TasksList } from "../services/taskService";
import { PriorityRoles } from "../utils/priority";
const taskPriorities = new Map();
export function setPriority(taskId, priority) {
    taskPriorities.set(taskId, priority);
}
export function getPriority(taskId) {
    return taskPriorities.get(taskId);
}
export function getHighPriorityTasks() {
    const highPriorityIds = [];
    taskPriorities.forEach((priority, taskId) => {
        if (priority === PriorityRoles.HIGH || priority === PriorityRoles.CRITICAL) {
            highPriorityIds.push(taskId);
        }
    });
    return TasksList.getAll().filter(task => highPriorityIds.includes(task.id));
}
