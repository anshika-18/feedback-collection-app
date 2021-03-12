import React from 'react'


export default({input,label,meta})=>{
    // this is props.input 
    //console.log(input)
    //on blur on  change all in one ...input is used
    console.log(meta);
    return(
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom:'5x'}} />
            <div className="red-text" style={{marginBottom:'20px'}}>
            {meta.touched&&meta.error}
            </div>
        </div>
    )
}