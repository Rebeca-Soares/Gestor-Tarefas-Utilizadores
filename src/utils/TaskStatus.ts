export enum TaskStatus {
    Created = 0,
    Assigned = 1,
    InProgress = 2,
    Blocked = 3,
    Completed = 4,
    Archived = 5
}

// Adiciona as etiquetas em português:
export const StatusLabels: Record<TaskStatus, string> = {
    [TaskStatus.Created]: "Criada",
    [TaskStatus.Assigned]: "Atribuída",
    [TaskStatus.InProgress]: "Em Progresso",
    [TaskStatus.Blocked]: "Bloqueada",
    [TaskStatus.Completed]: "Concluída",
    [TaskStatus.Archived]: "Arquivada"
};