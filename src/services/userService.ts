import { UserRole } from "../security/UserRole.js";
import { UserClass } from "../models/User.js";
import { IdGenerator } from "../utils/IdGenerator.js";

export let UserList: UserClass[] = [
    new UserClass(IdGenerator.generate(), 'Rebeca Cerqueira', 'rsc@gmail.com', UserRole.ADMIN),
    new UserClass(IdGenerator.generate(), 'Ana Garcia', 'acg@gmail.com', UserRole.VIEWER),
    new UserClass(IdGenerator.generate(), 'Leandro Nogueira', 'lmg@gmail.com', UserRole.MANAGER)
];


const fakeData = [
    { id: 4, name: 'Paulo Coelho', email: 'pmc@gmail.com', active: true },
    { id: 5, name: 'Joana Pinto', email: 'jpn@gmail.com', active: false },
    { id: 6, name: 'Caio Lacerda', email: 'clgg@gmail.com', active: true }
];

fakeData.forEach(d => {
    const newUser = new UserClass(IdGenerator.generate(), d.name, d.email);
    if(!d.active) {
        newUser.toggleActive();
    }
    UserList.push(newUser);
});

export function addUser(name: string, email: string, role: UserRole): void {
    const newId = IdGenerator.generate();
    const user = new UserClass(newId, name, email, role);
    UserList.push(user);
}

export function removeUser(id: number): void {
    UserList = UserList.filter(u => u.getId() !== id);
}

export let currentUser: UserClass | null = null;

export function loginAs(user: UserClass): void {
    currentUser = user;
    const loginInfo = document.getElementById('loginInfo');
    if (loginInfo) {
        loginInfo.textContent = `Logado como: ${user.name} (${UserRole[user.getRole()]})`;
    }
}