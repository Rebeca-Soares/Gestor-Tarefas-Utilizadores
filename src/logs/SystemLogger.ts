import { HistoryLog } from "./HistoryLog.js";

export class SystemLogger {

    private static auditor = new HistoryLog();

    static log(message: string): void {
        this.auditor.addLog(message);
        console.log(`[LOG SISTEMA]: ${message}`);
    }

    static getLogs(): string[] {
        return this.auditor.getLogs();
    }

    static clear(): void {
        this.auditor.clearLogs();
        console.log("Histórico de logs limpo.");
    }
}