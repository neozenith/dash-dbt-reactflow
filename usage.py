from dash import Dash, Input, Output, callback, html

import dash_dbt_reactflow
from dash_dbt_reactflow.dbt.runner import DbtManager, DbtProject


app = Dash(
    __name__,
    meta_tags=[
        {"name": "viewport", "content": "width=device-width, initial-scale=1.0"}
    ],
)

project_manager = DbtManager() # Manage multiple dbt projects if need be.
project = project_manager.projects['jaffle_shop']

nodes, edges = project.reactflow_parse_graph(width=1024, height=768)

app.layout = html.Div(
    [
        dash_dbt_reactflow.DashDbtReactflow(
            id="dbt-reactflow", 
            nodes=nodes, 
            edges=edges, 
        )
    ], 
    style={"height": "100vh"} # https://reactflow.dev/docs/guides/troubleshooting/#the-react-flow-parent-container-needs-a-width-and-a-height-to-render-the-graph
)


# @callback(Output("output", "children"), Input("input", "value"))
# def display_output(value):
#     return "You have entered {}".format(value)


if __name__ == "__main__":
    app.run_server(debug=True)
