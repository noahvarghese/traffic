import NodeAttributes, { LocationAttributes, NodeOptionalAttributes, TrafficLightsAtIntersection } from "../Types/Node";

export default class Node implements NodeAttributes {
    public intersection: string;
    public location: LocationAttributes;
    public trafficLights?: TrafficLightsAtIntersection;
    public incomingRoads?: NodeOptionalAttributes = {
        southEdge: undefined,
        northEdge: undefined,
        eastEdge: undefined,
        westEdge: undefined
    };

    constructor(
        _intersection: string, 
        _location: LocationAttributes, 
        _trafficLights?: TrafficLightsAtIntersection, 
        _incomingRoads?: NodeOptionalAttributes
    ) {
        this.intersection = _intersection;
        this.location = _location;
        this.trafficLights = _trafficLights;
        this.incomingRoads = _incomingRoads !== null ? _incomingRoads : { southEdge: undefined, northEdge: undefined, eastEdge: undefined, westEdge: undefined};
    }

    static FindNodeByIntersection = (intersection: string, Nodes: Node[]) => {
        return Nodes.find((node) => node.intersection === intersection)
    }

}