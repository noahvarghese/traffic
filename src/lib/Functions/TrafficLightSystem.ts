import Node from "../Classes/Node";
import TrafficLight, { TrafficLightColor } from "../Types/TrafficLight";
import { IntervalTimer } from "./Functions";

// min times are stored in seconds
// need to compute miliseconds
// we are anticipating every move to take 1/4s
export const TimePerFrame = (time: number) => time * FrameLength;

export const FrameLength = 1000 / 4;

// standard distance calculation directly from one point to another
// we utilize longitude and latitude in this case
export const EuclidianDistance = (node1: Node, node2: Node) => {
    const scale = 1000;

    const latitude1 = node1.location.latitude * scale;
    const latitude2 = node2.location.latitude * scale;

    const longitude1 = node1.location.longitude * scale;
    const longitude2 = node2.location.longitude * scale;

    return Math.sqrt( Math.pow(latitude1 - latitude2, 2) + Math.pow(longitude1 - longitude2, 2) );
}

enum Directions {
    north = "North",
    south = "South",
    east = "East",
    west = "West"
}

const TrafficWaiting = (currentLight: TrafficLight, nodes: Node[]): boolean => {

    let trafficWaiting = false;

    // If the current direction is headed east and west, check north and south incoming roads
    const currentIntersection = Node.FindNodeByIntersection(currentLight.intersection, nodes);

    if ( currentLight === currentIntersection.trafficLights?.eastWestLights ) {
        if ( currentIntersection.incomingRoads?.northEdge ) {
            if ( currentIntersection.incomingRoads?.northEdge?.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }
        if ( currentIntersection.incomingRoads?.southEdge ) {
            if ( currentIntersection.incomingRoads.southEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }
    } 
    // if current direction is headed north and south, check east and west incoming roads
    else {
        if ( currentIntersection.incomingRoads?.eastEdge ) {
            if ( currentIntersection.incomingRoads.eastEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }
        if ( currentIntersection.incomingRoads?.westEdge ) {
            if ( currentIntersection.incomingRoads.westEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }    
    }

    // figure out which direction the current traffic light covers


    return trafficWaiting;
};

const ChangeLights = (currentLight: TrafficLight, lightsChanging: boolean, nodes: Node[]) => {

    if (lightsChanging) return;

    lightsChanging = true;

    const yellowTimerLength = 3;
    currentLight.color = TrafficLightColor.yellow;

    setTimeout(() => {
        const currentIntersection = Node.FindNodeByIntersection(currentLight.intersection, nodes);

        if ( currentIntersection.trafficLights ) {
            if ( currentLight === currentIntersection.trafficLights?.northSouthLights ) {
                currentIntersection.trafficLights.eastWestLights!.color = TrafficLightColor.green
            } else {
                currentIntersection.trafficLights.northSouthLights!.color = TrafficLightColor.green;
            }

            currentLight.color = TrafficLightColor.red;
            
            if ( currentLight === currentIntersection.trafficLights.eastWestLights ) {
                currentLight = currentIntersection.trafficLights.northSouthLights!;
            } else {
                currentLight = currentIntersection.trafficLights.eastWestLights!;
            }
        }

        SwapLights(currentLight, nodes);        
        lightsChanging = false;
    }, TimePerFrame(yellowTimerLength))
};

const CheckForBreak = (currentLight: TrafficLight, nodes: Node[]): boolean => {
    const currentIntersection = Node.FindNodeByIntersection(currentLight.intersection, nodes);

    if ( currentLight === currentIntersection.trafficLights?.northSouthLights ) {
        if ( 
            currentIntersection.incomingRoads?.eastEdge?.queue.peek({ index: 12 }) === null && 
            currentIntersection.incomingRoads?.westEdge?.queue.peek({ index: 12 }) === null
          ) {
            return true;
        }
    }
    else {
        if ( 
            currentIntersection.incomingRoads?.northEdge?.queue.peek({ index: 12 }) === null &&
            currentIntersection.incomingRoads?.southEdge?.queue.peek({ index: 12 }) === null
        ) {
            return true;
        }
    }

    return false;
};

const SwapLights = (currentLight: TrafficLight, nodes: Node[]) => {
    const currentIntersection = Node.FindNodeByIntersection(currentLight.intersection, nodes);
    if ( currentLight === currentIntersection.trafficLights?.eastWestLights ) { 
        currentLight = currentIntersection.trafficLights.northSouthLights! 
    } else {
        currentLight = currentIntersection.trafficLights?.eastWestLights!;
    }

    // give the option on returning it as opposed to modifying the value of reference that was passed in
    return currentLight;
}

export const TrafficLightSystem = (horizontalTrafficLight: TrafficLight, verticalTrafficLight: TrafficLight, Nodes: Node[]) => {

    const currentLight: TrafficLight = horizontalTrafficLight.color === TrafficLightColor.green ? horizontalTrafficLight : verticalTrafficLight;

    let lightsChanging = false;

    // Start min green timer
    const minGreenTimer = new IntervalTimer(() => {
        ChangeLights(currentLight, lightsChanging, Nodes);
    }, TimePerFrame(currentLight.minGreenTime));

    let maxGreenTimer: IntervalTimer;

    // run every second, this will run all checks
    return setInterval(() => {

        // If conflicting traffic detected AND max green timer has been started AND min green timer has been paused
        if ( 
            TrafficWaiting(currentLight, Nodes) && 
            ! maxGreenTimer.isRunning() &&
             minGreenTimer.isRunning() 
        ) {

            // stop min green timer
            minGreenTimer.pause();
            
            // start max green timer
            maxGreenTimer = new IntervalTimer(() => {
                ChangeLights(currentLight, lightsChanging, Nodes);
            }, TimePerFrame(currentLight.maxGreenTime));
        }

        else if ( maxGreenTimer.isRunning() && ! minGreenTimer.isRunning() ) {
            if ( CheckForBreak(currentLight, Nodes) ) {
                maxGreenTimer.pause();
                ChangeLights(currentLight, lightsChanging, Nodes);
            }
        }

        // if minimum greent timer ends without any conflictin traffic
    }, FrameLength);
}