import Road  from "./Road";
import Car from "./Car";
import Node from "./Node";

export default interface Edge {
    startingNode: Node;
    endNode: Node;
    distance: number;
    queue: Road<Car>;
    orientation: string;
}