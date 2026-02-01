export class IdGenerator {
    private static counter: number = 0;
    
    private constructor() {}

    static generate(): number {
        this.counter++;
        return this.counter;
    }
}