import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import "reactflow/dist/style.css";

/**
 * Dash dbt visual builder using Reactflow
 */
const DashDbtReactflow = (props) => {
    const {
        id,
        nodes,
        edges,
        background,
        controls,
        minimap,
        backgroundProps,
        controlsProps,
        minimapProps,
        style,
        setProps
    } = props;

    const [currentNodes, setNodes, onNodesChange] = useNodesState(nodes);
    const [currentEdges, setEdges, onEdgesChange] = useEdgesState(edges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
            <ReactFlow
            id={id}
            nodes={currentNodes}
            edges={currentEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onNodeDragStop={onNodeDragStop} // TODO: setProps
            onConnect={onConnect}
            // fitView={true}
            style={style}
            // nodeTypes={nodeTypes}
        >
            {background ? <Background {...backgroundProps}/> : null}
            {controls ? <Controls {...controlsProps}/> : null}
            {minimap ? <MiniMap {...minimapProps}/> : null}
        </ReactFlow>
    )
}

DashDbtReactflow.defaultProps = {
    nodes: [],
    edges: [],
    style: {},
    background: true,
    controls: true,
    minimap: true,
    backgroundProps: {},
    controlsProps: {},
    minimapProps: {}
};

DashDbtReactflow.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The nodes which make up the flow chart
     */
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            data: PropTypes.shape({
                label: PropTypes.string
            }),
            position: PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number
            })
        })
    ),

    /**
     * The edges which connect the flow chart
     */
    edges: PropTypes.arrayOf(
        PropTypes.object
    ),

    /**
     * Whether to show a background
     */
    background: PropTypes.bool,

    /**
     * Whether to show controls
     */
    controls: PropTypes.bool,

    /**
     * Whether to show a minimap
     */
    minimap: PropTypes.bool,

    /**
     * The Props of the Background component
     * https://reactflow.dev/docs/api/plugin-components/background/
     */
    backgroundProps: PropTypes.object,

    /**
     * The Props of the Controls component
     * https://reactflow.dev/docs/api/plugin-components/controls/
     */
    controlsProps: PropTypes.object,

    /**
     * The Props of the MiniMap component
     * https://reactflow.dev/docs/api/plugin-components/minimap/
     */
    minimapProps: PropTypes.object,

    /**
     * The style of the ReactFlow component
     */
    style: PropTypes.object,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

export default DashDbtReactflow;
