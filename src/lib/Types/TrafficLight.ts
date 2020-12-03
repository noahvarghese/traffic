import Node from "./Node";

export default interface TrafficLight {
    color: TrafficLightColor;
    maxGreenTime: number;
    minGreenTime: number;
    intersection: string;
    orientation: Orientation;
}

export enum Orientation {
    vertical = "vertical",
    horizontal ="horizontal"
}

export enum TrafficLightColor {
    green = "green",
    yellow = "yellow",
    red = "red"
}