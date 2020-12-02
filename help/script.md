Hey Steve
Welcome to my strategy explanation and justification viedo
My name is Noah Varghese.
My project is a traffic simulation.
It is based arounbd integrating knowledge of traffic with traffic signals

The way that I am going about this is simulating a road system, with rules for the traffic lights as a control. Generating vehicles on this graph with a destination, and simulating their movement.

The traffic lights will be on a max/min green light timer, with timer changes triggering when a vehicle is waiting at the opposing light.

I will run it once without any modifications to the traffic light algorithm, and then once more with an addition.

The metric I have chosen to use to influence the lights is a density based off of the cars on the road divided by the capacity of the road, and recursively calling it on the next 2 degrees of roads preceding the intersection, the immediate one being given a weight of 1, and the next getting a weight of 2 and so on.
With the final formula being f(x) = n(traffic/capacity) + (n - 1) * (traffic/capacity).... 

The areas of math that I will be convering that are from what we touched on in class is graph theory and dynamic programming, as well as state space

This simulation fits perfectly into graph theory as all intersections can be thought of as vertices
and the lanes as edges

(View json objects and map drawn)

I plotted out some example fields
This road network can be viewed as a directional graph
There is some extra information in the roads such as density and distance

Once we generate a car with a starting node, and a destination, the next part is getting it moving

When looking at A*, instead of applying the distance of node to node, I applied 2 heuristics a flow rate so to speak, and the euclidian distance from the current node to the end node, here i used the longitude and latitude to compute the euclidian distance
And the density was a set of randomly generated values for the demo, but it is calculated by the
current traffic of the edge divided by capactiy of the edge 

Looking at the trace I made, it pretty well ftried to flood fill the graph, it may perform better in a different structured graph as opposed to the grid like one here

Then for the state space, I am using FIFO queues to keep track of the cars, and each intersection will have a matrix as a property to keep track of vehicles changeing edges
each car will keep track of its path, and the path will be recaclulated each move, just as google maps data is recaclulated in real time

The euclidian distances could be kept track of in their own matrix of data, to prevent recalculations and duplicates, or we can just compute them when needed, depends on whether memory or computation capacity is lacking

I think my methods for testing will do well, but there are a variety of metrics and heuristucs I could use to modify the traffic light alogrithm and influence A*, but this lays the groundwork to build upon and refine my original hypothesis

That brings me to the end of my presentation, have a good one.

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

- instead of applying the distance of node to node I applied 2 heuristics, A flow rate so to speak, and the euclidian distance from the desired node

- Euclidian distance proposes a case for precomputing the distances instead of computing them while comparing them, but that depends on the size of our simulation and whether we can afford the extra computation or memory if precomputing and storing the distances

100S OF METRES * TRAFFIC DENSITY

-   Create X num of vehicles
-   Randomly assign those vehicles a starting node
-   Then randomly assign them an edge with the vehicle's starting node the same as the edges starting node
-   use whatever ending node that contains the queue the vehicle is currently on
-   Use A\* to get path
-   y = Take euclidian distance using longitude and latitude of each potential node from the destination node
-   x = Use distance in metres \* (traffic in queue / queue capacity) to prioritize nodes
-   x + y is the value used for djikstra

## Talk about state space

-  Car keeps track of its own path

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
