import { modalOverlay, modalContent } from "../dom/userDom.js";
import { assignmentService } from "../../services/assignmentService.js";
import { TasksList } from "../../services/taskService.js";
import { PriorityLabels } from "../../utils/priority.js";
import { StatusLabels } from "../../utils/TaskStatus.js";
import { deadlineService } from "../../services/deadlineService.js";
import { UserRole } from "../../security/UserRole.js";
export function openUserModal(user) {
    const assignedTaskIds = assignmentService.getTasksFromUser(user.id);
    const userTasks = TasksList.filter(task => assignedTaskIds.includes(task.id));
    const roleName = UserRole[user.getRole()];
    const tasksHtml = userTasks.length > 0
        ? userTasks.map(task => {
            const deadlineRelative = deadlineService.getRelativeTime(task.deadline);
            const deadlineDisplay = deadlineRelative ? ` - 📅 Deadline: ${deadlineRelative}` : "";
            return `
                <div class="user-task-item">
                    <strong>${task.title}</strong>
                    <div class="user-task-details">
                        <span>Tipo: ${task.category.toUpperCase()}</span> | 
                        <span>Importância: <strong>${PriorityLabels[task.priority]}</strong></span> | 
                        <span>Status: <strong>${StatusLabels[task.status]}</strong></span>
                        <span class="task-deadline-info">${deadlineDisplay}</span>
                    </div>
                </div>
            `;
        }).join('')
        : '<p class="no-tasks-msg">Este utilizador ainda não possui tarefas atribuídas.</p>';
    modalContent.innerHTML = `
        <button class="close-modal" id="closeUserModal">&times;</button>
        <div class="modal-user-header">
            <h2>${user.name}</h2>
            <small>ID: #${user.id} • Criado em: ${user.getCreatedAt().toLocaleDateString()}</small>
        </div>
        
        <div class="modal-user-body">
            <p><i class="bi bi-envelope"></i> <strong>Email:</strong> ${user.email}</p>
                <span class="status-pill ${user.isActive() ? 'status-active' : 'status-inactive'}">
                    ${user.isActive() ? 'Ativo' : 'Inativo'}
                </span>
                <span class="badge-role role-${roleName.toLowerCase()}" style="margin-left: 10px;">
                    ${roleName}
                </span>    
            </p>
        </div>

        <h3>Tarefas Atribuídas (${userTasks.length})</h3>
        
        <div class="tasks-scroll-area">
            ${tasksHtml}
        </div>
    `;
    modalOverlay.classList.add('show');
    const closeBtn = document.getElementById('closeUserModal');
    closeBtn.onclick = () => modalOverlay.classList.remove('show');
}
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay)
        modalOverlay.classList.remove('show');
});
