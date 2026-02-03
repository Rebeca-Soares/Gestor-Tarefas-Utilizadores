export class RatingSystem<T> {

    private ratings: Map<T, number[]> = new Map();

    rate(item: T, value: number): void {
        const currentRatings = this.ratings.get(item) || [];

        if (value >= 1 && value <= 5) {
            currentRatings.push(value);
            this.ratings.set(item, currentRatings);
        }
    }


    getAverage(item: T): number {
        const scores = this.ratings.get(item);
        if (!scores || scores.length === 0) return 0;
        
        const sum = scores.reduce((acc, curr) => acc + curr, 0);
        return parseFloat((sum / scores.length).toFixed(1));
    }


    getRatings(item: T): number[] {
        return this.ratings.get(item) || [];
    }
}