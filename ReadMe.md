# Google Traffic

===

## About

This project is set to simulate integration of google maps traffic data with traffic light systems.
It will compare the results using a variety of metrics ( queue length at red light, max travel time, mean travel time, min travel time, maybe use travel distance to average it out per metre/100m/1km etc? )

## Goals

Application of data structures and algorithms, specifically path finding

===

## Setup

```bash
# Install dependencies
cd traffic && npm i

# Run in development
npm run dev
```

## Folder Structure

-   build holds the compiled code after running

```bash
npm run build
```

-   src holds all source files
    -   lib holds custom classes and functions
-   data all external data
    -   raw (preprocessed)
    -   processed (self explanatory)
-   node_modules (external packages - npm)

## Explanation

###### Classes

-   Login is responsible for getting the authToken for any apis
-   HERE class is responsible for making queries to here api
-   File is responsible for file interactions
-   Logs is responsible for logging requests/actions/data to console or file

###### Processes

-   Any data retrieved from an api should be downloaded
-   Any processing of the data that has been determined as succesful should be saved
    -   Keep all transformations seperate in case it is necessary to go back a step
    -   This is to prevent increases in run time as massive data may need to be downloaded and many operations applied
