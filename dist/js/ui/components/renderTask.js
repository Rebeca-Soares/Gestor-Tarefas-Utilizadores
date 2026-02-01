// src/ui/components/renderTask.ts
import { statisticsService } from "../../services/StatisticsService.js";
import { currentPage, getTotalPages, taskService, TasksList } from "../../services/taskService.js";
import { list, contador, orderNameBtn, categoryDropdownBtn, categoryDropdownMenu, searchInput, clearCompletedBtn, openAddTaskModalBtn, closeAddTaskModal, addBtn, countAll, countPending, countBlocked, countExpired, filterFavsBtn, pageIndicator, prevPageBtn, nextPageBtn } from "../dom/taskDom.js";
import { handleAddTask, handleOrderTasks, handleSearchTasks, handleCategoryFilter, handleClearCompleted, handlePagination } from "../handlers/taskHandlers.js";
import { createTaskElement } from "./taskComponent.js";
import { openAddTaskModal, closeAddTaskModalFunc } from "../modal/taskModal.js";
import { setupStatFilters } from "../handlers/taskHandlers.js";
import { currentUser } from "../../services/userService.js";
import { canCreateTask } from "../../security/permissionService.js";
import { handleFilterFavorites } from "../handlers/taskHandlers.js";
export function renderTasks(tasks = taskService.getTasks()) {
    if (!list)
        return;
    list.innerHTML = "";
    const allTasks = taskService.getTasks();
    const tasksToRender = (tasks.length === allTasks.length)
        ? taskService.getPagedTasks()
        : tasks;
    tasksToRender.forEach(task => {
        const li = createTaskElement(task, () => renderTasks());
        list.appendChild(li);
    });
    if (countAll)
        countAll.textContent = TasksList.getAll().length.toString();
    if (countPending)
        countPending.textContent = statisticsService.getPendingTasksCount().toString();
    if (countBlocked)
        countBlocked.textContent = statisticsService.getBlockedTasksCount().toString();
    if (countExpired)
        countExpired.textContent = statisticsService.getExpiredTasksCount().toString();
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
        const podeCriar = currentUser && canCreateTask(currentUser.getRole());
        openAddTaskModalBtn.style.display = podeCriar ? 'block' : 'none';
    }
    // --- ATUALIZAÇÃO DA UI DE PAGINAÇÃO ---
    if (pageIndicator) {
        pageIndicator.textContent = `Página ${currentPage} de ${getTotalPages() || 1}`;
    }
    // Desativa botões se estivermos nos limites
    if (prevPageBtn)
        prevPageBtn.disabled = (currentPage === 1);
    if (nextPageBtn)
        nextPageBtn.disabled = (currentPage >= getTotalPages() || getTotalPages() === 0);
    // --- RESTANTE DAS ESTATÍSTICAS ---
    if (countAll)
        countAll.textContent = TasksList.getAll().length.toString();
}
// --- VINCULAÇÃO DE EVENTOS ---
if (addBtn)
    addBtn.onclick = handleAddTask;
// Controle dos modais
if (openAddTaskModalBtn)
    openAddTaskModalBtn.onclick = openAddTaskModal;
if (closeAddTaskModal)
    closeAddTaskModal.onclick = closeAddTaskModalFunc;
// Ordenação e Busca
if (orderNameBtn)
    orderNameBtn.onclick = handleOrderTasks;
if (searchInput) {
    searchInput.oninput = () => {
        handleSearchTasks(searchInput.value);
    };
}
if (filterFavsBtn) {
    filterFavsBtn.onclick = () => {
        handleFilterFavorites(filterFavsBtn);
    };
}
if (prevPageBtn) {
    prevPageBtn.onclick = () => handlePagination('prev');
}
if (nextPageBtn) {
    nextPageBtn.onclick = () => handlePagination('next');
}
// Menu de Categorias
if (categoryDropdownBtn && categoryDropdownMenu) {
    categoryDropdownBtn.onclick = (e) => {
        e.stopPropagation();
        categoryDropdownMenu.style.display = categoryDropdownMenu.style.display === 'block' ? 'none' : 'block';
    };
    categoryDropdownMenu.addEventListener('click', (e) => {
        const target = e.target;
        const category = target.getAttribute('data-category');
        if (category) {
            const label = category === "All" ? "Todas" : category;
            categoryDropdownBtn.innerHTML = `<i class="bi bi-funnel"></i> ${label} <i class="bi bi-chevron-down"></i>`;
            if (category === "All") {
                renderTasks();
            }
            else {
                handleCategoryFilter(category);
            }
            categoryDropdownMenu.style.display = 'none';
        }
    });
}
setupStatFilters();
