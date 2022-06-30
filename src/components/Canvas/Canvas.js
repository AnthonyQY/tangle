import ReactFlow, {applyNodeChanges, applyEdgeChanges, addEdge, Controls, Background, ReactFlowProvider } from 'react-flow-renderer';
import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { NodeTypes, GetNodeByType } from '../Registry/Registry.js';

import { Menu, Item, Submenu, useContextMenu, theme, animation } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import "./Canvas.css"

export const initialNodes = [

];

const initialEdges = [
  // Nothing here yet.
];

let id = 0

export default function Canvas() {
  // ReactFlow States
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // ReactFlow Handlers
  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  // Node ID Tracker
  const getId = () => {return `${++id}`}

  function handleItemClick({ event, props, data, triggerEvent }){
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: clickLocationX - reactFlowBounds.left,
      y: clickLocationY - reactFlowBounds.top,
    });

    let type = data

    let newNode = GetNodeByType(type, getId(), position)
    
    setNodes((nds) => nds.concat(newNode));
  }

  // Context Menu
  const { show } = useContextMenu();

  const [clickLocationX, setClickLocationX] = useState(0)
  const [clickLocationY, setClickLocationY] = useState(0)

  const [selectedNodeID, setSelectedNodeID] = useState()
  const [selectedMultiNodeID, setSelectedMultiNodeID] = useState()

  const deleteNodeByID = (id) => {
    reactFlowInstance.setNodes(reactFlowInstance.getNodes().filter(function (node) {
      return node.id != id
    }))
  };

  const deleteMultiNodeByID = (ids) => {
    reactFlowInstance.setNodes(reactFlowInstance.getNodes().filter(function (node) {
      return !ids.includes(node.id)
    }))
  };

  function displayContextMenuCanvas(e){
    setClickLocationX(e.clientX)
    setClickLocationY(e.clientY)
    show(e, {
      id: "CONTEXTMENU_CANVAS"
    })
  }

  function displayContextMenuNode(e, node){
    setSelectedNodeID(node.id)
    show(e, {
      id: "CONTEXTMENU_NODE"
    })
  }

  function displayContextMenuSelection(e, nodes){
    setSelectedMultiNodeID(nodes.map(x => x.id))
    show(e, {
      id: "CONTEXTMENU_SELECTION"
    })
  }

  const handleItemDeleteNode = () => {
    deleteNodeByID(selectedNodeID)
  }

  const handleItemDeleteSelection = () => {
    deleteMultiNodeByID(selectedMultiNodeID)
  }

  // Return Component
  return (
    <ReactFlowProvider>
      <Menu id={"CONTEXTMENU_CANVAS"} theme={theme.dark} animation={{enter: animation.scale, exit: false}}>
        
        <Submenu label="Input">
          <Item data="NodeInputString_Type" onClick={handleItemClick}>String</Item>
        </Submenu>

        <Submenu label="Output">
          <Item data="NodeOutputString_Type" onClick={handleItemClick}>Display String</Item>
        </Submenu>

        <Submenu label="Manipulation">
          <Item data="" onClick={handleItemClick}>Change Case</Item>
          <Item data="" onClick={handleItemClick}>Combine</Item>
          <Item data="NodeManipulationReverse_Type" onClick={handleItemClick}>Reverse</Item>
        </Submenu>

        <Submenu label="Cryptography">

          <Submenu label="Cipher">
            <Item data="" onClick={handleItemClick}>ROT-13</Item>
          </Submenu>
          <Submenu label="Encryption">
            
          </Submenu>

          <Submenu label="Encoding">
            <Item data="" onClick={handleItemClick}>Hexadecimal</Item>
            <Item data="" onClick={handleItemClick}>Atbash</Item>
          </Submenu>

          <Submenu label="Hashing">
            <Item data="" onClick={handleItemClick}>SHA-256</Item>
          </Submenu>   

        </Submenu>

        <Submenu label="Utility">
          <Item data="" onClick={handleItemClick}>Count Substrings</Item>
        </Submenu>

        <Submenu label="Miscellaneous">

        </Submenu>
      </Menu>

      <Menu id={"CONTEXTMENU_NODE"} theme={theme.dark} animation={{enter: animation.scale, exit: false}}>
        <Item data="ITEM_DELETE" onClick={handleItemDeleteNode}>Delete Node</Item>
      </Menu>

      <Menu id={"CONTEXTMENU_SELECTION"} theme={theme.dark} animation={{enter: animation.scale, exit: false}}>
        <Item data="ITEM_DELETE" onClick={handleItemDeleteSelection}>Delete Selection</Item>
      </Menu>
      
      <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeContextMenu={displayContextMenuNode}
            onSelectionContextMenu={displayContextMenuSelection}
            onPaneContextMenu={displayContextMenuCanvas}
            nodeTypes={NodeTypes}
            fitView
          > 
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

