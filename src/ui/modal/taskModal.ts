// src/ui/modal/taskModal.ts
import { commentService } from "../../services/commentService.js"; 
import { TasksClass, Category } from "../../models/task.js";
import { renderTasks } from "../components/renderTask.js";
import { 
    editTaskModal, editTaskInput, editTaskCategory, saveEditTaskBtn, closeModalBtn,
    commentModal, comentsContainer, closeCommentModal, addCommentBtn, newCommentInput,
    addTaskModal, input, deadlineInput,
    userSelect,
    editTaskUser,
    attachmentError,
    fileInput,
    fileNameDisplay
} from "../dom/taskDom.js";
import { 
    editTaskPriority, editTaskStatus, editTaskDeadline 
} from "../dom/taskDom.js";
import { TaskStatus } from "../../utils/TaskStatus.js";
import { PriorityRoles } from "../../utils/priority.js";
import { UserList } from "../../services/userService.js"; 
import { assignmentService } from "../../services/assignmentService.js";
import { renderUsers, showMessage } from "../../ui/components/rederUsers.js";
import { attachmentService } from "../../services/attachmentService.js";
import { attachmentModal, attachmentsContainer, attachmentNameInput, attachmentUrlInput, addAttachmentBtn, closeAttachmentModal } from "../dom/taskDom.js";
import { automationRulesService } from "../../services/automationRulesService.js";
import { BusinessRules } from "../../services/BusinessRules.js";


let taskBeingEdited: TasksClass | null = null;

// --- LÓGICA DE ADICIONAR (NOVA TAREFA) ---

function fillUserDropdown(selectElement: HTMLSelectElement): void {
    if (!selectElement) return;
    
    selectElement.innerHTML = '<option value="">Ninguém (Não atribuída)</option>';
    
    UserList.forEach(user => {
        if (BusinessRules.canAssignTask(user.isActive())) {
            const option = document.createElement("option");
            option.value = user.getId().toString();
            option.textContent = user.name;
            selectElement.appendChild(option);
        }
    });
}


export function openAddTaskModal(): void {
    if (addTaskModal) {
        if (userSelect) fillUserDropdown(userSelect);
        
        addTaskModal.classList.add('show');
        if (input) input.focus();
    }
}

export function closeAddTaskModalFunc(): void {
    if (addTaskModal) {
        addTaskModal.classList.remove('show');
        if (input) input.value = "";
        if (deadlineInput) deadlineInput.value = "";
        if (userSelect) userSelect.value = ""; 
    }
}

export function showAttachmentModal(taskId: number): void {
    const renderAttachments = () => {
        const attachments = attachmentService.getAttachments(taskId);
        
        if (attachments.length === 0) {
            attachmentsContainer.innerHTML = '<p>Sem anexos nesta tarefa.</p>';
            return;
        }

        attachmentsContainer.innerHTML = attachments.map(a => {
            // Formatação do tamanho
            const fileSize = a.size > 1024 * 1024 
                ? (a.size / (1024 * 1024)).toFixed(1) + ' MB' 
                : a.size > 1024 
                    ? (a.size / 1024).toFixed(1) + ' KB' 
                    : a.size + ' Bytes';

            return `
            <div class="attachment-item">
                <div class="attachment-info">
                    <i class="bi bi-file-earmark-text"></i>
                    <div>
                        <a href="${a.url}" target="_blank">${a.filename}</a>
                        <div class="attachment-meta">
                            <small>Enviado em: ${a.uploadedAt.toLocaleDateString()}</small>
                            <small> • Tamanho: ${fileSize}</small>
                        </div>
                    </div>
                </div>
                <button class="btn-del-attach" data-id="${a.id}" title="Remover anexo">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            `;
        }).join('');

        // REMOVER ANEXO
        attachmentsContainer.querySelectorAll('.btn-del-attach').forEach(btn => {
            (btn as HTMLButtonElement).onclick = () => {
                const attachId = Number((btn as HTMLButtonElement).dataset.id);
                attachmentService.removeAttachment(attachId);
                renderAttachments();
                renderTasks();
            };
        });
    };

    // Atualizar o nome no display quando o ficheiro é selecionado
    if (fileInput) {
        fileInput.onchange = () => {
            if (fileInput.files && fileInput.files.length > 0) {
                fileNameDisplay.textContent = `Selecionado: ${fileInput.files[0].name}`;
            }
        };
    }

    renderAttachments();
    attachmentModal.classList.add('show');

    if (closeAttachmentModal) closeAttachmentModal.onclick = () => attachmentModal.classList.remove('show');

    if (addAttachmentBtn) {
        addAttachmentBtn.onclick = () => {
            const file = fileInput.files ? fileInput.files[0] : null;
            const manualName = attachmentNameInput.value.trim();
            const manualUrl = attachmentUrlInput.value.trim();

            if (attachmentError) attachmentError.style.display = "none";

            if (file) {

                attachmentService.addAttachment(taskId, file.name, file.size, "#");
                limparCamposAnexo();
            } 
            else if (manualName && manualUrl) {
                attachmentService.addAttachment(taskId, manualName, 1024, manualUrl);
                limparCamposAnexo();
            } 
            else {
                if (attachmentError) {
                    attachmentError.textContent = "Selecione um ficheiro ou preencha Nome e URL.";
                    attachmentError.style.display = "block";
                }
            }
        };
    }

    const limparCamposAnexo = () => {
        fileInput.value = "";
        fileNameDisplay.textContent = "Nenhum ficheiro selecionado";
        attachmentNameInput.value = "";
        attachmentUrlInput.value = "";
        if (attachmentError) attachmentError.style.display = "none";
        renderAttachments(); 
        renderTasks();
    };
}

