// src/ui/components/taskComponent.ts
import { TasksClass } from "../../models/task.js";
import { formatData } from "../../utils/date.js";
import { taskService, toggleTaskStatus } from "../../services/taskService.js";
import { openEditModal, showAttachmentModal, showCommentModal } from "../modal/taskModal.js";
import { PriorityLabels } from "../../utils/priority.js";
import { StatusLabels, TaskStatus } from "../../utils/TaskStatus.js";
import { deadlineService } from "../../services/deadlineService.js";
import { assignmentService } from "../../services/assignmentService.js";
import { getInitials } from "../../utils/initials.js";
import { currentUser, UserList } from "../../services/userService.js";
import { attachmentService } from "../../services/attachmentService.js";
import { commentService } from "../../services/commentService.js";
import { tagService } from "../../services/tagService.js";
import { canDeleteTask, canEditTask } from "../../security/permissionService.js";

export function createTaskElement(task: TasksClass, onUpdate: () => void): HTMLLIElement {
    const li = document.createElement("li");
    li.className = 'task-item';

    const actions = document.createElement('div'); 
    actions.className = 'actions-container';

    // 2. LÓGICA DE DADOS 
    const prioridadeTexto = PriorityLabels[task.priority];
    const statusTexto = StatusLabels[task.status];
    const deadlineTexto = deadlineService.getRelativeTime(task.deadline);
    
    const deadlineHTML = deadlineTexto 
        ? `<span class="badge deadline-tag"><i class="bi bi-clock-history"></i> ${deadlineTexto}</span>` 
        : "";

    const tags = tagService.getTags(task.id);
    const tagsHTML = tags
        .filter(t => t !== task.category) 
        .map(t => `<span class="badge" >${t}</span>`)
        .join('');

    const assignedIds = assignmentService.getUsersFromTask(task.id);
    let avatarHTML = '';
    if(assignedIds.length > 0) {
        const user = UserList.find(u => u.id === assignedIds[0]);
        if (user) {
            avatarHTML = `<div class="task-user-avatar" title="Atribuída a: ${user.name}">${getInitials(user.name)}</div>`;
        }
    }

    const statusIcon = task.status === TaskStatus.Blocked ? '<i class="bi bi-ban"></i> ' : '';
    const statusClass = `status-${TaskStatus[task.status].toLowerCase()}`;

    // 3. CONSTRUÇÃO DO CARD
    const titleRow = document.createElement("div");
    titleRow.classList.add('title-row');
    titleRow.innerHTML = `
        <div class="info-container">
            <span class="task-title ${task.completed ? 'concluida' : ''}">${task.title}</span>
            <div class="badges-row">
                <span class="badge ${task.category.toLowerCase()}">${task.category}</span>
                ${tagsHTML}
                <span class="badge priority-${task.priority.toLowerCase()}">${prioridadeTexto}</span>
                <span class="badge ${statusClass}">${statusTexto}</span>
                ${deadlineHTML}
            </div>
        </div>
        ${avatarHTML}
    `;

    const textContainer = document.createElement("div");
    textContainer.appendChild(titleRow);

    if (task.completed && task.dateConclusion) {
        const small = document.createElement("small");
        small.textContent = `Concluída em: ${formatData(task.dateConclusion)}`;
        textContainer.appendChild(small);
    }

    // 4. BOTÕES COM PERMISSÕES (Exercício 8)
    
    const btnComment = document.createElement('button');
    btnComment.innerHTML = '<i class="bi bi-chat-left-dots"></i>';
    btnComment.className = 'btn-comment';
    btnComment.onclick = () => showCommentModal(task.id);
    if (commentService.getComments(task.id).length > 0) {
        const badge = document.createElement('span');
        badge.className = 'notification-badge';
        btnComment.appendChild(badge);
    }

    const btnAttach = document.createElement('button');
    btnAttach.innerHTML = '<i class="bi bi-paperclip"></i>';
    btnAttach.className = 'btn-attach';
    btnAttach.onclick = () => showAttachmentModal(task.id);
    if (attachmentService.getAttachments(task.id).length > 0) {
        const badge = document.createElement('span');
        badge.className = 'notification-badge';
        btnAttach.appendChild(badge);
    }

    actions.append(btnComment, btnAttach);

    // Botão Concluir/Desfazer
    const btnComplete = document.createElement('button');
    btnComplete.textContent = task.completed ? 'Desfazer' : 'Concluir';
    btnComplete.className = task.completed ? 'btn-undone' : 'btn-done';
    btnComplete.onclick = () => { 
        toggleTaskStatus(task); 
        onUpdate(); 
    };
    actions.append(btnComplete);

    // BOTÃO EDITAR
    if (currentUser && canEditTask(currentUser.role)) {
        const btnEdit = document.createElement('button');
        btnEdit.textContent = "Editar";
        btnEdit.className = "btn-edit";
        btnEdit.onclick = () => openEditModal(task);
        actions.append(btnEdit); 
    }

    // BOTÃO REMOVER
    if (currentUser && canDeleteTask(currentUser.role)) {
        const btnDel = document.createElement('button');
        btnDel.innerHTML = '<i class="bi bi-trash3"></i>';
        btnDel.className = "btn-remove";
        btnDel.onclick = () => {
            taskService.removeTask(task.id);
            onUpdate();
        };
        actions.append(btnDel);
    }

    li.append(textContainer, actions);
    return li;
}