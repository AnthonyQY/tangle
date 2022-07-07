import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import "./Node.module.css"

function NodeStringCombine({ data, id }) {
  // Utility
  const processValue = ((aData, bData, radioValue) => {
    switch(radioValue) {
      case "AB":
        return aData + bData
      case "BA":
        return bData + aData
      default:
        return aData + bData
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
  const [componentRadioValue, setComponentRadioValue] = useState("AB")
  const [componentPreview, setComponentPreview] = useState("None")
  const [hasBothInputs, setHasBothInputs] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [connectedOutputHandleId, setConnectedOutputHandleId] = useState()
  const enterPressed = useKeyPress('Enter');
  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();

  // Hooks
  useEffect(() => {
    localUpdate()
  }, [enterPressed, hasBothInputs, hasOutput, componentRadioValue])

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
    setComponentValue(processValue(data.valueA, data.valueB, componentRadioValue))
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
    if(getIncomers(reactFlow.getNode(id), allNodes, allEdges).length > 1){
      setHasBothInputs(true)
    }
    else{
      setHasBothInputs(false)
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
  const aInputHandleStyle = {
    top: 35,
    left: 1
  }
  const bInputHandleStyle = {
    top: 90,
    left: 1
  }
  const outputHandleStyle = {
    right: -11.25
  }

  return (
    <div className="node--string--combine">
      <Handle 
        id="a"
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasBothInputs === false}
        style = {aInputHandleStyle}
      />
      <Handle
        id="b" 
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasBothInputs === false}
        style = {bInputHandleStyle}
      />
      <label className="node--string--combine--label">Combine Strings</label>
      <form className="node--string--combine--form">
        <div>
          <input id="abmode" className="node--string--combine--radio" name="combine-type" type="radio" value="AB" onChange={handleRadioChange} defaultChecked/>
          <label className="node--string--combine--radio--label" htmlFor="abmode">A + B</label>
        </div>
        <div>
          <input id="bamode" className="node--string--combine--radio" name="combine-type" type="radio" value="BA" onChange={handleRadioChange}/>
          <label className="node--string--combine--radio--label" htmlFor="bamode">B + A</label>
        </div>
      </form>
      <div className="node--string--combine--preview">
        <label className="node--string--combine--preview--label">Output Preview</label>
        <p className="node--string--combine--preview--text">{componentPreview}</p>
      </div>
      <div className="node--input--combine--category">
        <label className="node--input--combine--category--label">MANIPULATION</label>
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        id="output-string" 
        isConnectable={true}
        onConnect={handleNewOutput}
        style={outputHandleStyle}
      />
    </div>
  );
}

export default NodeStringCombine;
