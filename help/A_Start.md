# Trace of A*  
- data from Edges.json and Nodes.json

===

## Computations 

### djikstra value computation:
- distance in metres \* (traffic in queue / queue capacity)
- edge.distance \* ( queue.vehicleCount / queue.length )

### a* value computation
- euclidian using latitude and longitude
    - multiplied by 1000 to increase impact of the metric
- ((x1 - x2) ^ 2 + (y1 - y2) ^ 2) ^ 0.5

===

## Trace


