# Todo

## Obtain realistic traffic data

-   [ ] Get a count of traffic (hourly?)
    -   [x] Try HERE API
    -   [ ] Halton Region ATR (Automated Traffic Recorder) mayyyybe TMCs (Turning Movement Counts)

## Get driver statistics

-   [ ] Speed
-   [ ] Likely hood of stopping
-   ~~[ ] Get accidents~~ (not necessary, will have no impact on traffic data)

## Generate moving traffic

-   [ ] Based off total traffic per area, create 'Drivers' with a starting point at that point
-   [ ] Generate points on the road that a 'Driver' will stop at
-   [ ] Djikstra's or A\* to find the best path from start to end
    -   [ ] use traffic en route and distance as factors for weight when calculating which path to take
-   [ ] Simulate initial traffic light control (see resources on abstract of how to implement it)
-   [ ] Simulate movement, stopping, queue length (make sure to calculate speed)
-   [ ] Record results of first simulation
-   [ ] Simulate traffic lights with knowledge of traffic ( Keep driver start/end/speed/etc the same as first run through )
    -   [ ] Where traffic is most condensed as a result of those starting points and movement, attempt to alleviate it
-   [ ] Record results of second sim
-   [ ] Compare queue length, average travel time, max travel time, min travel time
-   [ ] Report results
-   [ ] ANIMATE AND VISUALIZE

# Tried

-   HERE API
    -   Got auth working (oauth2)
    -   Pulled flow data
        -   Uknown abbreviations
        -   No useful recognizable metrics

## Resources

-   Traffic Lights https://www.halton.ca/For-Residents/Roads-Construction/Traffic-Signals#04
    -   Fixed Time
    -   Semi Actuated ( Changes if a vehicle/pedestrian is on the side street )
    -   Fully Actuated ( Changes with min/max green times, depends on traffic/pedestrian demand on all approaches )
    -   Detection Methods
        -   Video signal
        -   Detector loop embedded in road
            -   When driven over, notfies that there is a car
            -   Placed at white stop bar
