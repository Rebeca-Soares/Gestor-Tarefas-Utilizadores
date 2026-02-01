import { UserList, addUser, removeUser } from "../../services/userService.js";
import { renderUsers, showMessage } from "../components/rederUsers.js";
import { nomeInput, emailInput, searchInputUser, orderNameUser, userRoleInput } from "../dom/userDom.js";
import { searchService } from "../../services/searchService.js";
import { renderTasks } from "../../ui/components/renderTask.js";
import { automationRulesService } from "../../services/automationRulesService.js";
import { UserClass } from "../../models/User.js";
import { UserRole } from "../../security/UserRole.js";
import { BusinessRules } from "../../services/BusinessRules.js";
import { assignmentService } from "../../services/assignmentService.js";
import { TasksClass } from "../../models/task.js";
import { TasksList } from "../../services/taskService.js";
import { TaskStatus } from "../../utils/TaskStatus.js";

let isUserSortedAsc = false;

export function handleAddUser(): void {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    const role = parseInt(userRoleInput.value);

    if (!BusinessRules.isValidTitle(nome)) {
        showMessage("O nome deve ter pelo menos 3 caracteres.", "error");
        return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showMessage("Introduza um email válido.", "error");
        return;
    }

    addUser(nome, email, role);
    nomeInput.value = '';
    emailInput.value = '';
    showMessage("Utilizador adicionado com sucesso!", "success");
    renderUsers();
}

export function handleEditRole(user: UserClass, event: MouseEvent): void {
    const existing = document.querySelector('.role-dropdown');
    if (existing) existing.remove();

    const dropdown = document.createElement('div');
    dropdown.className = 'role-dropdown';

    const roles = [
        { val: 0, label: 'ADMIN' },
        { val: 1, label: 'MANAGER' },
        { val: 2, label: 'MEMBER' },
        { val: 3, label: 'VIEWER' }
    ];

    dropdown.innerHTML = roles.map(r => `
        <div class="role-option ${user.getRole() === r.val ? 'selected' : ''}" data-value="${r.val}">
            ${r.label}
        </div>
    `).join('');

    dropdown.style.top = `${event.pageY}px`;
    dropdown.style.left = `${event.pageX}px`;

    document.body.appendChild(dropdown);

    dropdown.querySelectorAll('.role-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const newVal = parseInt((opt as HTMLElement).dataset.value!);
            user.setRole(newVal as UserRole);
            
            renderUsers(); 
            renderTasks(); 
            dropdown.remove();
        });
    });

    window.onclick = () => dropdown.remove();
}

export function handleSearchUsers(): void {
    const query = searchInputUser.value;
    const filteredResults = searchService.searchUsersByName(query);
    renderUsers(filteredResults);
}

export function handleOrderUsers(): void {
    isUserSortedAsc = !isUserSortedAsc;
    UserList.sort((a, b) => isUserSortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    
    if (orderNameUser) {
        orderNameUser.textContent = isUserSortedAsc ? "Ordenar Z-A" : "Ordenar A-Z";
    }
    renderUsers();
}

function showPopoverError(targetElement: HTMLElement, message: string) {
    const container = targetElement.parentElement;
    if (!container || container.querySelector('.popover-error')) return;

    const popover = document.createElement('span');
    popover.className = 'popover-error'; 
    popover.textContent = message;
    container.appendChild(popover);
    setTimeout(() => popover.remove(), 3000);
}

export function handleToggleUserStatus(user: UserClass, event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;

    if (user.isActive()) {

        const userTaskIds = assignmentService.getTasksFromUser(user.getId());
        
        const pendingTasksCount = TasksList.filter(task => 
            userTaskIds.includes(task.id) && task.status !== TaskStatus.Completed
        ).length;

        if (!BusinessRules.canUserBeDeactivated(pendingTasksCount)) {
            showPopoverError(button, "Utilizador tem tarefas pendentes!");
            return;
        }
    }
    
    user.toggleActive();
    automationRulesService.applyUserRules(user);
    renderUsers();
    renderTasks();
}

export function handleDeleteUser(id: number, event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const userTaskIds = assignmentService.getTasksFromUser(id);
    const pendingTasksCount = TasksList.filter(task => 
        userTaskIds.includes(task.id) && task.status !== TaskStatus.Completed
    ).length;

    if (!BusinessRules.canUserBeDeactivated(pendingTasksCount)) {
        showPopoverError(button, "Impossível apagar: tem tarefas pendentes!");
        return;
    }

    if (confirm("Deseja remover este utilizador permanentemente?")) {
        removeUser(id);
        renderUsers();
        renderTasks();
    }
}

