export enum PriorityRoles {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM', 
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}

export const PriorityLabels: Record<PriorityRoles, string> = {
    [PriorityRoles.LOW]: "Baixa",
    [PriorityRoles.MEDIUM]: "Média",
    [PriorityRoles.HIGH]: "Alta",
    [PriorityRoles.CRITICAL]: "Crítica"
};