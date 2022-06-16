import { useState, useEffect } from 'react';
import { Handle, Position, useKeyPress, getIncomers, allEdges, useReactFlow, useNodes, useEdges } from 'react-flow-renderer';

import "./NodeOutputDisplayString.css"

function NodeOutputDisplayString({ data, id }) {
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

  return (
    <div className="node--output--displaystring">
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input-string" 
        isConnectable={(hasInput === false)}
      />
      <label className="node--output--displaystring--label"htmlFor="text">Display String</label>
      <input id="text" className="node--output--string--text" name="text" value={componentValue} readOnly/>
      <div className="node--output--string--category">
        <label className="node--output--string--category--label">OUTPUT</label>
      </div>
    </div>
  );
}

export default NodeOutputDisplayString;
