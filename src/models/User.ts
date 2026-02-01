import { UserRole } from '../security/UserRole.js';
import { BaseEntity } from './BaseEntity.js';

export class UserClass extends BaseEntity {
    // Exercício 3: Propriedades privadas com a convenção '_'
    private _name: string;
    private _email: string;
    private _active: boolean;
    private _role: UserRole; 

    constructor(id: number, name: string, email: string, role: UserRole = UserRole.MEMBER) {
        super(id); 
        this.validateEmail(email);
        this._name = name;
        this._email = email;
        this._active = true; 
        this._role = role; 
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public set email(newEmail: string) {
        this.validateEmail(newEmail);
        this._email = newEmail;
    }

    private validateEmail(email: string): void {
        if (!email.includes('@')) {
            throw new Error("Email inválido: deve conter '@'.");
        }
    }

    public getRole(): UserRole {
        return this._role;
    }

    public setRole(newRole: UserRole): void {
        this._role = newRole;
    }

    public isActive(): boolean {
        return this._active; 
    }

    public toggleActive(): void {
        this._active = !this._active;
    }
}