import React from "react"

import "./Sidebar.css"

export default function Sidebar(){
    const handleSidebarDrag = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move"
    }
    return (
        <div className="sidebar">
            <div className="sidebar--title">
                Nodes
            </div>
            <div 
            className="templateNode inputNode nodeInputString"
            onDragStart={(event) => handleSidebarDrag(event, "NodeInputString_Type")}
            draggable
            >
                String - Input
            </div>
            <div 
            className="templateNode manipulationNode nodeStringChangeCase"
            onDragStart={(event) => handleSidebarDrag(event, "NodeStringChangeCase_Type")}
            draggable
            >
                Change Case - Manipulation
            </div>
            <div 
            className="templateNode manipulationNode nodeStringCombine"
            onDragStart={(event) => handleSidebarDrag(event, "NodeStringCombine_Type")}
            draggable
            >
                Combine Strings - Manipulation
            </div>
            <div 
            className="templateNode cryptographyNode nodeCryptographyCipherROT13"
            onDragStart={(event) => handleSidebarDrag(event, "NodeCryptographyCipherROT13_Type")}
            draggable
            >
                ROT13 - Cipher - Cryptography
            </div>
            <div 
            className="templateNode cryptographyNode nodeCryptographyHashSHA256"
            onDragStart={(event) => handleSidebarDrag(event, "NodeCryptographyHashSHA256_Type")}
            draggable
            >
                SHA256 - Hash - Cryptography
            </div>
            <div 
            className="templateNode outputNode nodeOutputDisplayString"
            onDragStart={(event) => handleSidebarDrag(event, "NodeOutputDisplayString_Type")}
            draggable
            >
                Display String - Output
            </div>
        </div>
    )
}