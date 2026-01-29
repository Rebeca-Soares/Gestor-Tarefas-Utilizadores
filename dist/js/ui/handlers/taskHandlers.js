// src/ui/handlers/taskHandlers.ts
import { TaskStatus } from "../../utils/TaskStatus.js";
import { addTask, orderTasksByName, clearCompletedTasks, TasksList, removeTask } from "../../services/taskService.js";
import { renderTasks } from "../components/renderTask.js";
import { input, categorySelect, prioritySelect, statusSelect, deadlineInput, taskError, orderNameBtn, userSelect } from "../dom/taskDom.js";
import { closeAddTaskModalFunc } from "../modal/taskModal.js";
import { deadlineService } from "../../services/deadlineService.js";
import { renderUsers } from "../components/rederUsers.js";
import { tagService } from "../../services/tagService.js";
import { searchService } from "../../services/searchService.js";
import { assignmentService } from "../../services/assignmentService.js";
let isSortedAscending = false;
//ADICIONAR UMA NOVA TAREFA
export function handleAddTask() {
    const title = input.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const status = Number(statusSelect.value) || 0;
    const deadline = deadlineInput.value ? new Date(deadlineInput.value) : undefined;
    const userId = userSelect && userSelect.value ? Number(userSelect.value) : null;
    if (title === "") {
        if (taskError) {
            taskError.textContent = "Por favor, preencha o título da tarefa.";
            taskError.classList.add("show");
            taskError.style.display = "block";
            input.classList.add("input-error");
        }
        return;
    }
    try {
        addTask(title, category, priority, status, deadline);
        const lastTask = TasksList[TasksList.length - 1];
        if (lastTask) {
            tagService.addTag(lastTask.id, lastTask.category);
            tagService.addTag(lastTask.id, "Importante");
            // Atribuição de utilizador
            if (userId !== null) {
                assignmentService.assignUser(lastTask.id, userId);
                renderUsers();
            }
        }
        // Limpeza e fecho do modal
        if (taskError) {
            taskError.classList.remove("show");
            taskError.style.display = "none";
        }
        input.classList.remove("input-error");
        closeAddTaskModalFunc();
        renderTasks();
    }
    catch (err) {
        if (taskError) {
            taskError.textContent = err.message;
        }
    }
}
//ORDENAR TAREFAS POR NOME
export function handleOrderTasks() {
    isSortedAscending = !isSortedAscending;
    orderTasksByName(isSortedAscending);
    if (orderNameBtn) {
        orderNameBtn.textContent = isSortedAscending ? "Ordenar Z-A" : "Ordenar A-Z";
    }
    renderTasks();
}
//REMOVER UMA TAREFA
export function handleRemoveTask(id) {
    removeTask(id);
    renderTasks();
    renderUsers();
}
//LIMPAR TAREFAS CONCLUIDAS
export const handleClearCompleted = () => {
    clearCompletedTasks();
    renderTasks();
    renderUsers();
};
//FILTRAR POR CATEGORIA
export function handleCategoryFilter(category) {
    // Nota: Poderia ser movido para o SearchService no futuro para centralização total
    const filtered = TasksList.filter(t => t.category === category);
    renderTasks(filtered);
}
//PESQUISA GLOBAL
export function handleSearchTasks(query) {
    const filteredResults = searchService.globalSearch(query);
    renderTasks(filteredResults);
}
export function setupStatFilters() {
    const statAll = document.getElementById("statAll");
    const statPending = document.getElementById("statPending");
    const statBlocked = document.getElementById("statBlocked");
    const statExpired = document.getElementById("statExpired");
    if (statAll)
        statAll.onclick = () => renderTasks(TasksList);
    if (statPending) {
        statPending.onclick = () => {
            const pending = TasksList.filter(t => !t.completed);
            renderTasks(pending);
        };
    }
    if (statBlocked) {
        statBlocked.onclick = () => {
            renderTasks(searchService.searchByStatus(TaskStatus.Blocked));
        };
    }
    if (statExpired) {
        statExpired.onclick = () => {
            // Usa o filtro de atrasadas
            const expired = TasksList.filter(t => deadlineService.getRelativeTime(t.deadline) === "Atrasada");
            renderTasks(expired);
        };
    }
}
