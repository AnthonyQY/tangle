import ReactFlow, {applyNodeChanges, applyEdgeChanges, addEdge, Controls, Background, ReactFlowProvider } from 'react-flow-renderer';
import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';

import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
  theme,
  animation,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import NodeInputString from '../Node-Input-String/NodeInputString.js';
import NodeStringChangeCase from '../Node-String-ChangeCase/NodeStringChangeCase.js';
import NodeOutputDisplayString from '../Node-Output-DisplayString/NodeOutputDisplayString.js';
import NodeStringCombine from '../Node-String-Combine/NodeStringCombine.js';
import NodeStringReverse from '../Node-String-Reverse/NodeStringReverse.js';
import NodeCryptographyCipherROT13 from '../Node-Cryptography-Cipher-ROT13/NodeCryptographyCipherROT13.js';
import NodeCryptographyHashSHA256 from '../Node-Cryptography-Hash-SHA256/NodeCryptographyHashSHA256.js';
import NodeCryptographyEncodingHexadecimal from '../Node-Cryptography-Encoding-Hexadecimal/NodeCryptographyEncodingHexadecimal.js';
import NodeUtilityStringCountSubstrings from '../Node-Utility-String-CountSubstrings/NodeUtilityStringCountSubstrings.js';
import NodeMiscellaneousHelp from '../Node-Miscellaneous-Help/NodeMiscellaneousHelp.js';
import NodeMiscellaneousAttributions from '../Node-Miscellaneous-Attributions/NodeMiscellaneousAttributions.js';
import NodeMiscellaneousOtherLinks from '../Node-Miscellaneous-OtherLinks/NodeMiscellaneousOtherLinks.js';
import NodeMiscellaneousLogo from '../Node-Miscellaneous-Logo/NodeMiscellaneousLogo.js';
import Node from '../Node-Template-SingleInput-NoOptions-SingleOutput/Node.js';

import "./Canvas.css"

const nodeTypes = { 
  NodeInputString_Type: NodeInputString,
  NodeStringChangeCase_Type: NodeStringChangeCase, 
  NodeOutputDisplayString_Type: NodeOutputDisplayString,
  NodeStringCombine_Type : NodeStringCombine,
  NodeStringReverse_Type : NodeStringReverse,
  NodeCryptographyCipherROT13_Type: NodeCryptographyCipherROT13,
  NodeCryptographyHashSHA256_Type: NodeCryptographyHashSHA256,
  NodeCryptographyEncodingHexadecimal_Type: NodeCryptographyEncodingHexadecimal,
  NodeUtilityStringCountSubstrings_Type: NodeUtilityStringCountSubstrings,
  NodeMiscellaneousHelp_Type: NodeMiscellaneousHelp,
  NodeMiscellaneousAttributions_Type: NodeMiscellaneousAttributions,
  NodeMiscellaneousOtherLinks_Type: NodeMiscellaneousOtherLinks,
  NodeMiscellaneousLogo_Type: NodeMiscellaneousLogo,
  Node_Type: Node,
};

export const initialNodes = [
  {
    id: '-1',
    type: 'NodeMiscellaneousHelp_Type',
    dragHandle: ".node--miscellaneous--help--category",
    data: { 
      maxInputs: 0,
      value: '',
    },
    position: { x: 25, y: 25 },
  },
  {
    id: '-2',
    type: 'NodeMiscellaneousAttributions_Type',
    dragHandle: ".node--miscellaneous--attributions--category",
    data: { 
      maxInputs: 0,
      value: '',
    },
    position: { x: 25, y: 325 },
  },
  {
    id: '-3',
    type: 'NodeMiscellaneousOtherLinks_Type',
    dragHandle: ".node--miscellaneous--otherlinks--category",
    data: { 
      maxInputs: 0,
      value: '',
    },
    position: { x: 260, y: 325 },
  },
  {
    id: '-4',
    type: 'NodeMiscellaneousLogo_Type',
    dragHandle: ".node--miscellaneous--logo--category",
    data: { 
      maxInputs: 0,
      value: '',
    },
    position: { x: 385, y: 325 },
  },
  {
    id: '-5',
    type: 'Node_Type',
    dragHandle: ".node--category",
    data: { 
      maxInputs: 1,
      value: '',
    },
    position: { x: 800, y: 325 },
  }
];

const initialEdges = [
];

let id = 0

