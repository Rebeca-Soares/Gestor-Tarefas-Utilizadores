// UI E COMPONENTES
import { renderTasks } from './ui/components/renderTask.js';
import { renderUsers } from './ui/components/rederUsers.js';
import "./ui/app.js";
// MODELOS
import { UserClass } from './models/User.js';
import { TasksClass } from './models/task.js';
// SERVIÇOS E CONFIGURAÇÃO
import { UserList } from './services/userService.js';
import { TasksList } from './services/taskService.js';
import { SystemConfig } from './services/SystemConfig.js';
import { BusinessRules } from "./services/BusinessRules.js";
// UTILITÁRIOS E SEGURANÇA
import { EntityList } from "./utils/EntityList.js";
import { SimpleCache } from "./utils/SimpleCache.js";
import { TagManager } from "./utils/TagManager.js";
import { IdGenerator } from "./utils/IdGenerator.js";
import { SystemLogger } from "./logs/SystemLogger.js";
import { GlobalValidators } from "./utils/GlobalValidators.js";
import { PriorityRoles } from "./utils/priority.js";
import { TaskStatus } from "./utils/TaskStatus.js";
import { UserRole } from "./security/UserRole.js";
import { Favorites } from "./utils/Favorites.js";
import { Paginator } from "./utils/Paginator.js";
import { WatcherSystem } from './utils/WatcherSystem.js';
import { PriorityManager } from './utils/PriorityManager.js';
import { RatingSystem } from './utils/RatingSystem.js';
import { DependencyGraph } from './utils/DependencyGraph.js';
renderTasks();
renderUsers();
export { TasksList, TasksClass, UserList, UserClass };
//Exercicio 7 - Guiados (Aula 5)
function executarFluxoSistema() {
    SystemLogger.log("=== INICIANDO DEMONSTRAÇÃO DO SISTEMA ===");
    SystemConfig.setEnvironment('development');
    const info = SystemConfig.getInfo();
    SystemLogger.log(`Sistema iniciado. Versão: ${info.version} em modo ${info.environment}`);
    const emailUsuario = "admin@projeto.ts";
    if (GlobalValidators.isValidEmail(emailUsuario)) {
        SystemLogger.log(`Validação: O email ${emailUsuario} é válido.`);
    }
    const novoId = IdGenerator.generate();
    const podeConcluir = BusinessRules.canTaskBeCompleted(true);
    if (!podeConcluir) {
        SystemLogger.log(`Regra de Negócio: Tarefa ${novoId} não pode ser concluída porque está bloqueada.`);
    }
    SystemLogger.log("Fluxo de demonstração finalizado.");
    console.log("\n--- HISTÓRICO DE AUDITORIA (LOGS) ---");
    SystemLogger.getLogs().forEach(entrada => console.log(entrada));
}
//Exercicios Guiados (Aula 6)
function executarExerciciosGuiados() {
    console.log("\n--- EXERCÍCIOS GUIADOS ---");
    const user1 = new UserClass(1, "Ana Silva", "ana@empresa.com", UserRole.ADMIN);
    const task1 = new TasksClass(10, "Finalizar Projeto", "Estudo", PriorityRoles.HIGH, TaskStatus.InProgress);
    // Exercício 1: EntityList
    console.log("Exercício 1: EntityList");
    const userListGen = new EntityList();
    userListGen.add(user1);
    console.log("Lista Genérica (User):", userListGen.getAll());
    // Exercício 2: SimpleCache
    console.log("Exercício 2: SimpleCache");
    const userCache = new SimpleCache();
    userCache.set(1, user1);
    console.log("Cache (User) ID 1:", userCache.get(1));
    // Exercício 3: Favoritos
    console.log("Exercício 3: Favoritos");
    const favUsers = new Favorites();
    favUsers.add(user1);
    console.log("User está nos favoritos?", favUsers.exists(user1));
    // Exercício 4: Paginador
    console.log("Exercício 4: Paginador");
    const paginator = new Paginator();
    const page = paginator.paginate(UserList.getAll(), 1, 2);
    console.log("Paginação (Página 1, tamanho 2):", page);
}
//Exercícios Autónomos (Aula 6) 
function executarExerciciosAutonomos() {
    console.log("--- EXERCÍCIOS AUTÓNOMOS ---");
    const user1 = UserList.getAll()[0];
    const task1 = TasksList.getAll()[0];
    // Exercício A1: TagManager
    console.log("Exercício A1: TagManager");
    const taskTagManager = new TagManager();
    taskTagManager.addTag(task1, 'urgente');
    console.log("Tags da Tarefa:", taskTagManager.getTags(task1));
    // Exercício A2: WatcherSystem
    console.log("Exercício A2: WatcherSystem");
    const watcherSystem = new WatcherSystem();
    if (task1 && user1) {
        watcherSystem.watch(task1, user1);
        console.log("Observadores da Tarefa:", watcherSystem.getWatchers(task1).map(u => u.name));
    }
    // Exercício A3: PriorityManager
    console.log("\nExercício A3: PriorityManager");
    const priorityManager = new PriorityManager();
    if (task1) {
        priorityManager.setPriority(task1, 5);
        console.log("Prioridade da Tarefa:", priorityManager.getPriority(task1));
    }
    // Exercício A4: RatingSystem
    console.log("\nExercício A4: RatingSystem");
    const ratingSystem = new RatingSystem();
    if (task1) {
        ratingSystem.rate(task1, 5);
        ratingSystem.rate(task1, 4);
        console.log("Média de Rating da Tarefa:", ratingSystem.getAverage(task1));
    }
    // Exercício A5: DependencyGraph
    console.log("\nExercício A5: DependencyGraph");
    const depGraph = new DependencyGraph();
    const task2 = TasksList.getAll()[1];
    if (task1 && task2) {
        depGraph.addDependency(task2, task1);
        console.log(`"${task2.title}" depende de "${task1.title}"?`, depGraph.hasDependencies(task2));
    }
}
// Execução de todos os blocos
executarFluxoSistema();
executarExerciciosGuiados();
executarExerciciosAutonomos();
