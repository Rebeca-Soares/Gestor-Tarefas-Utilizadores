import { TasksList } from "../services/taskService";
import { TasksClass} from "../models/task";
import { PriorityRoles } from "../utils/priority";

const taskPriorities = new Map<number, PriorityRoles>();

export function setPriority(taskId: number, priority: PriorityRoles): void {
        taskPriorities.set(taskId, priority)
}

export function getPriority(taskId: number): PriorityRoles | undefined {
    return taskPriorities.get(taskId)
}

export function getHighPriorityTasks(): TasksClass[] {
    const highPriorityIds: number[] = [];

    taskPriorities.forEach((priority, taskId) => {
        if (priority === PriorityRoles.HIGH || priority === PriorityRoles.CRITICAL) {
            highPriorityIds.push(taskId);
        }
    });

    return TasksList.filter(task => highPriorityIds.includes(task.id));
}
