import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';
import "./NodeCryptographyEncodingAtbash.css"

export default function NodeCryptographyEncodingAtbash({ data, id }) {
  // Data Processing
  const processValue = ((stringData, radioValue) => {
    switch(radioValue) {
      case "E":
        var arr = [];
        for (var i=0;i<stringData.length; i++){
          const ascii = stringData.charCodeAt(i);
          const cond1 = (ascii>65 && ascii<90)
          const cond2 = (ascii>97 && ascii<122)
          arr[i] = String.fromCharCode((cond1 ? 90-ascii+65 : (cond2 ? 122-ascii+97 : ascii)));
        }
        return stringData.split('').reverse().join('');
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
  const [componentPreview, setComponentPreview] = useState(processValue(data.value))
  const [componentRadioValue, setComponentRadioValue] = useState("E")
  const [hasInput, setHasInput] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [connectedOutputHandleId, setConnectedOutputHandleId] = useState()

  const [autoUpdateInterval, setAutoUpdateInterval] = useState(1000)

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

  // Auto-Updater
  useEffect(() => {
    const interval = setInterval(() => {
      localUpdate()
    }, autoUpdateInterval);
  
    return () => clearInterval(interval);
  }, [])

  const localUpdate = () => {
    updateConnections()
    updateSelf()
    updateConnectedNodes(componentValue)
  }  

  // Updaters
  const updateSelf = () => {
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

  const updateConnections = () => {
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
    <div className="node--cryptography--encoding--atbash">
      <Handle 
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasInput === false}
        style={inputHandleStyle}
      />
      
      <label className="node--cryptography--encoding--atbash--label">Atbash</label>
      <form className="node--cryptography--encoding--atbash--form">
        <div>
          <input id="encode" className="node--cryptography--encoding--atbash--radio" name="op-type" type="radio" value="E" onChange={handleRadioChange} defaultChecked/>
          <label className="node--cryptography--encoding--atbash--radio--label" htmlFor="encode">Encode/Decode</label>
        </div>
        <div>
          <input id="nop" className="node--cryptography--encoding--atbash--radio" name="op-type" type="radio" value="N" onChange={handleRadioChange}/>
          <label className="node--cryptography--encoding--atbash--radio--label" htmlFor="nop">No Operation</label>
        </div>
      </form>
      <div className="node--cryptography--encoding--atbash--preview">
        <label className="node--cryptography--encoding--atbash--preview--label">Output Preview</label>
        <p className="node--cryptography--encoding--atbash--preview--text">{componentPreview}</p>
      </div>
      <div className="node--cryptography--encoding--atbash--category">
        <label className="node--cryptography--encoding--atbash--category--label">CRYPTOGRAPHY</label>
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
