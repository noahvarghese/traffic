import Node from "../Classes/Node";

export const aStar = (nodes: Node[], start: string, end: string) => {
    const startNode = Node.FindNodeByIntersection(start, nodes);

    const endNode = Node.FindNodeByIntersection(end, nodes);

    // Set values to 0 somehow for both???

    let openList: Node[] = [];
    let closedList: Node[] = [];

    openList.push(startNode);

    while( openList.length > 0 ) {
        let currentNode = openList[0];
        // to get the cost
        // cost = (distance * density) + euclidianDistance(item, end);
        // get the edge to get density and distance
        // can use euclidian with just target and selected
        let currentNodeCost = "";
        let currentIndex = 0;
        openList.forEach((item, index) => {
            if ( item < currentNode.)
        })
    }
}
https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2