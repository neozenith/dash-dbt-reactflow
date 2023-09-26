# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashDbtReactflow(Component):
    """A DashDbtReactflow component.
Dash dbt visual builder using ReactFlow and the ReactFlowProvider.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- background (boolean; default True):
    Whether to show a background.

- backgroundProps (dict; optional):
    The Props of the Background component
    https://reactflow.dev/docs/api/plugin-components/background/.

- controls (boolean; default True):
    Whether to show controls.

- controlsProps (dict; optional):
    The Props of the Controls component
    https://reactflow.dev/docs/api/plugin-components/controls/.

- edges (list of dicts; optional):
    The edges which connect the flow chart.

- minimap (boolean; default True):
    Whether to show a minimap.

- minimapProps (dict; optional):
    The Props of the MiniMap component
    https://reactflow.dev/docs/api/plugin-components/minimap/.

- nodes (list of dicts; optional):
    The nodes which make up the flow chart.

    `nodes` is a list of dicts with keys:

    - data (dict; optional)

        `data` is a dict with keys:

        - label (string; optional)

    - id (string; optional)

    - position (dict; optional)

        `position` is a dict with keys:

        - x (number; optional)

        - y (number; optional)

- style (dict; optional):
    The style of the ReactFlow component."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_dbt_reactflow'
    _type = 'DashDbtReactflow'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, nodes=Component.UNDEFINED, edges=Component.UNDEFINED, background=Component.UNDEFINED, controls=Component.UNDEFINED, minimap=Component.UNDEFINED, backgroundProps=Component.UNDEFINED, controlsProps=Component.UNDEFINED, minimapProps=Component.UNDEFINED, style=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'background', 'backgroundProps', 'controls', 'controlsProps', 'edges', 'minimap', 'minimapProps', 'nodes', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'background', 'backgroundProps', 'controls', 'controlsProps', 'edges', 'minimap', 'minimapProps', 'nodes', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashDbtReactflow, self).__init__(**args)
