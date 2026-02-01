export class BaseEntity {
    id;
    createdAt;
    static totalEntities = 0;
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
        BaseEntity.totalEntities += 1;
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    static getTotalEntities() {
        return BaseEntity.totalEntities;
    }
}
