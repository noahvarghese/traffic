import fs from "fs";
import Node from "../Classes/Node";
import Edge from "../Classes/Edge";
import TrafficLight from "../Classes/TrafficLight";
import { TrafficLightsAtIntersection } from "../Types/Node";
import { Orientation } from "../Types/TrafficLight";

export class IntervalTimer {

    public timerId: number | undefined = 0;
    public startTime: number = 0;
    public remaining: number = 0;
    public state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed
    public interval: number;
    public callback: Function;

    constructor(_callback: Function, _interval: number) {
        this.callback = _callback;
        this.interval = _interval;

        this.startTime = new Date().getTime();
        this.timerId = setInterval(this.callback, this.interval);
        this.state = 1;
    }

    pause = () => {
        if (this.state != 1) return;

        this.remaining = this.interval - (new Date().getTime() - this.startTime);
        clearInterval(this.timerId);
        this.state = 2;
    };

    resume = () => {
        if (this.state != 2) return;

        this.state = 3;
        setTimeout(this.timeoutCallback, this.remaining);
    };

    reset = () => {
        if (this.state !== 2) return;

        this.remaining = 0;
        this.startTime = new Date().getTime();
        this.timerId = setInterval(this.callback, this.interval);
        this.state = 1;
    }

    timeoutCallback = () => {
        if (this.state != 3) return;

        this.callback();

        this.startTime = new Date().getTime();
        this.timerId = setInterval(this.callback, this.interval);
        this.state = 1;
    };

    isRunning = () => this.state === 1;

    setInterval = (_interval: number) => this.interval = _interval;
};

export const LoadNodes = (path: string): Node[] => {
    let nodes: Node[] = [];

    let data = fs.readFileSync(path);
    data = JSON.parse(data.toString());

    if ( data ) {
        data.forEach((el: any) => {
            nodes.push(
                new Node(
                    el.intersection,
                    {
                        latitude: el.latitude,
                        longitude: el.longitude
                    }
                )
            )
        });
    }

    return nodes;
}

// A better way tot do this is to use the intersection as the key instead of the index, 
// that way order doesn't matter
export const LoadEdges = (path: string, nodes: Node[]): Edge[] => {
    let edges: Edge[] = [];

    let data: Buffer | any = fs.readFileSync(path);
    data = JSON.parse(data.toString());

    if ( data ) {
        data.forEach((el: any) => {
            edges.push(
                new Edge(
                    el.streetName,
                    el.distance,
                    el.start,
                    el.end,
                    el.orientation
                )
            )
        });
    }

    return edges;
}

export const random = (max: number) => Math.floor(Math.random() * max)

export const LinkNodesAndEdges = (Nodes: Node[], Edges: Edge[]): void => {
    // let nodes: Node[] = [];
    
    for ( let node of Nodes ) {
        // get all edges that end at this node
        const edgesFromNode = Edges.filter((edge) => Node.FindNodeByIntersection(edge.endingNodeIntersection, Nodes) === node);


        // latitude runs north/south, 0/180
        // longitude runs east/west 0/180
        // if a latitude is less than another, that latitude is further north
        // if a longitude is less than another, that item is further east than the other

        for ( let edge of edgesFromNode ) {

            if ( edge.orientation === "vertical" ) {
                if ( Node.FindNodeByIntersection(edge.startingNodeIntersection, Nodes)!.location.latitude < node.location.latitude ) {
                    node.incomingRoads = { ...node.incomingRoads, northEdge: edge };
                } else {
                    node.incomingRoads = { ...node.incomingRoads, southEdge: edge };
                }
            }
            else if ( edge.orientation === "horizontal" ) {
                if ( Node.FindNodeByIntersection(edge.startingNodeIntersection, Nodes)!.location.longitude < node.location.longitude ) {
                    node.incomingRoads = { ...node.incomingRoads, eastEdge: edge };
                } else {
                    node.incomingRoads = { ...node.incomingRoads, westEdge: edge };
                }
            }
        }
    }
};

export const InitTrafficLights = (Nodes: Node[]) => {
    for ( let node of Nodes ) {
        let tmpTrafficLights: TrafficLightsAtIntersection = {
            ...node.trafficLights
        };

        if ( node.incomingRoads?.westEdge || node.incomingRoads?.eastEdge ) {
            tmpTrafficLights.eastWestLights = new TrafficLight(node.intersection, Orientation.horizontal);
        }

        if ( node.incomingRoads?.northEdge || node.incomingRoads?.southEdge ) {
            tmpTrafficLights.northSouthLights = new TrafficLight(node.intersection, Orientation.vertical);
        }

        node.trafficLights = tmpTrafficLights;
    }
}

export const randomHex = () => Math.floor(Math.random()*16777215).toString(16);