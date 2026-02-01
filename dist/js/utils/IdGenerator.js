export class IdGenerator {
    static counter = 0;
    constructor() { }
    static generate() {
        this.counter++;
        return this.counter;
    }
}
