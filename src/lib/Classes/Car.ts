import CarAttributes from "../Types/Car";
import Node from "../Types/Node";
import Road from "../Classes/Road";

export default class Car implements CarAttributes {
    public startingNode: Node;
    public destinationNode: Node;
    public currentLocation: Road<CarAttributes> | Node;
    // public path: (Node | undefined)[];
    // public path: string[];
    public path: any;

    constructor(_startingNode: Node, _destinationNode: Node, _path: {}) {
        this.startingNode = _startingNode;
        this.destinationNode = _destinationNode;
        this.path = _path;
        this.currentLocation = this.startingNode;
    }
}