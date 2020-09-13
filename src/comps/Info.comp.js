import React from 'react'

const InfoComp = (props)=>(
    <React.Fragment>
        <div style={{fontSize:'2em'}}>
            <span>{props.label}</span> -
            <span><strong> {props.value} </strong></span>
        </div>
    </React.Fragment>
)

export default InfoComp