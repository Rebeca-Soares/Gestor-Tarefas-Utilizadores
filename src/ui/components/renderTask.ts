// src/ui/components/renderTask.ts
import { statisticsService } from "../../services/StatisticsService.js";
import { taskService, TasksList } from "../../services/taskService.js"; 
import {
    list, contador, orderNameBtn, categoryDropdownBtn, categoryDropdownMenu, searchInput,
    clearCompletedBtn, openAddTaskModalBtn, closeAddTaskModal, addBtn,
    countAll,
    countPending,
    countBlocked,
    countExpired
} from "../dom/taskDom.js";
import { 
    handleAddTask, handleOrderTasks, handleSearchTasks, 
    handleCategoryFilter, handleClearCompleted 
} from "../handlers/taskHandlers.js";
import { createTaskElement } from "./taskComponent.js";
import { openAddTaskModal, closeAddTaskModalFunc } from "../modal/taskModal.js";
import { setupStatFilters } from "../handlers/taskHandlers.js"; 
import { currentUser } from "../../services/userService.js";
import { canCreateTask } from "../../security/permissionService.js";

export function renderTasks(tasks = taskService.getTasks()): void {
    if (!list) return;
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = createTaskElement(task, () => renderTasks());
        list.appendChild(li);
    });

    if (countAll) countAll.textContent = TasksList.length.toString();
    if (countPending) countPending.textContent = statisticsService.getPendingTasksCount().toString();
    if (countBlocked) countBlocked.textContent = statisticsService.getBlockedTasksCount().toString();
    if (countExpired) countExpired.textContent = statisticsService.getExpiredTasksCount().toString();

    if (contador) {
        contador.textContent = `Tarefas pendentes: ${statisticsService.getPendingTasksCount()}`;
    }

    // Atualização de estatísticas usando o serviço dedicado
    const pendentes = statisticsService.getPendingTasksCount();
    if (contador) {
        contador.textContent = `Tarefas pendentes: ${pendentes}`;
    }

    // Lógica do botão de limpar tarefas concluídas
    if (clearCompletedBtn) {
        const temConcluidas = statisticsService.hasCompletedTasks();
        clearCompletedBtn.style.display = temConcluidas ? 'inline-block' : 'none';
        clearCompletedBtn.onclick = handleClearCompleted;
    }
    if (openAddTaskModalBtn) {
        const podeCriar = currentUser && canCreateTask(currentUser.role);
        openAddTaskModalBtn.style.display = podeCriar ? 'block' : 'none';
    }
}

// --- VINCULAÇÃO DE EVENTOS ---

if (addBtn) addBtn.onclick = handleAddTask;

// Controle dos modais
if (openAddTaskModalBtn) openAddTaskModalBtn.onclick = openAddTaskModal;
if (closeAddTaskModal) closeAddTaskModal.onclick = closeAddTaskModalFunc;

// Ordenação e Busca
if (orderNameBtn) orderNameBtn.onclick = handleOrderTasks;

if (searchInput) {
    searchInput.oninput = () => {
        handleSearchTasks(searchInput.value);
    };
}

// Menu de Categorias
if (categoryDropdownBtn && categoryDropdownMenu) {
    categoryDropdownBtn.onclick = (e) => {
        e.stopPropagation();
        categoryDropdownMenu.style.display = categoryDropdownMenu.style.display === 'block' ? 'none' : 'block';
    };

    categoryDropdownMenu.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const category = target.getAttribute('data-category');
        if (category) {
            handleCategoryFilter(category);
            categoryDropdownMenu.style.display = 'none';
        }
    });
}

document.addEventListener('click', () => {
    if (categoryDropdownMenu) categoryDropdownMenu.style.display = 'none';
});


setupStatFilters();
