import { UserRole } from "../security/UserRole.js";
import { UserClass } from "../models/User.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { EntityList } from "../utils/EntityList.js";
import { SimpleCache } from "../utils/SimpleCache.js";
export const UserList = new EntityList();
const userCache = new SimpleCache();
function registerUser(user) {
    UserList.add(user);
    userCache.set(user.id, user); // Armazena na cache
}
registerUser(new UserClass(IdGenerator.generate(), 'Rebeca Cerqueira', 'rsc@gmail.com', UserRole.ADMIN));
registerUser(new UserClass(IdGenerator.generate(), 'Ana Garcia', 'acg@gmail.com', UserRole.VIEWER));
registerUser(new UserClass(IdGenerator.generate(), 'Leandro Nogueira', 'lmg@gmail.com', UserRole.MANAGER));
const fakeData = [
    { id: IdGenerator.generate(), name: 'Paulo Coelho', email: 'pmc@gmail.com', active: true },
    { id: IdGenerator.generate(), name: 'Joana Pinto', email: 'jpn@gmail.com', active: false },
    { id: IdGenerator.generate(), name: 'Caio Lacerda', email: 'clgg@gmail.com', active: true }
];
fakeData.forEach(d => {
    const newUser = new UserClass(IdGenerator.generate(), d.name, d.email, UserRole.MEMBER);
    if (!d.active) {
        newUser.toggleActive();
    }
    UserList.add(newUser);
});
export function addUser(name, email, role) {
    const newId = IdGenerator.generate();
    const user = new UserClass(newId, name, email, role);
    registerUser(user);
}
export function getUserById(id) {
    return userCache.get(id);
}
export function removeUser(id) {
    UserList.remove(u => u.id === id);
}
export let currentUser = null;
export function loginAs(user) {
    currentUser = user;
    const loginInfo = document.getElementById('loginInfo');
    if (loginInfo) {
        loginInfo.textContent = `Logado como: ${user.name} (${UserRole[user.getRole()]})`;
    }
}
