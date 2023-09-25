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


const nodes = [
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 },
      type: 'input',
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 },
    },
  ];

/**
 * Dash dbt visual builder using Reactflow
 */
const DashDbtReactflow = (props) => {
    const {id, label, setProps, value} = props;

    return (
        <div id={id}>
            ExampleComponent: {label}&nbsp;
            <input
                value={value}
                onChange={
                    /*
                        * Send the new value to the parent component.
                        * setProps is a prop that is automatically supplied
                        * by dash's front-end ("dash-renderer").
                        * In a Dash app, this will update the component's
                        * props and send the data back to the Python Dash
                        * app server if a callback uses the modified prop as
                        * Input or State.
                        */
                    e => setProps({ value: e.target.value })
                }
            />
            <hr />
            {/* https://reactflow.dev/docs/guides/troubleshooting/#the-react-flow-parent-container-needs-a-width-and-a-height-to-render-the-graph */}
            <div id={id + '-react-flow'} style={{height: '100vh'}} >
                <ReactFlow nodes={nodes} >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
            <hr />
        </div>
    );
}

DashDbtReactflow.defaultProps = {};

DashDbtReactflow.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

export default DashDbtReactflow;
