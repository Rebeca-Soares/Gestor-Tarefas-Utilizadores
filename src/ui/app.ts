import "../models/task.js";
import "../models/User.js";


const navTasks = document.getElementById("navTasks") as HTMLElement;
const navUsers = document.getElementById("navUsers") as HTMLElement;
const tasksSection = document.getElementById("tasksSection") as HTMLElement;
const usersSection = document.getElementById("usersSection") as HTMLElement;
const headerTitle = document.getElementById('headerTitle') as HTMLElement;

// Mostrar Tarefas
navTasks.addEventListener("click", (e) => {
    e.preventDefault();
    tasksSection.style.display = "block";
    usersSection.style.display = "none";
    navTasks.classList.add("active");
    navUsers.classList.remove("active");
    headerTitle.textContent = 'Gestão de Tarefas';
});

// Mostrar Usuários
navUsers.addEventListener("click", (e) => {
    e.preventDefault();
    tasksSection.style.display = "none";
    usersSection.style.display = "block";
    navUsers.classList.add("active");
    navTasks.classList.remove("active");
    headerTitle.textContent = 'Gestão de Utilizadores';
});
