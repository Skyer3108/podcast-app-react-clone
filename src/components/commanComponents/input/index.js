import React from "react";
import './style.css'

function InputComponent({type,state,setState,placeholder,require}){

    return(
        <div>
            
            <input type={type} value={state} onChange={(e)=>setState(e.target.value)} placeholder={placeholder} required={require} className="cutom-input"/>
        </div>
    )
}

export default InputComponent