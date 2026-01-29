import { TaskStatus } from '../utils/TaskStatus.js';

export interface ITask {
    id: number;
    title: string;
    completed: boolean;
    status: TaskStatus;

    getType(): string;
    moveTo(status: TaskStatus): void;
}