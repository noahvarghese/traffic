import Node from "./lib/Classes/Node";
import Edge from "./lib/Classes/Edge";
import Car from "./lib/Classes/Car";
import Djikstra from "./lib/Functions/Djikstra";
import { LoadNodes, LoadEdges, random, LinkNodesAndEdges, InitTrafficLights } from "./lib/Functions/Functions";


/************************************
 *  My Traffic Simulation
 *      Noah Vargese
 *      000753196
 *************************************/




// use base djikstra, or a star for pathfinding
const useAStar = true;


// Load graph as a set of nodes/vertices and edges

const Intersections: Node[] = LoadNodes("./src/data/Nodes.json");

// Currently associated nodes stored in  json as indexes
// would be nice to store by intersection,
// so that array can be modified without references being updated
// We pass the nodes in so that a lookup can be done and a reference created
const Roads: Edge[] = LoadEdges("./src/data/Edges.json", Intersections);


// set references, so we always have access to all objects, no matter the scope
// FIXED: need to figure out a way to tie the edges to the correct orientation
// this also initializes the traffic lights
// or I can do it after this
LinkNodesAndEdges(Intersections, Roads);
InitTrafficLights(Intersections);



// need to init traffic lights



// create cars
const numberOfVehicles: number = 1;
const cars: Car[] = [];

console.log("Started");

for ( let i = 0; i < numberOfVehicles; i++ ) {
    const startingNode: Node = Intersections[ random(Intersections.length) ];
    const endingNode: Node = Intersections[ random(Intersections.length) ];

    const car = new Car(
       startingNode,
       endingNode,
       Djikstra(startingNode, endingNode, Intersections, Roads, useAStar)
    );

    cars.push(car);
}

// generate starting and ending points for the cars

// place cars on road

// simulate road

// simulate movement