import { TasksClass } from "../models/task.js";
import { TaskStatus } from "../utils/TaskStatus.js";
import { notificationService } from "../notifications/NotificationService.js";
import { PriorityRoles } from "../utils/priority.js";
import { assignmentService } from "./assignmentService.js";
import { automationRulesService } from "./automationRulesService.js";
import { BusinessRules } from "./BusinessRules.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { SystemLogger } from "../logs/SystemLogger.js";
import { EntityList } from "../utils/EntityList.js";
import { SimpleCache } from "../utils/SimpleCache.js";
import { Favorites } from "../utils/Favorites.js";
import { Paginator } from "../utils/Paginator.js";
export const TasksList = new EntityList();
const taskCache = new SimpleCache();
export const TaskFavorites = new Favorites();
export const taskPaginator = new Paginator();
TasksList.add(new TasksClass(1, "Estudar TypeScript", 'Estudo', PriorityRoles.MEDIUM, TaskStatus.Created));
TasksList.add(new TasksClass(2, "Ir na Academia", 'Pessoal', PriorityRoles.LOW, TaskStatus.Created));
TasksList.add(new TasksClass(3, "Revisar código", 'Trabalho', PriorityRoles.HIGH, TaskStatus.Blocked));
export function addTask(title, category, priority, status, deadline) {
    if (!BusinessRules.isValidTitle(title)) {
        throw new Error("O título deve ter pelo menos 3 caracteres.");
    }
    const newId = IdGenerator.generate();
    const newTask = new TasksClass(newId, title, category, priority, status, deadline);
    TasksList.add(newTask);
    SystemLogger.log(`Tarefa criada: ${title} (Prioridade: ${priority}, Status: ${TaskStatus[status]})`);
}
export function toggleTaskStatus(task) {
    const statusAnterior = task.status;
    task.markCompleted();
    automationRulesService.applyRules(task);
    SystemLogger.log(`Tarefa ${task.id} mudou de ${TaskStatus[statusAnterior]} para ${TaskStatus[task.status]}`);
    if (task.completed) {
        notificationService.notifyAdmins(`Tarefa finalizada: ${task.title}`);
    }
}
export function getTaskById(id) {
    let task = taskCache.get(id);
    if (!task) {
        task = TasksList.getAll().find(t => t.id === id);
        if (task)
            taskCache.set(id, task);
    }
    return task;
}
export function removeTask(id) {
    const assignedUsers = assignmentService.getUsersFromTask(id);
    assignedUsers.forEach(userId => {
        assignmentService.unassignUser(id, userId);
    });
    TasksList.remove(t => t.id === id);
    SystemLogger.log(`Tarefa ID ${id} removida do sistema`);
}
// Ordenação A-Z e Z-A
export function orderTasksByName(ascending) {
    return TasksList.getAll().sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return ascending ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
}
export function clearCompletedTasks() {
    const completedTasks = TasksList.getAll().filter(task => task.completed);
    completedTasks.forEach(task => {
        const assignedUsers = assignmentService.getUsersFromTask(task.id);
        assignedUsers.forEach(userId => assignmentService.unassignUser(task.id, userId));
    });
    TasksList.remove(t => t.completed === true);
    SystemLogger.log(`Limpeza de tarefas concluídas realizada.`);
}
export let currentPage = 1;
export const pageSize = 5;
export function setCurrentPage(page) {
    if (page < 1)
        return;
    currentPage = page;
    SystemLogger.log(`Navegação: Utilizador mudou para a página ${page}`);
}
export function getTotalPages() {
    return Math.ceil(TasksList.getAll().length / pageSize);
}
export const taskService = {
    getTasks: () => TasksList.getAll(),
    getTaskById: (id) => getTaskById(id),
    removeTask: (id) => {
        removeTask(id);
    },
    getPagedTasks: () => taskPaginator.paginate(TasksList.getAll(), currentPage, pageSize)
};
