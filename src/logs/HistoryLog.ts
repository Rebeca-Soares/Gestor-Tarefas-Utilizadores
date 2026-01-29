export class HistoryLog {
    private logs: string[] = [];

    public addLog(message: string): void {
        const timestamp = new Date().toLocaleString("pt-BR");
        this.logs.push(`[${timestamp}] ${message}`);
    }

    public getLogs(): string[] {
        return [...this.logs];
    }

    public clearLogs(): void {
        this.logs = [];
    }
}

export const systemHistory = new HistoryLog();