// --- LÓGICA DE EDIÇÃO ---

export function openEditModal(task: TasksClass) {
    taskBeingEdited = task;

    if (editTaskUser) {
        fillUserDropdown(editTaskUser);

        const currentUsers = assignmentService.getUsersFromTask(task.id);
        if (currentUsers.length > 0) {
            editTaskUser.value = currentUsers[0].toString();
        } else {
            editTaskUser.value = "";
        }
    }

    editTaskInput.value = task.title;
    editTaskCategory.value = task.category;
    
    if (editTaskPriority) editTaskPriority.value = task.priority;
    if (editTaskStatus) editTaskStatus.value = task.status.toString();
    
    if (editTaskDeadline) {
        editTaskDeadline.value = task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : "";
    }

    editTaskModal.classList.add('show');
}

export function closeEditModalFunc() {
    if (editTaskModal) editTaskModal.classList.remove('show');
    taskBeingEdited = null;
}

if (closeModalBtn) closeModalBtn.onclick = closeEditModalFunc;

if (saveEditTaskBtn) {
    saveEditTaskBtn.onclick = () => {
        if (taskBeingEdited) {
            const newTitle = editTaskInput.value.trim();

            if (!BusinessRules.isValidTitle(newTitle)) {
                const errorSpan = editTaskInput.nextElementSibling as HTMLElement;

                if (errorSpan && errorSpan.classList.contains('task-error')) {
                    errorSpan.textContent = "Mínimo 4 caracteres";
                    errorSpan.classList.add('show'); // Classe que ativa o balão (Popover)
                    editTaskInput.classList.add('input-error'); // Borda vermelha

                    // Esconde o popover após 3 segundos
                    setTimeout(() => {
                        errorSpan.classList.remove('show');
                        editTaskInput.classList.remove('input-error');
                    }, 3000);
                }
                return;
            }

            taskBeingEdited.title = newTitle;
            taskBeingEdited.category = editTaskCategory.value as Category;
            
            if (editTaskPriority) taskBeingEdited.priority = editTaskPriority.value as PriorityRoles;
            if (editTaskStatus) taskBeingEdited.status = Number(editTaskStatus.value) as TaskStatus;
            
            if (editTaskDeadline && editTaskDeadline.value) {
                taskBeingEdited.deadline = new Date(editTaskDeadline.value);
            } else {
                taskBeingEdited.deadline = undefined;
            }

            const taskId = taskBeingEdited.getId();

            if (editTaskUser) {
                const newUserId = editTaskUser.value ? Number(editTaskUser.value) : null;
                const currentUsers = assignmentService.getUsersFromTask(taskId);

                if (newUserId !== null) {
                    currentUsers.forEach(oldId => assignmentService.unassignUser(taskId, oldId));
                    assignmentService.assignUser(taskId, newUserId);
                }
            }

            automationRulesService.applyRules(taskBeingEdited);
            showMessage("Tarefa atualizada com sucesso!", "success");
            renderTasks();
            renderUsers();
            closeEditModalFunc();
        }
    };
}

// --- LÓGICA DE COMENTÁRIOS ---
export function showCommentModal(taskId: number): void {
    const renderList = () => {
        const comments = commentService.getComments(taskId);
        
        if (comments.length === 0) {
            comentsContainer.innerHTML = '<p class="no-comments">Sem comentários.</p>';
            return;
        }

        comentsContainer.innerHTML = comments.map(c => `
            <div class="comment-item">
                <div class="comment-content">
                    <p class="comment-text">${c.message}</p>
                    <small class="comment-date">${c.createdAt.toLocaleString()}</small>
                </div>
                <button class="btn-del-comment" data-id="${c.id}" title="Remover">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        `).join('');

        const deleteButtons = comentsContainer.querySelectorAll('.btn-del-comment');
        deleteButtons.forEach(btn => {
            (btn as HTMLButtonElement).onclick = () => {
                const commentId = Number((btn as HTMLButtonElement).dataset.id);
                commentService.deleteComment(commentId);
                renderList();
                renderTasks();
            };
        });
    };

    renderList();
    commentModal.classList.add('show');

    if (closeCommentModal) closeCommentModal.onclick = () => commentModal.classList.remove('show');
    
    if (addCommentBtn) {
        addCommentBtn.onclick = () => {
            const msg = newCommentInput.value.trim();
            if (msg) {
                commentService.addComment(taskId, 1, msg);
                newCommentInput.value = "";
                renderList();
                renderTasks();
            }
        };
    }
}

window.onclick = (event) => {
    if (event.target === addTaskModal) closeAddTaskModalFunc();
    if (event.target === editTaskModal) closeEditModalFunc();
    if (event.target === commentModal) commentModal.classList.remove('show');
};