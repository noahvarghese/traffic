import * as d3 from "d3";

export const renderMap = (geojsonFilePath: string) => {
    return new Promise((resolve, reject) => {
        const width = 900;
        const height = 500;
        // create element
        // heopfully we can pass back this html
        const svg = d3
            .create("svg")
            .attr("width", width)
            .attr("height", height);

        const projection = d3.geoMercator();
        const path: d3.GeoPath<
            any,
            d3.GeoPermissibleObjects
        > = d3.geoPath().projection(projection);

        d3.json(geojsonFilePath).then((geojson: any) => {
            projection.fitSize([width, height], geojson);
            resolve(svg.data(geojson.features).enter());
        });
    });
};
