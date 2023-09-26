import ELK from 'elkjs/lib/elk.bundled.js';

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel,
  useReactFlow,
} from 'reactflow';
import "reactflow/dist/style.css";

const elk = new ELK();

const useLayoutedElements = () => {
    const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
    const defaultOptions = {
      'elk.algorithm': 'layered',
      'elk.layered.spacing.nodeNodeBetweenLayers': 100,
      'elk.spacing.nodeNode': 80,
    };
  
    const getLayoutedElements = useCallback((options) => {
      const layoutOptions = { ...defaultOptions, ...options };
      const graph = {
        id: 'root',
        layoutOptions: layoutOptions,
        children: getNodes(),
        edges: getEdges(),
      };
  
      elk.layout(graph).then(({ children }) => {
        // By mutating the children in-place we saves ourselves from creating a
        // needless copy of the nodes array.
        children.forEach((node) => {
          node.position = { x: node.x, y: node.y };
        });
  
        setNodes(children);
        window.requestAnimationFrame(() => {
          fitView();
        });
      });
    }, []);
  
    return { getLayoutedElements };
  };
  


/**
 * Dash dbt visual builder base flow using Reactflow
 */
const DashDbtReactflowFlow = (props) => {
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
    // const { fitView } = useReactFlow();
    const { getLayoutedElements } = useLayoutedElements();
  
    const onLayout = useCallback(
      (direction) => {
        const layouted = getLayoutedElements(nodes, edges, { direction });
  
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
  
        window.requestAnimationFrame(() => {
          fitView();
        });
      },
      [nodes, edges]
    );
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
            fitView
            style={style}
            // nodeTypes={nodeTypes}
        >
            {background ? <Background {...backgroundProps}/> : null}
            {controls ? <Controls {...controlsProps}/> : null}
            {minimap ? <MiniMap {...minimapProps}/> : null}
            <Panel position="top-right">
                <button
                onClick={() =>
                    getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' })
                }
                >
                vertical layout
                </button>
                <button
                onClick={() =>
                    getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
                }
                >
                horizontal layout
                </button>
                <button
                onClick={() =>
                    getLayoutedElements({
                    'elk.algorithm': 'org.eclipse.elk.radial',
                    })
                }
                >
                radial layout
                </button>
                <button
                onClick={() =>
                    getLayoutedElements({
                    'elk.algorithm': 'org.eclipse.elk.force',
                    })
                }
                >
                force layout
                </button>
            </Panel>
        </ReactFlow>
    )
}

DashDbtReactflowFlow.defaultProps = {
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

DashDbtReactflowFlow.propTypes = {
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
/**
 * Dash dbt visual builder using ReactFlow and the ReactFlowProvider.
 */
const DashDbtReactflow = (props) => {
    return (
        <ReactFlowProvider>
            <DashDbtReactflowFlow {...props} />
        </ReactFlowProvider>
    )
};

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
