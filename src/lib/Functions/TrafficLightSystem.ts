import Node from "../Types/Node";
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

const TrafficWaiting = (currentLight: TrafficLight): boolean => {

    let trafficWaiting = false;

    // If the current direction is headed east and west, check north and south incoming roads
    if ( currentLight === currentLight.intersection.trafficLights?.eastWestLights ) {
        if ( currentLight.intersection.incomingRoads?.northEdge ) {
            if ( currentLight.intersection.incomingRoads.northEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }
        if ( currentLight.intersection.incomingRoads?.southEdge ) {
            if ( currentLight.intersection.incomingRoads.southEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }
    } 
    // if current direction is headed north and south, check east and west incoming roads
    else {
        if ( currentLight.intersection.incomingRoads?.eastEdge ) {
            if ( currentLight.intersection.incomingRoads.eastEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }
        if ( currentLight.intersection.incomingRoads?.westEdge ) {
            if ( currentLight.intersection.incomingRoads.westEdge.queue.peek() !== null ) {
                trafficWaiting = true;
            }
        }    
    }

    // figure out which direction the current traffic light covers


    return trafficWaiting;
};

const ChangeLights = (currentLight: TrafficLight, lightsChanging: boolean) => {

    if (lightsChanging) return;

    lightsChanging = true;

    const yellowTimerLength = 3;
    currentLight.color = TrafficLightColor.yellow;

    setTimeout(() => {
        if ( currentLight.intersection.trafficLights ) {
            if ( currentLight === currentLight.intersection.trafficLights?.northSouthLights ) {
                currentLight.intersection.trafficLights.eastWestLights!.color = TrafficLightColor.green
            } else {
                currentLight.intersection.trafficLights.northSouthLights!.color = TrafficLightColor.green;
            }

            currentLight.color = TrafficLightColor.red;
            
            if ( currentLight === currentLight.intersection.trafficLights.eastWestLights ) {
                currentLight = currentLight.intersection.trafficLights.northSouthLights!;
            } else {
                currentLight = currentLight.intersection.trafficLights.eastWestLights!;
            }
        }

        SwapLights(currentLight);        
        lightsChanging = false;
    }, TimePerFrame(yellowTimerLength))
};

const CheckForBreak = (currentLight: TrafficLight): boolean => {
    if ( currentLight === currentLight.intersection.trafficLights?.northSouthLights ) {
        if ( 
            currentLight.intersection.incomingRoads?.eastEdge?.queue.peek({ index: 12 }) === null && 
            currentLight.intersection.incomingRoads?.westEdge?.queue.peek({ index: 12 }) === null
          ) {
            return true;
        }
    }
    else {
        if ( 
            currentLight.intersection.incomingRoads?.northEdge?.queue.peek({ index: 12 }) === null &&
            currentLight.intersection.incomingRoads?.southEdge?.queue.peek({ index: 12 }) === null
        ) {
            return true;
        }
    }

    return false;
};

const SwapLights = (currentLight: TrafficLight) => currentLight = 
                                                        currentLight === currentLight.intersection.trafficLights?.eastWestLights ? 
                                                            currentLight.intersection.trafficLights.northSouthLights! :
                                                            currentLight.intersection.trafficLights?.eastWestLights!;

export const TrafficLightSystem = (horizontalTrafficLight: TrafficLight, verticalTrafficLight: TrafficLight) => {

    const currentLight: TrafficLight = horizontalTrafficLight.color === TrafficLightColor.green ? horizontalTrafficLight : verticalTrafficLight;

    let lightsChanging = false;

    // Start min green timer
    const minGreenTimer = new IntervalTimer(() => {
        ChangeLights(currentLight, lightsChanging);
    }, TimePerFrame(currentLight.minGreenTime));

    let maxGreenTimer: IntervalTimer;

    // run every second, this will run all checks
    return setInterval(() => {

        // If conflicting traffic detected AND max green timer has been started AND min green timer has been paused
        if ( 
            TrafficWaiting(currentLight) && 
            ! maxGreenTimer.isRunning() &&
             minGreenTimer.isRunning() 
        ) {

            // stop min green timer
            minGreenTimer.pause();
            
            // start max green timer
            maxGreenTimer = new IntervalTimer(() => {
                ChangeLights(currentLight, lightsChanging);
            }, TimePerFrame(currentLight.maxGreenTime));
        }

        else if ( maxGreenTimer.isRunning() && ! minGreenTimer.isRunning() ) {
            if ( CheckForBreak(currentLight) ) {
                maxGreenTimer.pause();
                ChangeLights(currentLight, lightsChanging);
            }
        }

        // if minimum greent timer ends without any conflictin traffic
    }, FrameLength);
}