import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import "./NodeCryptographyEncodingHexadecimal.css"

function NodeCryptographyEncodingHexadecimal({ data, id }) {
  // Utility
  const processValue = ((stringData, radioValue) => {
    switch(radioValue) {
      case "E":
        var arr = [];
        for (var i = 0; i < stringData.length; i++) {
               arr[i] = (stringData.charCodeAt(i).toString(16)).slice(-4);
        }
        return arr.join("");
      case "D":
          var decodedString = '';     
          for (var i = 0; i < stringData.length; i += 2){
            decodedString += String.fromCharCode(parseInt(stringData.substr(i, 2), 16)); 
          }         
          return decodedString;
      default:
        return stringData;
    }
  })

  const processPreview = (stringData) => {
    if(stringData.length === 0) {
      return "None"
    }
    if(stringData.length > 15) {
      return stringData.substring(0, 15) + "..."
    }
    return stringData
  }

  // States
  const [componentValue, setComponentValue] = useState(data.value)
  const [componentRadioValue, setComponentRadioValue] = useState("E")
  const [componentPreview, setComponentPreview] = useState(processValue(componentValue, componentRadioValue))
  const [hasInput, setHasInput] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const enterPressed = useKeyPress('Enter');
  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();


  // Hooks
  useEffect(() => {
    localUpdate()
  }, [enterPressed, hasInput, hasOutput, componentRadioValue])

  useEffect(() => {
    setComponentPreview(processPreview(componentValue))
    if(hasOutput){
      updateConnectedNodes(componentValue)
    }
  }, [componentValue])

  // Auto-Updaters
  useEffect(() => {
    const interval = setInterval(() => {
      localUpdate()
    }, 1000);
  
    return () => clearInterval(interval);
  }, [])

  const localUpdate = () => {
    updateConnections()
    updateSelf()
    updateConnectedNodes(componentValue)
  }  

  // Updaters
  function updateSelf(){
    setComponentValue(processValue(data.value, componentRadioValue))
  }

  const updateConnectedNodes = (value) => {
    let targetNodes = getOutgoers(reactFlow.getNode(id), allNodes, allEdges)
    targetNodes.forEach(node =>
      executeTargetNodeUpdate(node, value)
    )
  }

  const [connectedOutputHandleId, setConnectedOutputHandleId] = useState()
  const executeTargetNodeUpdate = (targetNode, value) => {
    if(targetNode.data.maxInputs === 1){
      targetNode.data.value = value
    } else if(targetNode.data.maxInputs === 2){
      switch (connectedOutputHandleId) {
        case "a":
          targetNode.data.valueA = value
          break;
        case "b":
          targetNode.data.valueB = value
          break;
        default:
          console.log("Error")
          break;
      }
    }
  }

  function updateConnections(){
    if(getIncomers(reactFlow.getNode(id), allNodes, allEdges).length > 0){
      setHasInput(true)
    }
    else{
      setHasInput(false)
    }
    if(getOutgoers(reactFlow.getNode(id), allNodes, allEdges).length > 0){
      setHasOutput(true)
    }
    else{
      setHasOutput(false)
    }
  }

  // Handlers
  const handleRadioChange = (event) => {
    setComponentRadioValue(event.target.value)
  }

  const handleNewOutput = (target) => {
    setConnectedOutputHandleId(target.targetHandle)
    setHasOutput(true)
  }

  // Styles
  const inputHandleStyle = {
    left: 1,
  }
  const outputHandleStyle = {
    right: -11.25,
  }


  return (
    <div className="node--cryptography--encoding--hexadecimal">
      <Handle 
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasInput === false}
        style={inputHandleStyle}
      />
      
      <label className="node--cryptography--encoding--hexadecimal--label">Hexadecimal</label>
      <form className="node--cryptography--encoding--hexadecimal--form">
        <div>
          <input id="encode" className="node--cryptography--encoding--hexadecimal--radio" name="op-type" type="radio" value="E" onChange={handleRadioChange} defaultChecked/>
          <label className="node--cryptography--encoding--hexadecimal--radio--label" htmlFor="encode">Encode</label>
        </div>
        <div>
          <input id="decode" className="node--cryptography--encoding--hexadecimal--radio" name="op-type" type="radio" value="D" onChange={handleRadioChange}/>
          <label className="node--cryptography--encoding--hexadecimal--radio--label" htmlFor="decode">Decode</label>
        </div>
        <div>
          <input id="nop" className="node--cryptography--encoding--hexadecimal--radio" name="op-type" type="radio" value="N" onChange={handleRadioChange}/>
          <label className="node--cryptography--encoding--hexadecimal--radio--label" htmlFor="nop">No Operation</label>
        </div>
      </form>
      <div className="node--cryptography--encoding--hexadecimal--preview">
        <label className="node--cryptography--encoding--hexadecimal--preview--label">Output Preview</label>
        <p className="node--cryptography--encoding--hexadecimal--preview--text">{componentPreview}</p>
      </div>
      <div className="node--cryptography--encoding--hexadecimal--category">
        <label className="node--cryptography--encoding--hexadecimal--category--label">CRYPTOGRAPHY</label>
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        id="output-string" 
        isConnectable={true}
        onConnect={handleNewOutput}
        style = {outputHandleStyle}
      />
    </div>
  );
}

export default NodeCryptographyEncodingHexadecimal;
