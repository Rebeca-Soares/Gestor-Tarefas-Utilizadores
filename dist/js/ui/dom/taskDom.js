// --- ELEMENTOS GERAIS DA PÁGINA ---
export const list = document.getElementById("list");
export const contador = document.getElementById("counterTasks");
export const taskError = document.getElementById("taskError");
export const clearCompletedBtn = document.getElementById('clearCompleted');
export const orderNameBtn = document.getElementById('orderNameTask');
export const searchInput = document.getElementById('searchTask');
// src/ui/dom/taskDom.ts
export const userSelect = document.getElementById('userSelect');
export const editTaskUser = document.getElementById('editTaskUser');
export const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');
export const categoryDropdownMenu = document.getElementById('categoryDropdownMenu');
export const navTasks = document.getElementById("navTasks");
export const tasksSection = document.getElementById("tasksSection");
export const headerTitle = document.getElementById('headerTitle');
// --- MODAL: ADICIONAR NOVA TAREFA (O que você está criando agora) ---
/** O contentor principal do modal de criação */
export const addTaskModal = document.getElementById('addTaskModal');
/** Botão na página principal que abre este modal */
export const openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn');
/** O "X" ou botão de fechar dentro do modal de criação */
export const closeAddTaskModal = document.getElementById('closeAddTaskModal');
/** Campos do formulário dentro do modal de criação */
export const input = document.getElementById("taskInput");
export const categorySelect = document.getElementById('categorySelect');
export const prioritySelect = document.getElementById('prioritySelect');
export const statusSelect = document.getElementById('statusSelect');
export const deadlineInput = document.getElementById('deadlineInput');
export const addBtn = document.getElementById("addBtn");
// --- MODAL: EDIÇÃO DE TAREFA (A versão que você já tinha) ---
export const editTaskModal = document.getElementById('editTaskModal');
export const editTaskInput = document.getElementById('editTaskInput');
export const editTaskCategory = document.getElementById('editTaskCategory');
export const saveEditTaskBtn = document.getElementById('saveEditTaskBtn');
export const closeModalBtn = document.getElementById('closeEditTaskModal');
// Seletores opcionais para edição avançada (caso queira editar prioridade no futuro)
export const editTaskPriority = document.getElementById('editTaskPriority');
export const editTaskStatus = document.getElementById('editTaskStatus');
export const editTaskDeadline = document.getElementById('editTaskDeadline');
// --- MODAL: COMENTÁRIOS ---
export const commentModal = document.getElementById('commentModal');
export const comentsContainer = document.getElementById('comentsContainer');
export const closeCommentModal = document.getElementById('closeCommentModal');
export const addCommentBtn = document.getElementById('addCommentBtn');
export const newCommentInput = document.getElementById('newCommentInput');
// Adicione ao seu src/ui/dom/taskDom.ts
export const countAll = document.getElementById("countAll");
export const countPending = document.getElementById("countPending");
export const countBlocked = document.getElementById("countBlocked");
export const countExpired = document.getElementById("countExpired");
export const statAll = document.getElementById("statAll");
export const statPending = document.getElementById("statPending");
export const statBlocked = document.getElementById("statBlocked");
export const statExpired = document.getElementById("statExpired");
export const attachmentModal = document.getElementById('attachmentModal');
export const attachmentsContainer = document.getElementById('attachmentsContainer');
export const attachmentNameInput = document.getElementById('attachmentNameInput');
export const attachmentUrlInput = document.getElementById('attachmentUrlInput');
export const addAttachmentBtn = document.getElementById('addAttachmentBtn');
export const closeAttachmentModal = document.getElementById('closeAttachmentModal');
export const attachmentError = document.getElementById('attachmentError');
export const fileInput = document.getElementById('fileInput');
export const fileNameDisplay = document.getElementById('fileNameDisplay');
