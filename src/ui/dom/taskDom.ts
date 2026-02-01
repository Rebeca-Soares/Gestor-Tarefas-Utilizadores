// --- ELEMENTOS GERAIS DA PÁGINA ---
export const list = document.getElementById("list") as HTMLUListElement;
export const contador = document.getElementById("counterTasks") as HTMLDivElement;
export const taskError = document.getElementById("taskError") as HTMLSpanElement;
export const clearCompletedBtn = document.getElementById('clearCompleted') as HTMLButtonElement;
export const orderNameBtn = document.getElementById('orderNameTask') as HTMLButtonElement;
export const searchInput = document.getElementById('searchTask') as HTMLInputElement;
// src/ui/dom/taskDom.ts
export const userSelect = document.getElementById('userSelect') as HTMLSelectElement;
export const editTaskUser = document.getElementById('editTaskUser') as HTMLSelectElement;

export const categoryDropdownBtn = document.getElementById('categoryDropdownBtn') as HTMLButtonElement;
export const categoryDropdownMenu = document.getElementById('categoryDropdownMenu') as HTMLDivElement;

export const navTasks = document.getElementById("navTasks") as HTMLElement;
export const tasksSection = document.getElementById("tasksSection") as HTMLElement;
export const headerTitle = document.getElementById('headerTitle') as HTMLElement;

// --- MODAL: ADICIONAR NOVA TAREFA (O que você está criando agora) ---
/** O contentor principal do modal de criação */
export const addTaskModal = document.getElementById('addTaskModal') as HTMLDivElement;
/** Botão na página principal que abre este modal */
export const openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn') as HTMLButtonElement;
/** O "X" ou botão de fechar dentro do modal de criação */
export const closeAddTaskModal = document.getElementById('closeAddTaskModal') as HTMLSpanElement;

/** Campos do formulário dentro do modal de criação */
export const input = document.getElementById("taskInput") as HTMLInputElement;
export const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
export const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement;
export const statusSelect = document.getElementById('statusSelect') as HTMLSelectElement;
export const deadlineInput = document.getElementById('deadlineInput') as HTMLInputElement;
export const addBtn = document.getElementById("addBtn") as HTMLButtonElement;

// --- MODAL: EDIÇÃO DE TAREFA (A versão que você já tinha) ---
export const editTaskModal = document.getElementById('editTaskModal') as HTMLDivElement;
export const editTaskInput = document.getElementById('editTaskInput') as HTMLInputElement;
export const editTaskCategory = document.getElementById('editTaskCategory') as HTMLSelectElement;
export const saveEditTaskBtn = document.getElementById('saveEditTaskBtn') as HTMLButtonElement;
export const closeModalBtn = document.getElementById('closeEditTaskModal') as HTMLSpanElement;
export const editTaskError = editTaskInput.nextElementSibling as HTMLSpanElement;

// Seletores opcionais para edição avançada (caso queira editar prioridade no futuro)
export const editTaskPriority = document.getElementById('editTaskPriority') as HTMLSelectElement;
export const editTaskStatus = document.getElementById('editTaskStatus') as HTMLSelectElement;
export const editTaskDeadline = document.getElementById('editTaskDeadline') as HTMLInputElement;

// --- MODAL: COMENTÁRIOS ---
export const commentModal = document.getElementById('commentModal') as HTMLDivElement;
export const comentsContainer = document.getElementById('comentsContainer') as HTMLDivElement;
export const closeCommentModal = document.getElementById('closeCommentModal') as HTMLSpanElement;
export const addCommentBtn = document.getElementById('addCommentBtn') as HTMLButtonElement;
export const newCommentInput = document.getElementById('newCommentInput') as HTMLInputElement;

// Adicione ao seu src/ui/dom/taskDom.ts
export const countAll = document.getElementById("countAll") as HTMLSpanElement;
export const countPending = document.getElementById("countPending") as HTMLSpanElement;
export const countBlocked = document.getElementById("countBlocked") as HTMLSpanElement;
export const countExpired = document.getElementById("countExpired") as HTMLSpanElement;

export const statAll = document.getElementById("statAll") as HTMLDivElement;
export const statPending = document.getElementById("statPending") as HTMLDivElement;
export const statBlocked = document.getElementById("statBlocked") as HTMLDivElement;
export const statExpired = document.getElementById("statExpired") as HTMLDivElement;

export const attachmentModal = document.getElementById('attachmentModal') as HTMLElement;
export const attachmentsContainer = document.getElementById('attachmentsContainer') as HTMLElement;
export const attachmentNameInput = document.getElementById('attachmentNameInput') as HTMLInputElement;
export const attachmentUrlInput = document.getElementById('attachmentUrlInput') as HTMLInputElement;
export const addAttachmentBtn = document.getElementById('addAttachmentBtn') as HTMLButtonElement;
export const closeAttachmentModal = document.getElementById('closeAttachmentModal') as HTMLButtonElement;
export const attachmentError = document.getElementById('attachmentError') as HTMLElement;
export const fileInput = document.getElementById('fileInput') as HTMLInputElement;
export const fileNameDisplay = document.getElementById('fileNameDisplay') as HTMLElement;
export const filterFavsBtn = document.getElementById('filterFavsBtn') as HTMLButtonElement;

// Elementos de Paginação
export const prevPageBtn = document.getElementById('prevPageBtn') as HTMLButtonElement;
export const nextPageBtn = document.getElementById('nextPageBtn') as HTMLButtonElement;
export const pageIndicator = document.getElementById('pageIndicator') as HTMLElement;