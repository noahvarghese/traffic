import Road  from "../Classes/Road";
import Car from "../Classes/Car";
import Node from "./Node";

export default interface Edge {
    startingNodeIntersection: string;
    endingNodeIntersection: string;
    distance: number;
    queue: Road<Car>;
    orientation: string;
}