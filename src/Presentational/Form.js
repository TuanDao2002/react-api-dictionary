import React from 'react';

export function Form(props) {
    const {valid, onSubmit, onChange} = props;
    
    return (
        <>
            <h1 id="prompt">Enter a Word</h1>

            <form id="form" autoComplete="off" onSubmit={onSubmit}>
                <input type="text" id="input" onChange={onChange} placeholder="Type in a word" />

                {/*if the input is not valid, disable the button*/}
                {!valid && <h3 id="warn_valid" style={{color: "whitesmoke", fontWeight: "bolder"}}>The word should include only characters or spaces</h3>}
                <button id="submit" type='submit' disabled={!valid}>SEARCH</button> 
            </form>
        </>
    )
}