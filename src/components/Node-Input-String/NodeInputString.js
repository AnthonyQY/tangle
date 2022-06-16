import { useCallback, useState, useEffect } from 'react';
import { getOutgoers, Handle, Position, useEdges, useNodes, useReactFlow, useKeyPress, getConnectedEdges } from 'react-flow-renderer';

import "./NodeInputString.css"

function NodeInputString({ data, id }) {
  // States
  const [componentValue, setComponentValue] = useState(data.value)
  const [hasOutput, setHasOutput] = useState(false)
  const allNodes = useNodes()
  const allEdges = useEdges()
  const reactFlow = useReactFlow();
  const enterPressed = useKeyPress('Enter');
  

  // Hooks
  useEffect(() => {
    localUpdate()
  }, [componentValue, hasOutput, enterPressed])

  useEffect(() => {
    const interval = setInterval(() => {
      localUpdate()
    }, 1000);
  
    return () => clearInterval(interval);
  }, [])

  const localUpdate = () => {
    updateConnections()
    updateConnectedNodes(componentValue)
  }

  // Updaters
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

  return (
    <div className="node--input--string">
      <label className="node--input--string--label" htmlFor="text">Input String</label>
      <input id="text" className="node--input--string--text" name="text" onChange={onChange}/>
      <div className="node--input--string--category">
        <label className="node--input--string--category--label">INPUT</label>
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        id="output-string" 
        onConnect={handleNewOutput}
      />
    </div>
  );
}

export default NodeInputString;
