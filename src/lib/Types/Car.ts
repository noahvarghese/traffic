import Node from "./Node";
import Road from "./Road";

export interface Vehicle {

}

export default interface Car {
    startingNode: Node;
    destinationNode: Node;
    currentLocation: Road<Car> | Node;
    // path: (Node | undefined)[];
    // path: string[];
    path: any;
}