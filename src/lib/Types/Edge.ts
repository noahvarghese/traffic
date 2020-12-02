import Road  from "../Classes/Road";
import Car from "../Classes/Car";
import Node from "./Node";

export default interface Edge {
    startingNode: Node;
    endNode: Node;
    distance: number;
    queue: Road<Car>;
    orientation: string;
}