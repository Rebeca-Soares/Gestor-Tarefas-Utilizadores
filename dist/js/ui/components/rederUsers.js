import { UserList, currentUser, loginAs } from "../../services/userService.js";
import { getInitials } from "../../utils/initials.js";
import { openUserModal } from "../modal/userModal.js";
import { listDiv, addBnt, contadorAtivos, contadorDesactiveSpan, contadorTotalUsers, filterActives, filterDesactive, contadorPercentagemUsers, searchInputUser, orderNameUser, info } from "../dom/userDom.js";
import { handleAddUser, handleSearchUsers, handleOrderUsers, handleDeleteUser, handleToggleUserStatus, handleEditRole } from "../handlers/userHandlers.js";
import { statisticsService } from "../../services/StatisticsService.js";
import { assignmentService } from "../../services/assignmentService.js";
import { renderTasks } from "./renderTask.js";
import { UserRole } from "../../security/UserRole.js";
export function showMessage(message, type) {
    if (info) {
        info.textContent = message;
        info.className = 'info-message';
        info.classList.add(type === 'error' ? 'info-error' : 'info-success', 'info-show');
        setTimeout(() => {
            info.classList.remove('info-show');
        }, 3000);
    }
}
export function updateDashboardStats() {
    const total = statisticsService.getTotalUsers();
    const ativos = statisticsService.getActiveUsersCount();
    const inativos = total - ativos;
    const percentagem = statisticsService.getActivePercentage();
    if (contadorTotalUsers)
        contadorTotalUsers.textContent = total.toString();
    if (contadorAtivos)
        contadorAtivos.textContent = ativos.toString();
    if (contadorDesactiveSpan)
        contadorDesactiveSpan.textContent = inativos.toString();
    if (contadorPercentagemUsers)
        contadorPercentagemUsers.textContent = `${percentagem}%`;
}
export function renderUsers(users = UserList) {
    if (!listDiv)
        return;
    listDiv.innerHTML = '';
    users.forEach(u => {
        const tasksAssigment = assignmentService.getTasksFromUser(u.id).length;
        const card = document.createElement('div');
        card.className = 'userCard';
        const roleNome = UserRole[u.role];
        card.innerHTML = `
            <div class="user-top">
                <div class="avatar">${getInitials(u.name)}</div>
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <span class="badge-role role-${roleNome.toLowerCase()}">${roleNome}</span>
                        <div class="status ${u.active ? 'Ativo' : 'Inativo'}">
                            ${u.active ? 'Ativo' : 'Inativo'}
                        </div>
                    </div>
            </div>
            <p><i class="bi bi-person"></i> <strong>Nome:</strong> ${u.name}</p>
            <p><i class="bi bi-envelope"></i> <strong>Email:</strong> ${u.email}</p>
            <p><i class="bi bi-list-task"></i> <strong>Tarefas:</strong> ${tasksAssigment} tarefas atribuídas</p>

            <div class="card-buttons">
                <button class="toggleStateBnt">${u.active ? 'Desativar' : 'Ativar'}</button>
                <button class="removeUser"><i class="bi bi-trash3"></i></button> 
            </div>
            <div class="action-footer">
            <button class="loginBtn" style="flex: 1;">Logar</button>
            </div>
        `;
        if (currentUser && currentUser.role === UserRole.ADMIN) {
            const footer = card.querySelector('.action-footer');
            if (footer) {
                const btnEditRole = document.createElement('button');
                btnEditRole.innerHTML = '<i class="bi bi-shield-lock"></i>';
                btnEditRole.className = 'btn-edit-role';
                btnEditRole.title = "Alterar Cargo";
                btnEditRole.onclick = (e) => {
                    e.stopPropagation();
                    handleEditRole(u, e);
                };
                footer.appendChild(btnEditRole);
            }
        }
        card.onclick = () => openUserModal(u);
        const loginBtn = card.querySelector('.loginBtn');
        loginBtn.onclick = (e) => {
            e.stopPropagation();
            loginAs(u);
            renderTasks();
            renderUsers();
        };
        // Botão Alternar Estado (Ativo/Inativo)
        const toggleBtn = card.querySelector('.toggleStateBnt');
        toggleBtn.onclick = (e) => {
            e.stopPropagation();
            handleToggleUserStatus(u);
        };
        // Botão Remover Utilizador
        const deleteBtn = card.querySelector('.removeUser');
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            handleDeleteUser(u.id);
        };
        listDiv.appendChild(card);
    });
    updateDashboardStats();
}
// --- VINCULAÇÃO DE EVENTOS AOS HANDLERS ---
// Adicionar Utilizador
if (addBnt) {
    addBnt.onclick = handleAddUser;
}
// Procurar Utilizador (Input em tempo real)
if (searchInputUser) {
    searchInputUser.oninput = handleSearchUsers;
}
// Ordenar Utilizadores (A-Z / Z-A)
if (orderNameUser) {
    orderNameUser.onclick = handleOrderUsers;
}
// Filtros Rápidos (Ativos / Inativos)
if (filterActives) {
    filterActives.onclick = () => renderUsers(UserList.filter(u => u.active));
}
if (filterDesactive) {
    filterDesactive.onclick = () => renderUsers(UserList.filter(u => !u.active));
}
renderUsers();
