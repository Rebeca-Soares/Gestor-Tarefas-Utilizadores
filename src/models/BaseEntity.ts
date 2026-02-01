export abstract class BaseEntity {
    
    public id: number; 
    protected createdAt: Date;

    static totalEntities: number = 0;
    
    constructor(id: number) {
        this.id = id;
        this.createdAt = new Date();
        BaseEntity.totalEntities += 1;
    }

    public getId(): number {
        return this.id;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    static getTotalEntities (): number {
        return BaseEntity.totalEntities;
    } 
}

