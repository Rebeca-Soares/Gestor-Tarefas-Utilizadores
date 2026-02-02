import { UserList, currentUser, loginAs } from "../../services/userService.js";
import { getInitials } from "../../utils/initials.js";
import { openUserModal } from "../modal/userModal.js";
import { listDiv, addBnt, filterActives, filterDesactive, searchInputUser, orderNameUser, info } from "../dom/userDom.js";
import { handleAddUser, handleSearchUsers, handleOrderUsers, handleDeleteUser, handleToggleUserStatus, showPopoverError } from "../handlers/userHandlers.js";
import { assignmentService } from "../../services/assignmentService.js";
import { renderTasks } from "./renderTask.js";
import { UserRole } from "../../security/UserRole.js";
import { WatcherSystem } from "../../utils/WatcherSystem.js";
import { followingListDiv } from "../dom/userDom.js";
const userWatcher = new WatcherSystem();
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
export function renderUsers(users = UserList.getAll()) {
    if (!listDiv)
        return;
    listDiv.innerHTML = '';
    users.forEach(u => {
        const tasksAssigment = assignmentService.getTasksFromUser(u.id).length;
        const card = document.createElement('div');
        card.className = 'userCard';
        const roleValue = u.getRole();
        const roleNome = UserRole[roleValue];
        const follower = currentUser;
        const isFollowing = follower ? userWatcher.getWatchers(u).includes(follower) : false;
        const isLogged = currentUser && currentUser.id === u.id;
        card.innerHTML = `
            <div class="user-top">
                <div class="avatar">${getInitials(u.name)}</div>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <span class="badge-role role-${roleNome.toLowerCase()}">${roleNome}</span>
                    <div class="status ${u.isActive() ? 'Ativo' : 'Inativo'}">${u.isActive() ? 'Ativo' : 'Inativo'}</div>
                </div>
            </div>
            <p><i class="bi bi-person"></i> <strong>Nome:</strong> ${u.name}</p>
            <p><i class="bi bi-envelope"></i> <strong>Email:</strong> ${u.email}</p>
            <p><i class="bi bi-list-task"></i> <strong>Tarefas:</strong> ${tasksAssigment} tarefas atribuídas</p>
            <div class="card-buttons">
                <button class="toggleStateBnt">${u.isActive() ? 'Desativar' : 'Ativar'}</button>
                <button class="removeUser"><i class="bi bi-trash3"></i></button> 
            </div>
            <div class="action-footer">
                <button class="loginBtn ${isLogged ? 'logged' : ''}" style="flex: 1;">
                    ${isLogged ? '<i class="bi bi-box-arrow-left"></i> Deslogar' : 'Logar'}
                </button>
            </div>
        `;
        // --- LÓGICA DO WATCHER (DENTRO DO FOREACH) ---
        const btnFollow = document.createElement('button');
        btnFollow.className = `btn-follow ${isFollowing ? 'active' : ''}`;
        btnFollow.innerHTML = isFollowing
            ? '<i class="bi bi-person-check-fill"></i> Seguindo'
            : '<i class="bi bi-person-plus"></i> Seguir';
        btnFollow.onclick = (e) => {
            e.stopPropagation();
            if (!follower) {
                showPopoverError(btnFollow, "Operação negada: Não podes seguir o teu próprio perfil.");
                return;
            }
            if (u.id === follower.id) {
                showPopoverError(btnFollow, "Não podes seguir o teu próprio perfil.");
                return;
            }
            if (isFollowing) {
                userWatcher.unwatch(u, follower);
            }
            else {
                userWatcher.watch(u, follower);
            }
            renderUsers();
            updateFollowingList();
        };
        const buttonsContainer = card.querySelector('.card-buttons');
        if (buttonsContainer)
            buttonsContainer.appendChild(btnFollow);
        const loginBtn = card.querySelector('.loginBtn');
        loginBtn.onclick = (e) => {
            e.stopPropagation();
            if (isLogged) {
                loginAs(null);
            }
            else {
                loginAs(u);
            }
            renderTasks();
            renderUsers();
        };
        const toggleBtn = card.querySelector('.toggleStateBnt');
        toggleBtn.onclick = (e) => { e.stopPropagation(); handleToggleUserStatus(u, e); };
        const deleteBtn = card.querySelector('.removeUser');
        deleteBtn.onclick = (e) => { e.stopPropagation(); handleDeleteUser(u.id, e); };
        card.onclick = () => openUserModal(u);
        listDiv.appendChild(card); // Adiciona o card completo à lista
    });
    updateFollowingList(); // Mantém o topo atualizado
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
    filterActives.onclick = () => renderUsers(UserList.getAll().filter(u => u.isActive()));
}
if (filterDesactive) {
    filterDesactive.onclick = () => renderUsers(UserList.getAll().filter(u => !u.isActive()));
}
function updateFollowingList() {
    if (!followingListDiv)
        return;
    if (!currentUser) {
        followingListDiv.innerHTML = '<span style="color: #888; font-size: 0.8rem;">Faz login para ver quem segues.</span>';
        return;
    }
    const seguidos = UserList.getAll().filter(u => userWatcher.getWatchers(u).includes(currentUser));
    if (seguidos.length === 0) {
        followingListDiv.innerHTML = '<span>Ainda não segues ninguém.</span>';
    }
    else {
        followingListDiv.innerHTML = '';
        seguidos.forEach(s => {
            const span = document.createElement('span');
            span.className = 'mini-badge-follow';
            span.textContent = s.name;
            followingListDiv.appendChild(span);
        });
    }
}
renderUsers(UserList.getAll());
