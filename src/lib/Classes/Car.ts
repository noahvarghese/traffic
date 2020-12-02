import { Car as CarAttributes } from "../Types/Car";
import Node from "../Types/Node";
import { Road } from "../Types/Road";

export class Car implements CarAttributes {
    public startingNode: Node;
    public destinationNode: Node;
    public currentRoad: Road<CarAttributes> | Node;
    public path: (Node | undefined)[];

    constructor(_startingNode: Node, _destinationNode: Node, _path: (Node | undefined)[]) {
        this.startingNode = _startingNode;
        this.destinationNode = _destinationNode;
        this.path = _path;
        this.currentRoad = this.startingNode;
    }
}