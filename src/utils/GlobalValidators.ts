export class GlobalValidators {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isNonEmpty(text: string): boolean {
        return text.trim().length > 0;
    }
    static isPositiveNumber(value: number): boolean {
        return value > 0;
    }

    static minLength(text: string, size: number): boolean {
        return text.trim().length >= size;
    }
}