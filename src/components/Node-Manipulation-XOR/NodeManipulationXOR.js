import { useState, useEffect, useInsertionEffect } from 'react';
import { Handle, Position, useKeyPress, useEdges, useNodes, useReactFlow, getOutgoers, getIncomers } from 'react-flow-renderer';

import "./NodeManipulationXOR.css"

function NodeManipulationXOR({ data, id }) {
    // options (skip for now)
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
    const [componentPreview, setComponentPreview] = useState(processValue(componentValue, componentRadioValue))
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
        if(hasoutput){
            updateConnectedNodes(componentValue)
        }
    }, [componentValue])

    // Auto-Updaters
    useEffect(() => {
        const interval = setInterval(() => {
            localUpdate()
        }, 1000);

        return () => cleanInterval(interval);
    }, [])

    const localUpdate = () => {
        updateConnections()
        updateSelf()
        updateConnectNodes(componentValue)
    }

    // Updaters
    function updateSelf(){
        setComponentValue(processValue(data.value, componentRadioValue))
    }

    const updateConnectNodes = (value) => {
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
}

export default NodeManipulationXOR;