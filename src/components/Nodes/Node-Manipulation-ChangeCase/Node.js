import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import styles from "./Node.module.css"

export default function NodeManipulationChangeCase({ data, id }) {
  // Data Processing
  const processValue = ((stringData) => {
    switch(componentRadioValue) {
      case "A":
        return stringData.toUpperCase();
      case "B":
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
  const [componentValue, setComponentValue] = useState(data.value)
  const [componentRadioValue, setComponentRadioValue] = useState("A")
  const [componentPreview, setComponentPreview] = useState(processValue(data.value))

  const [hasInput, setHasInput] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [connectedOutputHandleId, setConnectedOutputHandleId] = useState()

  const [autoUpdateInterval, setAutoUpdateInterval] = useState(1000)

  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();
  const enterPressed = useKeyPress('Enter');

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
    setComponentValue(processValue(data.value))
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
  const handleNewOutput = (target) => {
    setConnectedOutputHandleId(target.targetHandle)
    setHasOutput(true)
  }

  const handleRadioChange = (event) => {
    setComponentRadioValue(event.target.value)
  }

  // Styles
  const inputHandleStyle = {
    left: 1,
  }
  const outputHandleStyle = {
    right: 0.65,
  }

  // Return
  return (
    <div className={styles.node}>
      <Handle 
        id="a"
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasInput === false}
        style={inputHandleStyle}
      />
      <label className={styles.node_label}>Change Case</label>
      <form className={styles.node_form}>
        <div>
          <input id="optionA" className={styles.node_form_radio} name="case-type" type="radio" value="A" onChange={handleRadioChange} defaultChecked />
          <label className={styles.node_radio_label} htmlFor="optionA">Uppercase</label>
        </div>
        <div>
          <input id="optionB" className={styles.node_form_radio} name="case-type" type="radio" value="B" onChange={handleRadioChange} />
          <label className={styles.node_radio_label} htmlFor="optionB">Lowercase</label>
        </div>
        <div>
          <input id="nop" className={styles.node_form_radio} name="case-type" type="radio" value="N" onChange={handleRadioChange} />
          <label className={styles.node_radio_label} htmlFor="nop">No Operation</label>
        </div>
      </form>
      <div className={styles.node_preview}>
        <label className={styles.node_preview_label}>Output Preview</label>
        <p className={styles.node_preview_text}>{componentPreview}</p>
      </div>
      <div className="category_wrapper">
        <div className={styles.node_category}>
          <label className={styles.node_category_label}>MANIPULATION</label>
        </div>
      </div>
      <Handle 
        id="output" 
        type="source" 
        position={Position.Right} 
        isConnectable={true}
        onConnect={handleNewOutput}
        style = {outputHandleStyle}
      />
    </div>
  );
}
