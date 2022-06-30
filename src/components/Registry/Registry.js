
/*
  All nodes must be registered below.
  1. Import the node using an import statement.
  2. Add an alias (MyNode_Type) below, under "NodeTypes"
  3. Add an entry in the switch statement of the GetNodeByType method.
*/

import NodeInputString from '../Node-Input-String/NodeInputString.js';
import NodeStringChangeCase from '../Node-String-ChangeCase/NodeStringChangeCase.js';
import NodeOutputDisplayString from '../Node-Output-DisplayString/NodeOutputDisplayString.js';
import NodeStringCombine from '../Node-String-Combine/NodeStringCombine.js';
import NodeStringReverse from '../Node-String-Reverse/NodeStringReverse.js';
import NodeCryptographyCipherROT13 from '../Node-Cryptography-Cipher-ROT13/NodeCryptographyCipherROT13.js';
import NodeCryptographyHashSHA256 from '../Node-Cryptography-Hash-SHA256/NodeCryptographyHashSHA256.js';
import NodeCryptographyEncodingHexadecimal from '../Node-Cryptography-Encoding-Hexadecimal/NodeCryptographyEncodingHexadecimal.js';
import NodeCryptographyEncodingAtbash from '../Node-Cryptography-Encoding-Atbash/NodeCryptographyEncodingAtbash.js';
import NodeUtilityStringCountSubstrings from '../Node-Utility-String-CountSubstrings/NodeUtilityStringCountSubstrings.js';
import NodeMiscellaneousHelp from '../Node-Miscellaneous-Help/NodeMiscellaneousHelp.js';
import NodeMiscellaneousAttributions from '../Node-Miscellaneous-Attributions/NodeMiscellaneousAttributions.js';
import NodeMiscellaneousOtherLinks from '../Node-Miscellaneous-OtherLinks/NodeMiscellaneousOtherLinks.js';
import NodeMiscellaneousLogo from '../Node-Miscellaneous-Logo/NodeMiscellaneousLogo.js';
import Node from '../Node-Template-SingleInput-NoOptions-SingleOutput/Node.js';

export const NodeTypes = { 
  NodeInputString_Type: NodeInputString,
  NodeStringChangeCase_Type: NodeStringChangeCase, 
  NodeOutputDisplayString_Type: NodeOutputDisplayString,
  NodeStringCombine_Type : NodeStringCombine,
  NodeStringReverse_Type : NodeStringReverse,
  NodeCryptographyCipherROT13_Type: NodeCryptographyCipherROT13,
  NodeCryptographyHashSHA256_Type: NodeCryptographyHashSHA256,
  NodeCryptographyEncodingHexadecimal_Type: NodeCryptographyEncodingHexadecimal,
  NodeCryptographyEncodingAtbash_Type: NodeCryptographyEncodingAtbash, 
  NodeUtilityStringCountSubstrings_Type: NodeUtilityStringCountSubstrings,
  NodeMiscellaneousHelp_Type: NodeMiscellaneousHelp,
  NodeMiscellaneousAttributions_Type: NodeMiscellaneousAttributions,
  NodeMiscellaneousOtherLinks_Type: NodeMiscellaneousOtherLinks,
  NodeMiscellaneousLogo_Type: NodeMiscellaneousLogo,
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
            dragHandle: ".node--input--string--category",
            data: { 
              maxInputs: 0,
              value: "" 
            },
          };
          break;
        case "NodeStringChangeCase_Type":
          newNode = {
            id: nodeid,
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
            id: nodeid,
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
            id: nodeid,
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
            id: nodeid,
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
            id: nodeid,
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
            id: nodeid,
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
            id: nodeid,
            type,
            position,
            dragHandle: ".node--cryptography--encoding--hexadecimal--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeCryptographyEncodingAtbash_Type":
          newNode = {
            id: nodeid,
            type,
            position,
            dragHandle: ".node--cryptography--encoding--atbash--category",
            data: { 
              maxInputs: 1,
              value: "" 
            },
          };
          break;
        case "NodeUtilityStringCountSubstrings_Type":
          newNode = {
            id: nodeid,
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
            id: nodeid,
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
            id: nodeid,
            type,
            position,
            data: { 
              maxInputs: 0,
              value: "ERROR" 
            },
          };
          break;
      }
      return newNode;
}