export class HistoryLog {
    logs = [];
    addLog(message) {
        const timestamp = new Date().toLocaleString("pt-BR");
        this.logs.push(`[${timestamp}] ${message}`);
    }
    getLogs() {
        return [...this.logs];
    }
    clearLogs() {
        this.logs = [];
    }
}
export const systemHistory = new HistoryLog();
