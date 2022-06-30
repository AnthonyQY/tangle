import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import styles from "./Node.module.css"

export default function NodeInputString({ data, id }) {
  // States
  const [componentValue, setComponentValue] = useState(data.value)

  const [hasOutput, setHasOutput] = useState(false)
  const [connectedOutputHandleId, setConnectedOutputHandleId] = useState()

  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();
  const enterPressed = useKeyPress('Enter');

  // Hooks
  useEffect(() => {
    localUpdate()
  }, [componentValue, hasOutput, enterPressed])

  // Auto-Updaters
  useEffect(() => {
    const interval = setInterval(() => {
      localUpdate()
    }, 1000);
  
    return () => clearInterval(interval);
  }, [])

  // Updaters
  const localUpdate = () => {
    updateConnections()
    updateConnectedNodes(componentValue)
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
          targetNode.data.valueA = value
          targetNode.data.valueB = value
          break;
      }
    }
  }

  function updateConnections(){
    if(getOutgoers(reactFlow.getNode(id), allNodes, allEdges).length > 0){
      setHasOutput(true)
    }
    else{
      setHasOutput(false)
    }
  }

  // Handlers
  const onChange = ((event) => {
    setComponentValue(event.target.value)
  });

  const handleNewOutput = (target) => {
    setHasOutput(true)
    setConnectedOutputHandleId(target.targetHandle)
  }

  // Styles
  const outputHandleStyle = {
    right: 0.65,
  }

  return (
    <div className={styles.node}>

      <label className={styles.node_label} htmlFor="text">Input String</label>
      <input id="text" className={styles.node_input} name="text" onChange={onChange}/>
      <div className="category_wrapper">
        <div className={styles.node_category}>
          <label className={styles.node_category_label}>INPUT</label>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        id="output-string" 
        onConnect={handleNewOutput}
        style = {outputHandleStyle}
      />
      
    </div>
  );
}
