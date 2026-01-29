export var PriorityRoles;
(function (PriorityRoles) {
    PriorityRoles["LOW"] = "LOW";
    PriorityRoles["MEDIUM"] = "MEDIUM";
    PriorityRoles["HIGH"] = "HIGH";
    PriorityRoles["CRITICAL"] = "CRITICAL";
})(PriorityRoles || (PriorityRoles = {}));
export const PriorityLabels = {
    [PriorityRoles.LOW]: "Baixa",
    [PriorityRoles.MEDIUM]: "Média",
    [PriorityRoles.HIGH]: "Alta",
    [PriorityRoles.CRITICAL]: "Crítica"
};
