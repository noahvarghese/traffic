import EdgeAttributes from "../Types/Edge"
import Node from "../Types/Node";
import { Car } from "./Car";
import { Road } from "./Road";

export default class Edge implements EdgeAttributes {
    public startingNode: Node;
    public endNode: Node;
    public distance: number;
    public queue: Road<Car>;
    public orientation: string;

    constructor(_distance: number, _startingNode: Node, _endingNode: Node, _orientation: string) {
        this.distance = _distance;
        this.queue = new Road<Car>(this.distance);

        this.startingNode = _startingNode;
        this.endNode = _endingNode;
        this.orientation = _orientation;
    }
}