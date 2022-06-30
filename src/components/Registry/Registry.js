/*
  All nodes must be registered below.
  1. Import the node using an import statement.
  2. Add an alias (MyNode_Type) below, under "NodeTypes"
  3. Add an entry in the switch statement of the GetNodeByType method.
*/

import NodeInputString from '../Nodes/Node-Input-String/Node.js';
import NodeOutputString from "../Nodes/Node-Output-String/Node.js"
import Node from "../Nodes/Templates/Node-Template-SingleInput-TripleRadio-SingleOutput/Node.js"
import NodeManipulationReverse from "../Nodes/Node-Manipulation-Reverse/Node.js"

export const NodeTypes = { 
  NodeInputString_Type: NodeInputString,
  NodeOutputString_Type: NodeOutputString,
  NodeManipulationReverse_Type: NodeManipulationReverse,
  Node_Type: Node,
};

export function GetNodeByType(type, nodeid, position){
    let newNode;
    switch (type) {
        case "NodeInputString_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".category_wrapper",
            data: { 
              maxInputs: 0,
              value: "" 
            },
          };
          break;
        case "NodeOutputString_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".category_wrapper",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeManipulationReverse_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".category_wrapper",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "Node_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".category_wrapper",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        default:
          newNode = {
            id: nodeid,
            type,
            position,
            data: { 
              maxInputs: 0,
              value: "UNREGISTERED" 
            },
          };
          break;
      }
      return newNode;
}