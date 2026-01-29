export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Created"] = 0] = "Created";
    TaskStatus[TaskStatus["Assigned"] = 1] = "Assigned";
    TaskStatus[TaskStatus["InProgress"] = 2] = "InProgress";
    TaskStatus[TaskStatus["Blocked"] = 3] = "Blocked";
    TaskStatus[TaskStatus["Completed"] = 4] = "Completed";
    TaskStatus[TaskStatus["Archived"] = 5] = "Archived";
})(TaskStatus || (TaskStatus = {}));
// Adiciona as etiquetas em português:
export const StatusLabels = {
    [TaskStatus.Created]: "Criada",
    [TaskStatus.Assigned]: "Atribuída",
    [TaskStatus.InProgress]: "Em Progresso",
    [TaskStatus.Blocked]: "Bloqueada",
    [TaskStatus.Completed]: "Concluída",
    [TaskStatus.Archived]: "Arquivada"
};
