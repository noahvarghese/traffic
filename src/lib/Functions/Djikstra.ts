import { exit } from "process";
import Edge from "../Classes/Edge";
import Node from "../Classes/Node";
import { EuclidianDistance } from "./TrafficLightSystem";

const aStarMod = ( edge: Edge, targetNode: Node, Nodes: Node[] ) => {
    const density = edge.queue.density();
    const distance = edge.distance;

    const flowRate = density * distance;

    const distanceFromDestination = EuclidianDistance(Node.FindNodeByIntersection(edge.endingNodeIntersection, Nodes)!, targetNode);

    return distanceFromDestination + flowRate;
};

export default (
    startingNode: Node, 
    endNode: Node, 
    nodes: Node[], 
    edges: Edge[],
    useAStar: boolean = true
): string[] => {
    // console.log(`Starting: ${startingNode.intersection}`);
    // console.log(`Ending: ${endNode.intersection}`);

    // deep copy one liner
    let vertexSet: Node[] = [];


    const distance: number[] = [];
    const previous: (Node | undefined)[] = [];

    for ( let i = 0; i < nodes.length; i++ ) {
        distance[i] = Infinity;
        previous[i] = undefined;
        vertexSet.push(nodes[i])
    }

    distance[ nodes.indexOf(startingNode) ] = 0;

    let u: Node = vertexSet[ vertexSet.indexOf(startingNode) ];

    while ( u !== undefined ) {

        // remove after use
        vertexSet = vertexSet.filter((node: Node) => node !== u);

        // get neighbors, that are still in the vertex set
        const neighbors: (Node | undefined)[] = edges.filter((edge: Edge) => edge.startingNodeIntersection === u.intersection).map((edge: Edge) => Node.FindNodeByIntersection(edge.endingNodeIntersection, nodes));

        for ( let neighbor of neighbors ) {
            let length: number;
            const currentEdge = edges.find((edge: Edge) => (edge.startingNodeIntersection === u.intersection && edge.endingNodeIntersection === neighbor?.intersection));

            if ( ! currentEdge ) {
                console.error("NO EDGE");
                exit();
            }

            if ( useAStar ) {
                length = aStarMod(currentEdge, endNode, nodes);
            } else {
                length = currentEdge.distance;
            }

            const alt = distance[ nodes.indexOf(u) ] + length;

            if ( alt < distance[ nodes.indexOf(neighbor!) ] ) {
                distance[ nodes.indexOf(neighbor!) ] = alt;
                previous[ nodes.indexOf(neighbor!) ] = u;
            }
        }
        
        // get closest node
        const index = distance.indexOf(Math.min(...distance));
        u = vertexSet[ index ]
    }

    // console.log(previous);
    // return { distance, previous };
    const path = orderPath(startingNode.intersection, endNode.intersection, previous, nodes)
    // return previous;
    return path;
};

const orderPath = (start: string, destination: string, _previous: (Node | undefined)[], nodes: Node[]) => {
    const path: string[] = [];
    const nodeToNode: any = {}

    // assemble link between source and destination nodes
    // key = destination
    // value = previous
    _previous.forEach((node: Node | undefined, index: number) => {
        if ( node ) {
            const key = nodes[index].intersection;
            const value = node.intersection;
            nodeToNode[key] = value;
        }
    });

    // get only nodes that make a path from destination to source
    let destinationNode = destination;
    let previousNode = nodeToNode[destinationNode];

    path.push(destinationNode);

    while ( previousNode ) {
        console.log(`Destination: ${destinationNode}`)
        destinationNode = previousNode;
        previousNode = nodeToNode[destinationNode];
        path.push(destinationNode);
    }

    // path.push(start);
    // return reversed so the start is the first index
    return path.reverse();
}