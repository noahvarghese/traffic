import Node from "../Types/Node";
import TrafficLightAttributes, { TrafficLightColor } from "../Types/TrafficLight";

export default class TrafficLight implements TrafficLightAttributes {
    public color: TrafficLightColor = TrafficLightColor.red;
    public maxGreenTime: number = 50;
    public minGreenTime: number = 10;
    public intersection: Node;

    constructor(_node: Node) {
        this.intersection = _node;
    }
}