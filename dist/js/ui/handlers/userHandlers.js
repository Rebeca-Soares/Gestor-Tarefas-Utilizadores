import { UserList, addUser, removeUser } from "../../services/userService.js";
import { renderUsers, showMessage } from "../components/rederUsers.js";
import { nomeInput, emailInput, searchInputUser, orderNameUser, userRoleInput } from "../dom/userDom.js";
import { searchService } from "../../services/searchService.js";
import { renderTasks } from "../../ui/components/renderTask.js";
import { automationRulesService } from "../../services/automationRulesService.js";
let isUserSortedAsc = false;
export function handleAddUser() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const role = parseInt(userRoleInput.value);
    if (nome.length < 3) {
        showMessage("O nome deve ter pelo menos 3 caracteres.", "error");
        return;
    }
    if (!email.includes('@')) {
        showMessage("Introduza um email válido.", "error");
        return;
    }
    addUser(nome, email, role);
    nomeInput.value = '';
    emailInput.value = '';
    showMessage("Utilizador adicionado com sucesso!", "success");
    renderUsers();
}
export function handleEditRole(user, event) {
    const existing = document.querySelector('.role-dropdown');
    if (existing)
        existing.remove();
    const dropdown = document.createElement('div');
    dropdown.className = 'role-dropdown';
    const roles = [
        { val: 0, label: 'ADMIN' },
        { val: 1, label: 'MANAGER' },
        { val: 2, label: 'MEMBER' },
        { val: 3, label: 'VIEWER' }
    ];
    dropdown.innerHTML = roles.map(r => `
        <div class="role-option ${user.role === r.val ? 'selected' : ''}" data-value="${r.val}">
            ${r.label}
        </div>
    `).join('');
    dropdown.style.top = `${event.pageY}px`;
    dropdown.style.left = `${event.pageX}px`;
    document.body.appendChild(dropdown);
    dropdown.querySelectorAll('.role-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const newVal = parseInt(opt.dataset.value);
            user.role = newVal;
            renderUsers();
            renderTasks();
            dropdown.remove();
        });
    });
    setTimeout(() => {
        window.onclick = () => dropdown.remove();
    }, 0);
}
export function handleSearchUsers() {
    const query = searchInputUser.value;
    const filteredResults = searchService.searchUsersByName(query);
    renderUsers(filteredResults);
}
export function handleOrderUsers() {
    isUserSortedAsc = !isUserSortedAsc;
    UserList.sort((a, b) => isUserSortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    if (orderNameUser) {
        orderNameUser.textContent = isUserSortedAsc ? "Ordenar Z-A" : "Ordenar A-Z";
    }
    renderUsers();
}
export function handleToggleUserStatus(user) {
    user.toggleState();
    automationRulesService.applyUserRules(user);
    renderUsers();
    renderTasks();
}
export function handleDeleteUser(id) {
    removeUser(id);
    renderUsers();
    renderTasks();
}
