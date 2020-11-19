#!/opt/anaconda/bin/python3.8

import osmnx as ox
import networkx as nx
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import numpy as np
import geoplot

# Cache data pulled
ox.config(use_cache=True, log_console=True)

# Get city boundaries
city = ox.geocoder.geocode_to_gdf("Oakville, Ontario, CA", which_result=2)

# Project the data onto a Geo Data Frame
ax = ox.project_gdf(city).plot(fc='none', ec='red')

roads = ox.graph.graph_from_place("Oakville, Ontario, CA", network_type="drive")
# bx = ox.project_graph(roads).plot_graph()
ox.plot_graph(roads)

# Show the graph
plt.show()