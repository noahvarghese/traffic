#!/opt/anaconda/bin/python3.8

import osmnx as ox
import networkx as nx
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import numpy as np
import geoplot
import os
import inspect

# Cache data pulled
ox.config(use_cache=True, log_console=True)

# Get city boundaries
city = ox.geocoder.geocode_to_gdf("Oakville, Ontario, CA", which_result=0)

# Project the data onto a Geo Data Frame
ax = ox.project_gdf(city).plot(fc='none', ec='red')


roads = ox.graph.graph_from_place("Oakville, Ontario, CA", network_type="drive_service")

# nodes = {}

# for k in roads.nodes:
#     if "highway" in roads.nodes[k]:
#         if roads.nodes[k]["highway"] == "traffic_signals":
#             nodes[k] = roads.nodes[k]
#             print(roads.nodes[k])

# roads.nodes = nodes
# print(type(roads.nodes))

roads = ox.project_graph(roads)
# print(type(roads))

saveDirectory = os.getcwd() + "/data/processed/road/town/Map.png"

node_color = ['blue' if "highway" in roads.nodes[node] and roads.nodes[node]['highway'] =='traffic_signals' else 'none' for node in roads.nodes() ]

# Plot road and boundary data
ox.plot_graph(roads, ax, node_color=node_color, node_zorder=3, edge_color="gray", edge_linewidth=2, save=True, filepath=saveDirectory, show=True)


# Show the graph
plt.show()

# check roads.nodes for key highway: traffic_signals

# values_view = roads.nodes.values()
# value_iterator = iter(values_view)
# value = next(value_iterator)

# while value:
#     print(value)
#     value = next(value_iterator)