import { ITask } from '../models/ITask.js';

export function processTask(task: ITask): void {
    console.log(`Processando tarefa do tipo: ${task.getType()}`);
    console.log(`Título: ${task.title}`);
    
    if (task.getType() === "bug") {
        console.log("Atenção: Esta tarefa requer revisão de código prioritária.");
    }
}