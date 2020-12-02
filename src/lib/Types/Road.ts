export default interface Road<T> {
    length: () => number;
    density: () => number;
    elements: (T | undefined)[];
    enqueue: (el: T | undefined) => number;
    dequeue: () => T | undefined;
    peek: (opts?: PeekOpts) => T | undefined;
    isEmpty: () => boolean;
}

export interface PeekOpts {
    index: number;
}