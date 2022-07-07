import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from "./Node.module.css"


export default function Node({ data, id }) {
  // Data Processing
  const processValue = ((a, b) => {
    switch(componentRadioValue) {
      case "A":
        return [a, b].join('')
      case "B":
        return [b, a].join('')
      default:
        return a;
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
  const [componentPreview, setComponentPreview] = useState(processValue(data.valueA, data.valueB))

  const [hasBothInputs, setHasBothInputs] = useState(false)
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
  }, [enterPressed, hasBothInputs, hasOutput, componentRadioValue])

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
    setComponentValue(processValue(data.valueA, data.valueB))
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
  const handleNewOutput = (target) => {
    setConnectedOutputHandleId(target.targetHandle)
    setHasOutput(true)
  }

  const handleRadioChange = (event) => {
    setComponentRadioValue(event.target.value)
  }

  // Styles
  const inputHandleStyleA = {
    left: 1,
    top: 50,
  }
  const inputHandleStyleB = {
    left: 1,
    top: 100,
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
        isConnectable={hasBothInputs === false}
        style={inputHandleStyleA}
      />
      <Handle 
        id="b"
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasBothInputs === false}
        style={inputHandleStyleB}
      />
      <label className={styles.node_label}>Template</label>
      
      <div className={styles.tooltip}>
        <FontAwesomeIcon className = {styles.node_icon_help} icon="fa-regular fa-circle-question" size="xs"/>
        <span className={styles.tooltiptext}>
          <h3>Template</h3>
          <h4>Category</h4>
          <h5>[Inputs]</h5>
          <p>A (Type: String)</p>
          <i>Input A description.</i>
          <p>B (Type: String)</p>
          <i>Input B description.</i>
          <h5>[Outputs]</h5>
          <p>A (Type: String)</p>
          <i>Output A description.</i>
          <h5>[Comments]</h5>
        </span>
      </div>
      
      <form className={styles.node_form}>
        <div>
          <input id="optionA" className={styles.node_form_radio} name="case-type" type="radio" value="A" onChange={handleRadioChange} defaultChecked/>
          <label className={styles.node_radio_label} htmlFor="optionA">Option A</label>
        </div>
        <div>
          <input id="optionB" className={styles.node_form_radio} name="case-type" type="radio" value="B" onChange={handleRadioChange}/>
          <label className={styles.node_radio_label} htmlFor="optionB">Option B</label>
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
          <label className={styles.node_category_label}>TEMPLATE</label>
        </div>
      </div>
      <Handle 
        id="a" 
        type="source" 
        position={Position.Right} 
        isConnectable={true}
        onConnect={handleNewOutput}
        style = {outputHandleStyle}
      />
    </div>
  );
}
