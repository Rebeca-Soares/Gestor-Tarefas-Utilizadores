export class NotificationService {

    notify(message: string): void {
        console.log(`%c [SISTEMA]: ${message}`, 'background: #222; color: #bada55; padding: 2px 5px;');
        alert(message); 
    }
    
    notifyUser(userId: number, message: string): void {
        console.log(`NOTIFICAÇÃO [User ID ${userId}]: ${message}`);
    }

    notifyGroup(userIds: number[], message: string): void {
        userIds.forEach(id => this.notifyUser(id, message));
    }

    notifyAdmins(message: string): void {
        console.log(`ALERTA PARA ADMINS: ${message}`);
    }
}

export const notificationService = new NotificationService();