export class BaseEntity {
    id;
    createdAt;
    static totalEntities;
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
        BaseEntity.totalEntities;
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    static getTotalEntities() {
        return BaseEntity.totalEntities;
    } //aula 5
}
