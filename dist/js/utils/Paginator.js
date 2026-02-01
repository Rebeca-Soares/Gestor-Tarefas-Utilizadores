export class Paginator {
    paginate(items, page, size) {
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        return items.slice(startIndex, endIndex);
    }
}
