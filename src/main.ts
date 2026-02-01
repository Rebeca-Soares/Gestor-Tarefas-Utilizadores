// 1. IMPORTS DE UI E COMPONENTES
import { renderTasks } from './ui/components/renderTask.js';
import { renderUsers } from './ui/components/rederUsers.js';
import "./ui/app.js";

// 2. IMPORTS DE MODELOS
import { UserClass } from './models/User.js';
import { TasksClass } from './models/task.js';

// 3. IMPORTS DE SERVIÇOS E CONFIGURAÇÃO
import { UserList } from './services/userService.js';
import { TasksList } from './services/taskService.js';
import { SystemConfig } from './services/SystemConfig.js';
import { BusinessRules } from "./services/BusinessRules.js";

// 4. IMPORTS DE UTILITÁRIOS E SEGURANÇA
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


// --- INICIALIZAÇÃO DA INTERFACE ---
renderTasks(); 
renderUsers();

// --- EXPORTAÇÕES ---
export { TasksList, TasksClass, UserList, UserClass };

/**
 * IMPLEMENTAÇÃO DO FLUXO REAL - EXERCÍCIO 7
 */
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

// --- TESTES DE GENERICS (GUIADOS E AUTÓNOMOS) ---

function executarTestesGenerics() {
    console.log("\n=== TESTES DE GENERICS ===");

    // 1. Instâncias Comuns para Testes
    const user1 = new UserClass(1, "Ana Silva", "ana@empresa.com", UserRole.ADMIN);
    const user2 = new UserClass(2, "Pedro Santos", "pedro@empresa.com", UserRole.MEMBER);
    const task1 = new TasksClass(10, "Finalizar Cache Genérica", "Estudo", PriorityRoles.HIGH, TaskStatus.InProgress);

    // 2. Teste EntityList (Exercicio 1 Guiado)
    const userList = new EntityList<UserClass>();
    userList.add(user1);
    console.log("EntityList (User):", userList.getAll());

    // 3. Teste OBRIGATÓRIO SimpleCache (Exercicio 2 Guiado)
    const userCache = new SimpleCache<number, UserClass>();
    userCache.set(1, user1);
    console.log("SimpleCache (User) - Chave 1:", userCache.get(1));

    const taskCache = new SimpleCache<number, TasksClass>();
    taskCache.set(10, task1);
    console.log("SimpleCache (Task) - Chave 10:", taskCache.get(10));

    // 4. Teste TagManager (Exercicio 1 Autónomo)
    const taskTagManager = new TagManager<TasksClass>();
    taskTagManager.addTag(task1, 'urgente');
    console.log("TagManager (Task):", taskTagManager.getTags(task1));

    const favUsers = new Favorites<UserClass>();
    favUsers.add(user1);
    favUsers.add(user2);
    favUsers.remove(user1);
    console.log("Favoritos de Users (deve ter apenas user2):", favUsers.getAll());

    // Favoritos de Tarefas
    const favTasks = new Favorites<TasksClass>();
    favTasks.add(task1);
    console.log("Tarefa 1 existe nos favoritos?", favTasks.exists(task1)); // Deve ser true
}

function executarTestePaginador() {
    console.log("\n=== EXERCÍCIO 4: PAGINADOR GENÉRICO ===");

    const paginator = new Paginator();
    
    // Teste Obrigatório com UserList (importada do userService)
    const page1 = paginator.paginate(UserList.getAll(), 1, 2);
    const page2 = paginator.paginate(UserList.getAll(), 2, 2);

    console.log("Página 1 (2 itens):", page1);
    console.log("Página 2 (2 itens):", page2);
    
    // Teste bónus com Tarefas para provar que é genérico
    const taskPage = paginator.paginate(TasksList.getAll(), 1, 3);
    console.log("Página 1 de Tarefas (3 itens):", taskPage);
}

// Execução dos fluxos
executarFluxoSistema();
executarTestesGenerics();
executarTestePaginador(); 