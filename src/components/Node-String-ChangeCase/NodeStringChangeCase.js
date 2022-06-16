import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import "./NodeStringChangeCase.css"

function NodeStringChangeCase({ data, id }) {
  // Utility
  const processValue = ((stringData, radioValue) => {
    switch(radioValue) {
      case "U":
        return stringData.toUpperCase();
      case "L":
        return stringData.toLowerCase();
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
  const [componentValue, setComponentValue] = useState("None")
  const [componentRadioValue, setComponentRadioValue] = useState("U")
  const [componentPreview, setComponentPreview] = useState("None")
  const [hasInput, setHasInput] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [connectedOutputHandleId, setConnectedOutputHandleId] = useState()
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
    <div className="node--string--changecase">
      <Handle 
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasInput === false}
        style={inputHandleStyle}
      />
      
      <label className="node--string--changecase--label">Change Case</label>
      <form className="node--string--changecase--form">
        <div>
          <input id="uppercase" className="node--string--changecase--radio" name="case-type" type="radio" value="U" onChange={handleRadioChange} defaultChecked/>
          <label className="node--string--changecase--radio--label" htmlFor="uppercase">Uppercase</label>
        </div>
        <div>
          <input id="lowercase" className="node--string--changecase--radio" name="case-type" type="radio" value="L" onChange={handleRadioChange}/>
          <label className="node--string--changecase--radio--label" htmlFor="lowercase">Lowercase</label>
        </div>
        <div>
          <input id="nop" className="node--string--changecase--radio" name="case-type" type="radio" value="N" onChange={handleRadioChange} />
          <label className="node--string--changecase--radio--label" htmlFor="nop">No Operation</label>
        </div>
      </form>
      <div className="node--string--changecase--preview">
        <label className="node--string--changecase--preview--label">Output Preview</label>
        <p className="node--string--changecase--preview--text">{componentPreview}</p>
      </div>
      <div className="node--input--changecase--category">
        <label className="node--input--changecase--category--label">MANIPULATION</label>
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

export default NodeStringChangeCase;
