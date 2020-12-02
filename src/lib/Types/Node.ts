import Edge from "./Edge";
import TrafficLight from "./TrafficLight";

export default interface Node {
    intersection: string;
    location: LocationAttributes;
    trafficLights?: TrafficLightsAtIntersection
    incomingRoads?: NodeOptionalAttributes;
}

export interface NodeOptionalAttributes {
    northEdge?: Edge;
    southEdge?: Edge;
    eastEdge?: Edge;
    westEdge?: Edge;
}

export interface LocationAttributes {
    latitude: number;
    longitude: number;
}

export interface TrafficLightsAtIntersection {
    northSouthLights?: TrafficLight,
    eastWestLights?: TrafficLight;
}