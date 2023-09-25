from dash import Dash, Input, Output, callback, html

import dash_dbt_reactflow

app = Dash(
    __name__,
    meta_tags=[
        {"name": "viewport", "content": "width=device-width, initial-scale=1.0"}
    ],
)
nodes = [
    {
      "id": '1',
      "data": { 'label': 'Hello' },
      "position": { 'x': 0, 'y': 0 },
      "type": 'input',
    },
    {
      'id': '2',
      'data': { 'label': 'World' },
      'position': { 'x': 100, 'y': 100 },
    },
  ]
# TODO: Get a dbt provider for the state of the nodes and edges
# TODO: events in the react component should trigger Dash callbacks for the dbt serverside project.
app.layout = html.Div(
    [
        dash_dbt_reactflow.DashDbtReactflow(
            id="dbt-reactflow", 
            nodes=nodes, 
            edges=[], 
        )
    ], 
    style={"height": "100vh"} # https://reactflow.dev/docs/guides/troubleshooting/#the-react-flow-parent-container-needs-a-width-and-a-height-to-render-the-graph
)


# @callback(Output("output", "children"), Input("input", "value"))
# def display_output(value):
#     return "You have entered {}".format(value)


if __name__ == "__main__":
    app.run_server(debug=True)
