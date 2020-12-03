import Node from "../Types/Node";
import TrafficLightAttributes, { Orientation, TrafficLightColor } from "../Types/TrafficLight";

export default class TrafficLight implements TrafficLightAttributes {
    public color: TrafficLightColor = TrafficLightColor.red;
    public maxGreenTime: number = 50;
    public minGreenTime: number = 10;
    public intersection: string;
    public orientation: Orientation;

    constructor(_intersection: string, _orientation: Orientation ) {
        this.intersection = _intersection;
        this.orientation = _orientation;
    }
}