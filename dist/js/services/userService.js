import { UserRole } from "../security/UserRole.js";
import { UserClass } from "../models/User.js";
export let UserList = [
    new UserClass(1, 'Rebeca Cerqueira', 'rsc@gmail.com', UserRole.ADMIN),
    new UserClass(2, 'Ana Garcia', 'acg@gmail.com', UserRole.VIEWER),
    new UserClass(3, 'Leandro Nogueira', 'lmg@gmail.com', UserRole.MANAGER)
];
const fakeData = [
    { id: 4, name: 'Paulo Coelho', email: 'pmc@gmail.com', active: true },
    { id: 5, name: 'Joana Pinto', email: 'jpn@gmail.com', active: false },
    { id: 6, name: 'Caio Lacerda', email: 'clgg@gmail.com', active: true }
];
fakeData.forEach(d => {
    const newUser = new UserClass(d.id, d.name, d.email);
    newUser.active = d.active;
    UserList.push(newUser);
});
export function addUser(name, email, role) {
    const newId = UserList.length > 0 ? Math.max(...UserList.map(u => u.id)) + 1 : 1;
    const user = new UserClass(newId, name, email, role);
    UserList.push(user);
}
export function removeUser(id) {
    UserList = UserList.filter(u => u.id !== id);
}
export let currentUser = null;
export function loginAs(user) {
    currentUser = user;
    const loginInfo = document.getElementById('loginInfo');
    if (loginInfo)
        loginInfo.textContent = `Logado como: ${user.name} (${UserRole[user.role]})`;
}
