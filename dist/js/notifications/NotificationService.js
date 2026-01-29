export class NotificationService {
    notify(message) {
        console.log(`%c [SISTEMA]: ${message}`, 'background: #222; color: #bada55; padding: 2px 5px;');
        alert(message);
    }
    notifyUser(userId, message) {
        console.log(`NOTIFICAÇÃO [User ID ${userId}]: ${message}`);
    }
    notifyGroup(userIds, message) {
        userIds.forEach(id => this.notifyUser(id, message));
    }
    notifyAdmins(message) {
        console.log(`ALERTA PARA ADMINS: ${message}`);
    }
}
export const notificationService = new NotificationService();
