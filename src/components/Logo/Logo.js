import React from "react"
import LogoImage from "./Logo.png"

import "./Logo.css"

export default function Logo(){
    return (
        <div className="logo">
            <img className="logo--image" src={LogoImage} alt="Logo"></img>
        </div>
    )
}