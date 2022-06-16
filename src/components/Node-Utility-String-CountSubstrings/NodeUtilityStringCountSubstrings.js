import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, getIncomers, getOutgoers, useReactFlow, useNodes, useEdges } from 'react-flow-renderer';

import "./NodeUtilityStringCountSubstrings.css"

function NodeUtilityStringCountSubstrings({ data, id }) {
  // Utility
  const processValue = ((stringData, substring) => {
      return (stringData.match(new RegExp(substring, "g")) || []).length;
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
  const [componentValue, setComponentValue] = useState(data.value);
  const [hasInput, setHasInput] = useState(false);
  const [componentPreview, setComponentPreview] = useState("")
  const [hasOutput, setHasOutput] = useState(false)
  const [substringValue, setSubstringValue] = useState("");
  const enterPressed = useKeyPress('Enter');
  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();

  // Hooks
  useEffect(() => {
    localUpdate()
  }, [componentValue, hasInput, enterPressed]);

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
    setComponentValue(processValue(data.value, substringValue))
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
  const handleNewOutput = (target) => {
    setConnectedOutputHandleId(target.targetHandle)
    setHasOutput(true)
  }

  const handleTextChange = (event) => {
    setSubstringValue(event.target.value)
  }

  // Styles
  const inputHandleStyle = {
  }
  const outputHandleStyle = {
  }

  return (
    <div className="node--utility--string--countsubstrings">
      <Handle 
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasInput === false}
        style={inputHandleStyle}
      />
      <label className="node--utility--string--countsubstrings--label" htmlFor="text">Count Substrings</label>
      <input id="text" className="node--utility--string--countsubstrings--text" name="text" onChange={handleTextChange}/>
      <div className="node--utility--string--countsubstrings--preview">
        <label className="node--utility--string--countsubstrings--preview--label">Output Preview</label>
        <p className="node--utility--string--countsubstrings--preview--text">{componentPreview}</p>
      </div>      
      <div className="node--utility--string--countsubstrings--category">
        <label className="node--utility--string--countsubstrings--category--label">UTILITY</label>
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

export default NodeUtilityStringCountSubstrings;
