# script

## Talk about Graphs

-   maps can be represented as a graph
-   while a graph is a set of nodes and a set of edges and can be directed or undirected
-   a map, specifically a road map can be represented as a directional graph
-   each node is a traffic signal
-   and each edge is queue, that would hold the cars
-   I copied out some data to walk through for this demonstration
-   The nodes location is positioned using the longitude and latitude of each intersection
-   Since I used a relatively small state space for demonstration, I was able to copy the distances between intersection by hand

## Talk about A\*

-   Create X num of vehicles
-   Randomly assign those vehicles a starting node
-   Then randomly assign them an edge with the vehicle's starting node the same as the edges starting node
-   use whatever ending node that contains the queue the vehicle is currently on
-   Use A\* to get path
-   y = Take euclidian distance using longitude and latitude of each potential node from the destination node
-   x = Use distance in metres \* (traffic in queue / queue capacity) to prioritize nodes
-   x + y is the value used for djikstra

## Talk about state space

-   For the state space problems we have done in class, we used a binary tree and typically only cared about the leaf nodes, or representing failed states, and succesful states

-   For this project, the simulation should keep running, so we don't want to keep track of the previous state of the driver

-   We will keep track of current posiitoning using FIFO queues
-   each element of the array representing the average sive of a car (roughy 16 feet or 4.87m)
-   divide the length of one of the edges by the length of the average car
-   that gives the number of indexes for each queue
-   cars will be allowed to move to the next spot if it the next value in the queue is null

-   The traffic light computation is a bit more interesting
-   I wrote it out into pseudo code, which looks more like a weird combination of python and poor programming now that I look at it lol
-   There are many variations of traffic lights to simulate so I just focused on one
-   As each intersection has traffic passing along the vertical or horizontal direction, each edge is classified as either vertical and horizontal
-   and to match each edge, the traffic lights in the intersection have properties of vertical and horizontal
-   Traffic lights will keep track of queue length as a metric, and will be logged for analysis after each run
-   Operate on max/min green times
-   max green timer triggers when vehicle waiting for green
-   min green time runs automatically
-   The modification to analyze traffic for comparison will take traffic density into account (vehicles in the next 2 oncoming queues / length of the next 2 oncoming queues)
-   will keep the timers, but if one approach has a greater traffic density than another, start looking for break to allow direction with greatest traffic density through

-   keep track of longest queue at each light
-   Compare queues before paying attention to traffic density, and after
