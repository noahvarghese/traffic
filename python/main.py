#!/opt/anaconda/bin/python3.8

import osmnx
import networkx as nx
import plotly.graph_objects as go
import numpy as np

province = ox.gdf_from_place('Ontario, CA')
ox.plot_shape(ox.project_gdf(province))