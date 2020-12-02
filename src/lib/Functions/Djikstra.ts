import { exit } from "process";
import Edge from "../Classes/Edge";
import Node from "../Classes/Node";
import { EuclidianDistance } from "./TrafficLightSystem";

const aStarMod = ( edge: Edge, targetNode: Node ) => {
    const density = edge.queue.density();
    const distance = edge.distance;

    const flowRate = density * distance;

    const distanceFromDestination = EuclidianDistance(edge.endNode, targetNode);

    return distanceFromDestination + flowRate;
};

export default (
    startingNode: Node, 
    endNode: Node, 
    nodes: Node[], 
    edges: Edge[],
    useAStar: boolean = true
): (Node | undefined)[] => {
    console.log(`Starting: ${startingNode.intersection}`);
    console.log(`Ending: ${endNode.intersection}`);

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

        console.log("\n\nvetices");
        console.log("========================\n");
        
        vertexSet.forEach((v) => {
            console.log(v.intersection);
        });

        // remove after use
        console.log(`\n\nLength before filter: ${vertexSet.length}`);

        vertexSet = vertexSet.filter((node: Node) => node !== u);

        console.log(`\nLength after filter: ${vertexSet.length}`);

        // get neighbors, that are still in the vertex set
        console.log(edges, u.intersection);
        const neighbors: Node[] = edges.filter((edge: Edge) => edge.startingNode.intersection === u.intersection).map((edge: Edge) => edge.endNode);
        console.log(neighbors)

        for ( let neighbor of neighbors ) {
            let length: number;
            const currentEdge = edges.find((edge: Edge) => (edge.startingNode === u && edge.endNode === neighbor));

            if ( ! currentEdge ) {
                console.error("NO EDGE");
                exit();
            }

            if ( useAStar ) {
                length = aStarMod(currentEdge, endNode);
            } else {
                length = currentEdge.distance;
            }

            const alt = distance[ nodes.indexOf(u) ] + length;

            if ( alt < distance[ nodes.indexOf(neighbor) ] ) {
                distance[ nodes.indexOf(neighbor) ] = alt;
                previous[ nodes.indexOf(neighbor) ] = u;
            }
        }
        
        // get closest node
        const index = distance.indexOf(Math.min(...distance));
        u = vertexSet[ index ]
    }

    console.log(previous);
    // return { distance, previous };
    return previous;
};