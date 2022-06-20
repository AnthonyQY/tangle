import { useState, useEffect, useInsertionEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import "./NodeStringXOR.css"

function NodeStringXOR({ data, id }) {
    // default XOR string
    const xorString = 1001;
    // Options
    const processValue = ((stringData, encryptData, radioValue) => {
        switch(radioValue) {
            case "X":
                return stringData ^ encryptData;
            default:
                return stringData;
        }
    })

    // preview
    const processPreview = (stringData) => {
        if(stringData.length === 0) {
            return "None"
        }
        if(stringData.length > 15) {
            return stringData.substring(0,15) + "..."
        }
        return stringData
    }

    // States
    const [componentValue, setComponentValue] = useState(data.value)
    const [componentRadioValue, setComponentRadioValue] = useState("N")
    const [componentPreview, setComponentPreview] = useState(processValue(componentValue, xorString, componentRadioValue))
    const [hasInput, setHasInput] = useState(false)
    const [hasOutput, setHasOutput] = useState(false)
    const enterPressed = useKeyPress('Enter');
    const allNodes = useNodes()
    const allEdges = useEdges()
    const reactFlow = useReactFlow();

    // Hooks
    useEffect(() => {
        updateConnections()
        updateSelf()
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
        setComponentValue(processValue(data.value, xorString, componentRadioValue))
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
    <div className="node--string--xor">
      <Handle 
        type="target" 
        position={Position.Left} 
        className={"input-string"}
        isConnectable={hasInput === false}
        style={inputHandleStyle}
      />
      
      <label className="node--string--xor--label">Apply XOR</label>
      <form className="node--string--xor--form">
        <div>
          <input id="XOR" className="node--string--xor--radio" name="case-type" type="radio" value="X" onChange={handleRadioChange}/>
          <label className="node--string--xor--radio--label" htmlFor="XOR">XOR</label>
        </div>
        <div>
          <input id="nop" className="node--string--xor--radio" name="case-type" type="radio" value="N" onChange={handleRadioChange} defaultChecked/>
          <label className="node--string--xor--radio--label" htmlFor="nop">No Operation</label>
        </div>
      </form>
      <div className="node--string--xor--preview">
        <label className="node--string--xor--preview--label">Output Preview</label>
        <p className="node--string--xor--preview--text">{componentPreview}</p>
      </div>
      <div className="node--input--xor--category">
        <label className="node--input--xor--category--label">MANIPULATION</label>
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

export default NodeStringXOR;