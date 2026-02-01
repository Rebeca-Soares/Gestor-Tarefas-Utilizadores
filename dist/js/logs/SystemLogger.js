/* export class SystemLogger {
    private static logs: string[] = [];

    static log(message: string): void {
        const timestamp = new Date().toLocaleString();
        this.logs.push(`[${timestamp}] ${message}`);
        console.log(`[${timestamp}] ${message}`);
    }

    static getLogs(): string[] {
        return [...this.logs];
    }

    static clearLogs(): void {
        this.logs = [];
    }
} */
// src/logs/SystemLogger.ts
import { HistoryLog } from "./HistoryLog.js";
export class SystemLogger {
    static auditor = new HistoryLog();
    static log(message) {
        this.auditor.addLog(message);
        console.log(`[LOG SISTEMA]: ${message}`);
    }
    static getLogs() {
        return this.auditor.getLogs();
    }
    static clear() {
        this.auditor.clearLogs();
        console.log("Histórico de logs limpo.");
    }
}
