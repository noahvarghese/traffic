# MATH

==============================

## Requirements

==============================

### Create Traffic

    - Specify starting node
    - Randomize destination
    - Take speed into account
    	- simulate accelerating/decelerating?
    - A* to find the optimal path
    	- use flow from HERE api
    	- use manhattan distance


### Road Map as Graph (set of edges and vertices)

    - OSM data to json?
    	- Use path data as a straight line between vertices
    	- plot manually?
    	- Use metric distances instead of latitude/longitude

### Simulate Traffic Lights

    - What class is each traffic light in the intersection?
    	- Types of traffic signal operations
    		- Source https://halton.ca/For-Residents/Road-Construction/Traffic-Signals
    		- Fixed (timed)
    			- Set fixed time to change for each side
    		- Semi Actuated (change in response to vehicle/pedestrian, time vary with traffic and have min/max values)
    			- Fixed time
    				- Increase/decrease max/min signal length based on traffic
    			- Changes if vehicle waiting
    				- Keep track of vehicles waiting
    		- Fully Actuated (signals change with min/max green times, depends on traffic and pedestrian demand on all approaches)
    			- Signal changes based on max/min green times
    				- Times change based on traffic demand on all approaches
    					- Vehicles waiting?
    	- Ways to determine if car is waiting
    		- Detector loop mounted under the road
    		- Video camera on a signal pole
    - Figure out safe stopping point behind intersection to simulate being stopped at (relative to speed?)
    	- Take average stopping distance into account
    		- Any vehicle behind that line will be considered as stopped at the front of the queue
    			- All vehicles will stop behind it

### Keep Track of Traffic Stats

    - List of cars for each lane?
    - List of lanes per road direction?
    - After setting a path for each vehicle
    	- Move vehicles once they reach the end of a road segment [List]
    		- Into a new road segment [List]
    		- Keep adding empty spaces at each interval so that the lists are always the same sizeo

### Traffic Light Rules Addition

    - Fixed
    	- No changes
    - Semi Actuated
    	- Add flow rate from the next 3 intersections, with the closest getting the highest weighting?
    		- Similar to KNN??
    - Keep track of cars stopped at red light
    	- Add flow rate from the next 3 intersections, with closest getting the highest weighting?
