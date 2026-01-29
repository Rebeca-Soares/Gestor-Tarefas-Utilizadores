import "../models/task.js";
import "../models/User.js";
const navTasks = document.getElementById("navTasks");
const navUsers = document.getElementById("navUsers");
const tasksSection = document.getElementById("tasksSection");
const usersSection = document.getElementById("usersSection");
const headerTitle = document.getElementById('headerTitle');
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
