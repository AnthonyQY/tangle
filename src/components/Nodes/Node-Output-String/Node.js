import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from "./Node.module.css"

export default function NodeOutputString({ data, id }) {
  // States
  const [componentValue, setComponentValue] = useState(data.value);
  const [hasInput, setHasInput] = useState(false);
  const enterPressed = useKeyPress('Enter');
  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();

  // Hooks
  useEffect(() => {
    localUpdate()
  }, [componentValue, hasInput, enterPressed]);

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
    updateSelf()
  }

  function updateSelf(){
    setComponentValue(data.value);
  }

  function updateConnections(){
    if(getIncomers(reactFlow.getNode(id), allNodes, allEdges).length > 0){
      setHasInput(true)
    }
    else{
      setHasInput(false)
    }
  }

  // Styles
  const inputHandleStyle = {
    left: 0.65,
  }

  return (
    <div className={styles.node}>

      <Handle 
        type="target" 
        position={Position.Left} 
        id="input-string" 
        isConnectable={(hasInput === false)}
        style = {inputHandleStyle}
      />

      <label className={styles.node_label} htmlFor="text">Display String</label>

      <div className={styles.tooltip}>
        <FontAwesomeIcon className = {styles.node_icon_help} icon="fa-regular fa-circle-question" size="xs"/>
        <span className={styles.tooltiptext}>
          <h3>Display String</h3>
          <h4>Output</h4>
          <h5>[Inputs]</h5>
          <p>A (Type: String)</p>
          <i>The string to display.</i>
          <h5>[Outputs]</h5>
          <p>None</p>
        </span>
      </div>

      <input id="text" className={styles.node_text} name="text" value={componentValue} readOnly/>
      <div className="category_wrapper">
        <div className={styles.node_category}>
          <label className={styles.node_category_label}>OUTPUT</label>
        </div>
      </div>

    </div>
  );
}