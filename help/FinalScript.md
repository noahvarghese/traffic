# Script

## Introduce project briefly

## Talk about the types of math used

## Start off with Graphs
- Intersections as vertices
- Roads as edges

## Go onto A*
- What is used to calculate it
- Graph theory -> latitude, longitude -> euclidian distance from end node
- Physical distance between each node

## Do onto state space
- OOP
- Talk about tracking intersections and cars
    
### Roads
- FIFO Queues

### Intersections
    - Matrices for movement in an intersection
    - Traffic lights being a property of an intersection
    - And them running on a constant timer

### Cars being
- Move as long as there is an empty space ahead of them in the queue

### Traffic lights
- lots of factors that go into traffic light systems
- Main talking point is that initial sim is done by triggering different timers based on cars waiting for a green
- Modification involves using a higher incoming traffic density to trigger a timer to change, or stay

- first degree density is of greatest weight, add that to all second degree weights
- second degree weights are caclulated by getting their density and multiplying by 2
- calculation is: (1st segment density) + (foreach 2nd segment density: 2nd segment density += density * 2)

### Metrics
- Keep track of stopped vehicles at traffic light, so max length is what will be compared
- as the byproduct of reducing traffic is reducing queue lengths
