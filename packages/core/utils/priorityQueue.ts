type Comparator<T> = (a: T, b: T) => number;

export class PriorityQueue<T> implements Iterable<T> {
    private heap: T[] = [];
    private compare: Comparator<T>;

    constructor(compare?: Comparator<T>) {
        this.compare = compare ?? ((a: any, b: any) => a - b);
    }

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    peek(): T | undefined {
        return this.heap[0];
    }

    enqueue(value: T): void {
        this.heap.push(value);
        this.heapifyUp();
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;

        const root = this.heap[0];
        const last = this.heap.pop()!;

        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();
        }

        return root;
    }

    delete(value: T): boolean {
        const index = this.heap.findIndex(v => v === value);
        if (index === -1) return false;

        const last = this.heap.pop()!;

        if (index < this.heap.length) {
            this.heap[index] = last;

            const parentIndex = this.parent(index);
            if (index > 0 && this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
                this.heapifyUpFrom(index);
            } else {
                this.heapifyDownFrom(index);
            }
        }

        return true;
    }

    // Iterador que percorre o heap sem consumir itens
    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const snapshot = [...this.heap]; // cópia para não consumir
        return {
            next: (): IteratorResult<T> => {
                if (index < snapshot.length) {
                    return { value: snapshot[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }

    private heapifyUp(): void {
        this.heapifyUpFrom(this.heap.length - 1);
    }

    private heapifyUpFrom(index: number): void {
        while (index > 0) {
            const parentIndex = this.parent(index);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private heapifyDown(): void {
        this.heapifyDownFrom(0);
    }

    private heapifyDownFrom(index: number): void {
        while (this.left(index) < this.heap.length) {
            let smallerChild = this.left(index);
            const right = this.right(index);

            if (
                right < this.heap.length &&
                this.compare(this.heap[right], this.heap[smallerChild]) < 0
            ) {
                smallerChild = right;
            }

            if (this.compare(this.heap[index], this.heap[smallerChild]) <= 0) break;

            this.swap(index, smallerChild);
            index = smallerChild;
        }
    }

    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private left(i: number): number {
        return 2 * i + 1;
    }

    private right(i: number): number {
        return 2 * i + 2;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}
