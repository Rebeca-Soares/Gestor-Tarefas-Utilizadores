import { UserRole } from '../security/UserRole.js';
import { BaseEntity } from './BaseEntity.js';
export class UserClass extends BaseEntity {
    // Exercício 3: Propriedades privadas com a convenção '_'
    _name;
    _email;
    _active;
    _role;
    constructor(id, name, email, role = UserRole.MEMBER) {
        super(id);
        this.validateEmail(email);
        this._name = name;
        this._email = email;
        this._active = true;
        this._role = role;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    set email(newEmail) {
        this.validateEmail(newEmail);
        this._email = newEmail;
    }
    validateEmail(email) {
        if (!email.includes('@')) {
            throw new Error("Email inválido: deve conter '@'.");
        }
    }
    getRole() {
        return this._role;
    }
    setRole(newRole) {
        this._role = newRole;
    }
    isActive() {
        return this._active;
    }
    toggleActive() {
        this._active = !this._active;
    }
}
