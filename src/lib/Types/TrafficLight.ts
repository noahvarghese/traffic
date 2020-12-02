import Node from "./Node";

export default interface TrafficLight {
    color: TrafficLightColor;
    maxGreenTime: number;
    minGreenTime: number;
    intersection: Node;
}

export enum TrafficLightColor {
    green = "green",
    yellow = "yellow",
    red = "red"
}