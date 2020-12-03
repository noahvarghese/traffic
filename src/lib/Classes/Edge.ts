import EdgeAttributes from "../Types/Edge"
import Node from "../Types/Node";
import Car from "./Car";
import Road from "./Road";

export default class Edge implements EdgeAttributes {
    public streetName: string;
    public startingNodeIntersection: string;
    public endingNodeIntersection: string;
    public distance: number;
    public queue: Road<Car>;
    public orientation: string;

    constructor(
        _streetName: string, 
        _distance: number, 
        _startingNode: string, 
        _endingNode: string, 
        _orientation: string
    ) {
        this.distance = _distance;
        this.queue = new Road<Car>(this.distance);

        this.streetName = _streetName;
        this.startingNodeIntersection = _startingNode;
        this.endingNodeIntersection = _endingNode;
        this.orientation = _orientation;
    }
}