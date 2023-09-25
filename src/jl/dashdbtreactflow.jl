# AUTO GENERATED FILE - DO NOT EDIT

export dashdbtreactflow

"""
    dashdbtreactflow(;kwargs...)

A DashDbtReactflow component.
Dash dbt visual builder using Reactflow
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `background` (Bool; optional): Whether to show a background
- `backgroundProps` (Dict; optional): The Props of the Background component
https://reactflow.dev/docs/api/plugin-components/background/
- `controls` (Bool; optional): Whether to show controls
- `controlsProps` (Dict; optional): The Props of the Controls component
https://reactflow.dev/docs/api/plugin-components/controls/
- `edges` (Array of Dicts; optional): The edges which connect the flow chart
- `minimap` (Bool; optional): Whether to show a minimap
- `minimapProps` (Dict; optional): The Props of the MiniMap component
https://reactflow.dev/docs/api/plugin-components/minimap/
- `nodes` (optional): The nodes which make up the flow chart. nodes has the following type: Array of lists containing elements 'id', 'data', 'position'.
Those elements have the following types:
  - `id` (String; optional)
  - `data` (optional): . data has the following type: lists containing elements 'label'.
Those elements have the following types:
  - `label` (String; optional)
  - `position` (optional): . position has the following type: lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (Real; optional)
  - `y` (Real; optional)s
- `style` (Dict; optional): The style of the ReactFlow component
"""
function dashdbtreactflow(; kwargs...)
        available_props = Symbol[:id, :background, :backgroundProps, :controls, :controlsProps, :edges, :minimap, :minimapProps, :nodes, :style]
        wild_props = Symbol[]
        return Component("dashdbtreactflow", "DashDbtReactflow", "dash_dbt_reactflow", available_props, wild_props; kwargs...)
end

