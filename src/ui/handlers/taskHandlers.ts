// src/ui/handlers/taskHandlers.ts
import { TaskStatus } from "../../utils/TaskStatus.js";
import { addTask, orderTasksByName, clearCompletedTasks, TasksList, removeTask, taskService, TaskFavorites, currentPage, setCurrentPage, getTotalPages } from "../../services/taskService.js";
import { renderTasks } from "../components/renderTask.js";
import { 
    input, categorySelect, prioritySelect, statusSelect, deadlineInput, 
    taskError, orderNameBtn, categoryDropdownBtn,
    userSelect
} from "../dom/taskDom.js";
import { closeAddTaskModalFunc } from "../modal/taskModal.js";
import { deadlineService } from "../../services/deadlineService.js";
import { renderUsers } from "../components/rederUsers.js";
import { tagService } from "../../services/tagService.js";
import { searchService } from "../../services/searchService.js";
import { assignmentService } from "../../services/assignmentService.js";
import { Category } from "../../models/task.js";
import { PriorityRoles } from "../../utils/priority.js";

let isSortedAscending = false;

let isFavFilterActive = false;

export function handleAddTask(): void {
    const title = input.value.trim();
    const category = categorySelect.value as Category;
    const priority = prioritySelect.value as unknown as PriorityRoles;
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
        const lastTask = TasksList.getAll()[TasksList.getAll().length - 1];
        
        if (lastTask) {
            tagService.addTag(lastTask, lastTask.category);
            tagService.addTag(lastTask, "Importante");

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
    } catch (err: any) {
        if (taskError) {
            taskError.textContent = err.message;
        }
    }
}

//ORDENAR TAREFAS POR NOME
export function handleOrderTasks(): void {
    isSortedAscending = !isSortedAscending;
    const sortedTasks = orderTasksByName(isSortedAscending);
    
    if (orderNameBtn) {
        orderNameBtn.textContent = isSortedAscending ? "Ordenar Z-A" : "Ordenar A-Z";
    }
    renderTasks(sortedTasks);
}

//REMOVER UMA TAREFA
export function handleRemoveTask(id: number): void {
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
export function handleCategoryFilter(category: string): void {
    setCurrentPage(1)
    const filtered = TasksList.getAll().filter(t => t.category === category); 
    renderTasks(filtered);
}

export function handleFilterFavorites(buttonElement: HTMLButtonElement): void {

    isFavFilterActive = !isFavFilterActive;

    if (isFavFilterActive) {
        const onlyFavs = taskService.getTasks().filter(task => TaskFavorites.exists(task));
        buttonElement.classList.add('active');
        renderTasks(onlyFavs);
    } else {
        buttonElement.classList.remove('active');
        renderTasks(); 
    }
}

//PESQUISA GLOBAL
export function handleSearchTasks(query: string): void {
    setCurrentPage(1)
    const filteredResults = searchService.globalSearch(query);
    renderTasks(filteredResults);
}

export function setupStatFilters(): void {
    const statAll = document.getElementById("statAll");
    const statPending = document.getElementById("statPending");
    const statBlocked = document.getElementById("statBlocked");
    const statExpired = document.getElementById("statExpired");

    if (statAll) statAll.onclick = () => renderTasks();
    
    if (statPending) {
        statPending.onclick = () => {
            const pending = TasksList.getAll().filter(t => !t.completed);
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
            const expired = TasksList.getAll().filter(t => deadlineService.getRelativeTime(t.deadline) === "Atrasada");
            renderTasks(expired);
        };
    }
}

export function handlePagination(direction: 'next' | 'prev'): void {
    const total = getTotalPages();

    if (direction === 'next' && currentPage < total) {
        setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }

    renderTasks(); 
}