export default function Canvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  let MENU_ID = "CONTEXTMENU_CANVAS"

  const getId = () => {return `${++id}`}

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let newNode;
      switch (type) {
        case "NodeInputString_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--input--string--category",
            data: { 
              maxInputs: 0,
              value: "" 
            },
          };
          break;
        case "NodeStringChangeCase_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--input--changecase--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeStringCombine_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--input--combine--category",
            data: { 
              maxInputs: 2,
              valueA: '',
              valueB: '',
            },
          };
          break;
        case "NodeStringReverse_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--input--reverse--category",
            data: { 
              maxInputs: 1,
              value: '',
            },
          };
          break;
        case "NodeCryptographyCipherROT13_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--cryptography--cipher--rot13--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeCryptographyHashSHA256_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--cryptography--hash--sha256--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeOutputDisplayString_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--output--string--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeCryptographyEncodingHexadecimal_Type":
          newNode = {
            id: getId(),
            type,
            position,
            dragHandle: ".node--cryptography--encoding--hexadecimal--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        default:
          newNode = {
            id: getId(),
            type,
            position,
            data: { 
              maxInputs: 0,
              value: "ERROR" 
            },
          };
          break;
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  function handleItemClick({ event, props, data, triggerEvent }){
    let type = data

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: clickLocationX - reactFlowBounds.left,
      y: clickLocationY - reactFlowBounds.top,
    });

    let newNode;
    switch (type) {
      case "NodeInputString_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--input--string--category",
          data: { 
            maxInputs: 0,
            value: "" 
          },
        };
        break;
      case "NodeStringChangeCase_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--input--changecase--category",
          data: { 
            maxInputs: 1,
            value: "" 
          },
        };
        break;
      case "NodeStringCombine_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--input--combine--category",
          data: { 
            maxInputs: 2,
            valueA: '',
            valueB: '',
          },
        };
        break;
      case "NodeStringReverse_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--input--reverse--category",
          data: { 
            maxInputs: 1,
            value: '',
          },
        };
        break;
      case "NodeCryptographyCipherROT13_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--cryptography--cipher--rot13--category",
          data: { 
            maxInputs: 1,
            value: "" 
          },
        };
        break;
      case "NodeCryptographyHashSHA256_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--cryptography--hash--sha256--category",
          data: { 
            maxInputs: 1,
            value: "" 
          },
        };
        break;
      case "NodeOutputDisplayString_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--output--string--category",
          data: { 
            maxInputs: 1,
            value: "" 
          },
        };
        break;
      case "NodeCryptographyEncodingHexadecimal_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--cryptography--encoding--hexadecimal--category",
          data: { 
            maxInputs: 1,
            value: "" 
          },
        };
        break;
      case "NodeUtilityStringCountSubstrings_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--utility--string--countsubstrings--category",
          data: { 
            maxInputs: 1,
            value: "" 
          },
        };
        break;
      case "NodeMiscellaneousHelp_Type":
        newNode = {
          id: getId(),
          type,
          position,
          dragHandle: ".node--miscellaneous--help--category",
          data: { 
            maxInputs: 0,
            value: "" 
          },
        };
        break;  
      default:
        newNode = {
          id: getId(),
          type,
          position,
          data: { 
            maxInputs: 0,
            value: "ERROR" 
          },
        };
        break;
    }
    setNodes((nds) => nds.concat(newNode));
  }

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

  return (
    <ReactFlowProvider>
      <Menu id={"CONTEXTMENU_CANVAS"} theme={theme.dark} animation={{enter: animation.scale, exit: false}}>
        <Submenu label="Input">
          <Item data="NodeInputString_Type" onClick={handleItemClick}>String</Item>
        </Submenu>
        <Submenu label="Output">
          <Item data="NodeOutputDisplayString_Type" onClick={handleItemClick}>Display String</Item>
        </Submenu>
        <Submenu label="Manipulation">
          <Item data="NodeStringChangeCase_Type" onClick={handleItemClick}>Change Case</Item>
          <Item data="NodeStringCombine_Type" onClick={handleItemClick}>Combine</Item>
          <Item data="NodeStringReverse_Type" onClick={handleItemClick}>Reverse</Item>
        </Submenu>
        <Submenu label="Cryptography">
          <Submenu label="Cipher">
            <Item data="NodeCryptographyCipherROT13_Type" onClick={handleItemClick}>ROT-13</Item>
          </Submenu>
          <Submenu label="Encryption">
            
          </Submenu>
          <Submenu label="Encoding">
          <Item data="NodeCryptographyEncodingHexadecimal_Type" onClick={handleItemClick}>Hexadecimal</Item>
          </Submenu>
          <Submenu label="Hashing">
            <Item data="NodeCryptographyHashSHA256_Type" onClick={handleItemClick}>SHA-256</Item>
          </Submenu>   
        </Submenu>
        <Submenu label="Utility">
          <Item data="NodeUtilityStringCountSubstrings_Type" onClick={handleItemClick}>Count Substrings</Item>
        </Submenu>
        <Submenu label="Miscellaneous">
          <Item data="NodeMiscellaneousHelp_Type" onClick={handleItemClick}>Help</Item>
          <Item data="NodeMiscellaneousAttributions_Type" onClick={handleItemClick}>Attributions</Item>
          <Item data="NodeMiscellaneousOtherLinks_Type" onClick={handleItemClick}>Other Links</Item>
          <Item data="NodeMiscellaneousLogo_Type" onClick={handleItemClick}>Logo</Item>
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
            onDrop={onDrop}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onNodeContextMenu={displayContextMenuNode}
            onSelectionContextMenu={displayContextMenuSelection}
            onPaneContextMenu={displayContextMenuCanvas}
            nodeTypes={nodeTypes}
            fitView
          > 
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

