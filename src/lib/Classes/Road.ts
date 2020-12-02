import RoadAttributes, { PeekOpts } from "../Types/Road";

export class Road<T> implements RoadAttributes<T> {

    public length = () => this.elements.length;
    public elements: (T | undefined)[] = [];

    constructor(distance: number) {
        this.elements = new Array(this.queueLength(distance));
    }

    // average car length is 4.87 metres
    // simulate queue length by total distance divided by average car length
    private queueLength = (distance: number) => Math.round(distance / 4.87);


    enqueue = (el: T | undefined) => this.elements.push(el);

    dequeue = (): T | undefined => this.elements.shift();

    peek = (opts?: PeekOpts) => {
        const index = opts?.index ?? 0;
        return this.deepCopy(this.elements[index]);
    }

    density = () => {
        const numVehicles = this.elements.filter((el: T | undefined) => el !== undefined).length;
        return numVehicles / this.length();
    }

    isEmpty = () => this.length() > 0 && this.density() > 0;

    private deepCopy = (item: any) => JSON.parse(JSON.stringify(item));
}