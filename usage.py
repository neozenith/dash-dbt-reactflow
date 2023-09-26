from dash import Dash, Input, Output, callback, html
import dash_dbt_reactflow
import flask
from dash_dbt_reactflow.dbt.runner import DbtManager, DbtProject
import dash_ace
from pathlib import Path

def node_renderer(node):
    print(node)
    return node


server = flask.Flask(__name__)
app = Dash(__name__, 
            server=server,  
            routes_pathname_prefix='/ui/',
            meta_tags=[{"name": "viewport", "content": "width=device-width, initial-scale=1.0"}]
    )

project_manager = DbtManager() # Manage multiple dbt projects if need be.
project = project_manager.projects['jaffle_shop']

nodes, edges = project.reactflow_parse_graph(width=1024, height=768)
nodes = [node_renderer(node) for node in nodes]

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



############################# DASH CALLBACKS #############################
# TODO: DashDbtReactflow should call setProps so that callbacks get triggered.
# @callback(Output("output", "children"), Input("input", "value"))
# def display_output(value):
#     return "You have entered {}".format(value)


############################# FLASK ROUTES #############################
@server.route("/dbt/projects/", methods=['GET'])
def dbt_projects():
    """Get list of available dbt projects."""
    return flask.jsonify(list(project_manager.projects.keys()))


@server.route("/dbt/d/<project>/<path:name>")
def serve_static_site_docs(project, name):
    return flask.send_from_directory(
        Path(project_manager.projects[project]._project_root) / "target", name
    )

@server.route("/dbt/<project>/<command>/", methods=['GET'])
def dbt_project_command(project, command):
    """Run dbt commands against a target project."""
    dbt_project = project_manager.projects[project]
    result = dbt_project.run(command)
    return flask.jsonify(result)
    

if __name__ == "__main__":
    app.run_server(debug=True)
