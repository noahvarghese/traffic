import Node from "./Node";
import Road from "./Road";

export default interface Car {
    startingNode: Node;
    destinationNode: Node;
    currentRoad: Road<Car> | Node;
    path: (Node | undefined)[];
}