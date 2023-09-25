from dash import Dash, Input, Output, callback, html

import dash_dbt_reactflow

app = Dash(
    __name__,
    meta_tags=[
        {"name": "viewport", "content": "width=device-width, initial-scale=1.0"}
    ],
)

app.layout = html.Div(
    [
        dash_dbt_reactflow.DashDbtReactflow(
            id="input", value="my-value", label="my-label"
        ),
        html.Div(id="output"),
    ]
)


@callback(Output("output", "children"), Input("input", "value"))
def display_output(value):
    return "You have entered {}".format(value)


if __name__ == "__main__":
    app.run_server(debug=True)
