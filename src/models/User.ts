import { UserRole } from '../security/UserRole.js';
import { BaseEntity } from './BaseEntity.js';

export class UserClass extends BaseEntity {
    public name: string;
    public email: string;
    public active: boolean;
    public role: UserRole; 

    constructor(id: number, name: string, email: string, role: UserRole = UserRole.MEMBER) {
        super(id); 
        this.name = name;
        this.email = email;
        this.active = true; 
        this.role = role; 
    }

    toggleState(): void {
        this.active = !this.active;
    }

    isActive(): boolean {
        return this.active;
    }
}