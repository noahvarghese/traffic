// Prep Simulation
import Node from "./lib/Classes/Node";
import Edge from "./lib/Classes/Edge";
import { Car } from "./lib/Classes/Car";
import Djikstra from "./lib/Functions/Djikstra";
import { LoadNodes, LoadEdges, random, LinkNodesAndEdges } from "./lib/Functions/Functions";
import { exit } from "process";


const useAStar = true;

// A better way to load

const Nodes: Node[] = LoadNodes("./src/data/Nodes.json");
const Edges: Edge[] = LoadEdges("./src/data/Edges.json", Nodes);

// console.log(Nodes[0]);
LinkNodesAndEdges(Nodes, Edges);
// console.log(Nodes[0]);

// need to figure out a way to tie the edges to the correct orientation

// create cars
// const numberOfVehicles: number = 1;
// const cars: Car[] = [];

// console.log("Started");

// for ( let i = 0; i < numberOfVehicles; i++ ) {
//     const startingNode: Node = Nodes[ random(Nodes.length) ];
//     const endingNode: Node = Nodes[ random(Nodes.length) ];

//     const car = new Car(
//        startingNode,
//        endingNode,
//        Djikstra(startingNode, endingNode, Nodes, Edges, useAStar)
//     );

//     cars.push(car);
// }

// generate starting and ending points for the cars

// place cars on road

// simulate road

// simulate movement