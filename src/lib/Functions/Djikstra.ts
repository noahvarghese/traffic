import { exit } from "process";
import Car from "../Classes/Car";
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

const minOf = (object: any) => {
    let min = { key: "", value: Infinity };

    Object.keys(object).forEach((key) => {
        if ( object[key] < min.value ) {
            min = { key, value: object[key]} ;
        }
    })

    return min;
}

export default (
    startingNode: Node, 
    endNode: Node, 
    nodes: Node[], 
    edges: Edge[],
    useAStar: boolean = true
): {} => {

    let queue: (Node | undefined)[] = [];
    const sequence = [];
    const dist: any = {};
    const prev: any = {};
    let current = startingNode;

    for ( let node of nodes ) {
        dist[node.intersection] = Infinity;
        prev[node.intersection] = undefined;
        queue.push(node);
    }

    dist[startingNode.intersection] = 0;

    let u:Node | undefined = new Node("", { latitude: 0, longitude: 0});

    while ( queue.filter((item) => item !== undefined).length > 0 && u !== undefined ) {
        // get distance key of min distance value and node associated with it
        // then remove that node from queue
        const min = minOf(dist);

        let qIndex = Infinity;
        u = queue.find((item, index) => {
            qIndex = index;
            // return item!.intersection === min.key
            if ( item ) {
                return item.intersection === min.key;
            }

            return false;
        });

        queue[qIndex] = undefined;

        const neighbors = edges.filter((edge) => edge.startingNodeIntersection === u?.intersection)
                                .map((edge) => (
                                    {
                                        edge, 
                                        node: 
                                            nodes.find((node) => (edge.endingNodeIntersection === node.intersection))
                                    }
                                ));

        for ( let neighbor of neighbors ) {
            let length;


            if ( useAStar ) {
                length = aStarMod(neighbor.edge, endNode, nodes);
            } else {
                length = neighbor.edge.distance;
            }

            const alt = dist[u?.intersection!] + length;
            const idx = Object.keys(dist).find((key) => key === neighbor.node?.intersection)!
        
            if ( alt < dist[idx]  ) {
                dist[idx] = alt;
                prev[idx] = u?.intersection;
            }
        }
    }

    return prev;

    // console.log(`Starting: ${startingNode.intersection}`);
    // console.log(`Ending: ${endNode.intersection}`);

    // let vertexSet: Node[] = [];


    // const distance: number[] = [];
    // const previous: (Node | undefined)[] = [];
    

    // // init arrays for tracking
    // for ( let i = 0; i < nodes.length; i++ ) {
    //     distance[i] = Infinity;
    //     previous[i] = undefined;
    //     vertexSet.push(nodes[i])
    // }

    // distance[ nodes.indexOf(startingNode) ] = 0;

    // let u: Node = vertexSet[ vertexSet.indexOf(startingNode) ];

    // while ( u !== undefined ) {

    //     // remove after use
    //     vertexSet = vertexSet.filter((node: Node) => node !== u);

    //     // get neighbors, that are still in the vertex set
    //     const neighbors: (Node | undefined)[] = edges.filter((edge: Edge) => edge.startingNodeIntersection === u.intersection).map((edge: Edge) => Node.FindNodeByIntersection(edge.endingNodeIntersection, nodes));

    //     for ( let neighbor of neighbors ) {
    //         let length: number;
    //         const currentEdge = edges.find((edge: Edge) => (edge.startingNodeIntersection === u.intersection && edge.endingNodeIntersection === neighbor?.intersection));

    //         if ( ! currentEdge ) {
    //             console.error("NO EDGE");
    //             exit();
    //         }

    //         if ( useAStar ) {
    //             length = aStarMod(currentEdge, endNode, nodes);
    //         } else {
    //             length = currentEdge.distance;
    //         }

    //         const alt = distance[ nodes.indexOf(u) ] + length;

    //         if ( alt < distance[ nodes.indexOf(neighbor!) ] ) {
    //             distance[ nodes.indexOf(neighbor!) ] = alt;
    //             previous[ nodes.indexOf(neighbor!) ] = u;
    //         }
    //     }
        
    //     // get closest node
    //     const index = distance.indexOf(Math.min(...distance));
    //     u = vertexSet[ index ]
    // }

    // // console.log(previous);
    // // return { distance, previous };
    // // const path = orderPath(startingNode.intersection, endNode.intersection, previous, nodes)
    // return previous;
    // // return path;
};

export const orderPath = (car: Car, nodes: Node[]) => {
    const destination = car.destinationNode.intersection;
    const previous = car.path;
    // console.log(previous);

    const path: string[] = [];
    const nodeToNode: any = {}

    // assemble link between source and destination nodes
    // key = destination
    // value = previous
    previous.forEach((node: Node | undefined, index: number) => {
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

export const shortestPath = (car: Car) => {
    // let s represent a sequence of intersections
    let s = [];
    let path = car.path;
    console.log(path)

    let u = car.destinationNode.intersection;

    if ( path[u] || u === car.startingNode.intersection ) {
        while ( u ) {
            s.push(u);
            u = path[u];
        }
    }

    console.log(s);
    return s;
}