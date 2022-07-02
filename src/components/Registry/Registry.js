/*
  All nodes must be registered below.
  1. Import the node using an import statement.
  2. Add an alias (MyNode_Type) below, under "NodeTypes"
  3. Add an entry in the switch statement of the GetNodeByType method.
*/

import NodeInputString from '../Nodes/Node-Input-String/Node.js';
import NodeOutputString from "../Nodes/Node-Output-String/Node.js";

import NodeManipulationReverse from "../Nodes/Node-Manipulation-Reverse/Node.js";
import NodeManipulationCombine from "../Nodes/Node-Manipulation-Combine/Node.js"
import NodeManipulationChangeCase from '../Nodes/Node-Manipulation-ChangeCase/Node.js';

import NodeCryptographyCipherAtbash from '../Nodes/Node-Cryptography-Cipher-Atbash/Node.js';
import NodeCryptographyCipherROT13 from '../Nodes/Node-Cryptography-Cipher-ROT13/Node.js';

import NodeCryptographyEncodingBase64 from "../Nodes/Node-Cryptography-Encoding-Base64/Node.js"
import NodeCryptographyEncodingHexadecimal from '../Nodes/Node-Cryptography-Encoding-Hexadecimal/Node.js';

import NodeCryptographyHashingMD5 from '../Nodes/Node-Cryptography-Hashing-MD5/Node.js';
import NodeCryptographyHashingRIPEMD160 from '../Nodes/Node-Cryptography-Hashing-RIPEMD160/Node.js';
import NodeCryptographyHashingSHA1 from '../Nodes/Node-Cryptography-Hashing-SHA1/Node.js';
import NodeCryptographyHashingSHA256 from '../Nodes/Node-Cryptography-Hashing-SHA256/Node.js';
import NodeCryptographyHashingSHA512 from '../Nodes/Node-Cryptography-Hashing-SHA512/Node.js';

import NodeUtilityCountSubstrings from '../Nodes/Node-Utility-CountSubstrings/Node.js'

import Node from '../Nodes/Templates/Node-Template-DoubleInput-TripleRadio-SingleOutput/Node.js'

export const NodeTypes = { 
  NodeInputString_Type: NodeInputString,
  NodeOutputString_Type: NodeOutputString,

  NodeManipulationReverse_Type: NodeManipulationReverse,
  NodeManipulationCombine_Type: NodeManipulationCombine,
  NodeManipulationChangeCase_Type: NodeManipulationChangeCase,

  NodeCryptographyCipherAtbash_Type: NodeCryptographyCipherAtbash,
  NodeCryptographyCipherROT13_Type: NodeCryptographyCipherROT13,

  NodeCryptographyEncodingBase64_Type: NodeCryptographyEncodingBase64,
  NodeCryptographyEncodingHexadecimal_Type: NodeCryptographyEncodingHexadecimal,

  NodeCryptographyHashingMD5_Type: NodeCryptographyHashingMD5,
  NodeCryptographyHashingRIPEMD160_Type: NodeCryptographyHashingRIPEMD160,
  NodeCryptographyHashingSHA1_Type: NodeCryptographyHashingSHA1,
  NodeCryptographyHashingSHA256_Type: NodeCryptographyHashingSHA256,
  NodeCryptographyHashingSHA512_Type: NodeCryptographyHashingSHA512,

  NodeUtilityCountSubstrings_Type: NodeUtilityCountSubstrings,

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
        case "NodeManipulationCombine_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".category_wrapper",
            data: { 
              maxInputs: 2,
              value: "" 
            },
          };
          break;
        case "NodeManipulationChangeCase_Type":
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
        case "NodeCryptographyCipherAtbash_Type":
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
        case "NodeCryptographyCipherROT13_Type":
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
        case "NodeCryptographyEncodingBase64_Type":
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
        case "NodeCryptographyEncodingHexadecimal_Type":
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
        case "NodeCryptographyHashingMD5_Type":
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
        case "NodeCryptographyHashingRIPEMD160_Type":
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
        case "NodeCryptographyHashingSHA1_Type":
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
        case "NodeCryptographyHashingSHA256_Type":
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
        case "NodeCryptographyHashingSHA512_Type":
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
        case "NodeUtilityCountSubstrings_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".category_wrapper",
            data: { 
              maxInputs: 2,
              value: "",
              valueA: "", 
              valueB: ""
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
              maxInputs: 2,
              value: "",
              valueA: "", 
              valueB: ""
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