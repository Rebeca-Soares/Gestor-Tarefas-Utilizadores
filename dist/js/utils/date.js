export function formatData(data) {
    return data.toLocaleString("pt-BR", { day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}
