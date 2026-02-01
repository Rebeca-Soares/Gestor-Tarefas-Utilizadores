import { TasksClass, Category } from "../models/task.js";
import { TaskStatus } from "../utils/TaskStatus.js";
import { systemHistory } from "../logs/HistoryLog.js";
import { notificationService } from "../notifications/NotificationService.js";
import { PriorityRoles } from "../utils/priority.js"; 
import { assignmentService } from "./assignmentService.js";
import { automationRulesService } from "./automationRulesService.js";
import { BusinessRules } from "./BusinessRules.js";
import { IdGenerator } from "../utils/IdGenerator.js";

export let TasksList: TasksClass[] = [
    new TasksClass(1, "Estudar TypeScript", 'Estudo', PriorityRoles.MEDIUM, TaskStatus.Created), 
    new TasksClass(2, "Ir na Academia", 'Pessoal', PriorityRoles.LOW, TaskStatus.Created),
    new TasksClass(3, "Revisar código", 'Trabalho', PriorityRoles.HIGH, TaskStatus.Blocked),
    new TasksClass(4, "Projeto TypeScript", 'Trabalho', PriorityRoles.HIGH, TaskStatus.InProgress)
];

export function addTask(title: string, category: Category, priority: PriorityRoles, status: TaskStatus, deadline?: Date): void {
    
    if (!BusinessRules.isValidTitle(title)) {
        throw new Error("O título deve ter pelo menos 3 caracteres.");
    }
    const newId = IdGenerator.generate();
    const newTask = new TasksClass(newId, title, category, priority, status, deadline);
    TasksList.push(newTask);
    systemHistory.addLog(`Tarefa criada: ${title} (Prioridade: ${priority}, Status: ${TaskStatus[status]})`);
}

export function toggleTaskStatus(task: TasksClass): void {
    const statusAnterior = task.status;
    task.markCompleted();
    automationRulesService.applyRules(task);
    systemHistory.addLog(`Tarefa ${task.id} mudou de ${TaskStatus[statusAnterior]} para ${TaskStatus[task.status]}`);
    if (task.completed) {
        notificationService.notifyAdmins(`Tarefa finalizada: ${task.title}`);
    }
}

export function removeTask(id: number): void {
    const assignedUsers = assignmentService.getUsersFromTask(id);

    assignedUsers.forEach(userId => {
        assignmentService.unassignUser(id, userId);
    });

    TasksList = TasksList.filter(t => t.id !== id);
}


// Ordenação A-Z e Z-A
export function orderTasksByName(ascending: boolean): void {
    TasksList.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return ascending ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
}

export function clearCompletedTasks(): void {
    const completedTasks = TasksList.filter(task => task.completed);
    
    completedTasks.forEach(task => {
        const assignedUsers = assignmentService.getUsersFromTask(task.id);
        assignedUsers.forEach(userId => assignmentService.unassignUser(task.id, userId));
    });

    TasksList = TasksList.filter(task => !task.completed);
}

export const taskService = {
    getTasks: () => TasksList,
    removeTask: (id: number): void => {
        removeTask(id); 
    }
};