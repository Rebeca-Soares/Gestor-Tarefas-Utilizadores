import { UserRole } from '../security/UserRole.js';
import { BaseEntity } from './BaseEntity.js';
export class UserClass extends BaseEntity {
    name;
    email;
    active;
    role;
    constructor(id, name, email, role = UserRole.MEMBER) {
        super(id);
        this.name = name;
        this.email = email;
        this.active = true;
        this.role = role;
    }
    toggleState() {
        this.active = !this.active;
    }
    isActive() {
        return this.active;
    }
}
