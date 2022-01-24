import React from 'react';

export function Form(props) {
    const handleChange = (event) => {
        const input = event.target.value;
        props.onChange(input);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit();
    }

    return (
        <>
            <h1 id="prompt">Enter a Word</h1>

            <form id="form" autoComplete="off" onSubmit={handleSubmit}>
                <input type="text" id="input" onChange={handleChange} placeholder="Type in a word" />

                {/*if the input is not valid, disable the button*/}
                {!props.valid && <h3 id="warn_valid" style={{color: "whitesmoke", fontWeight: "bolder"}}>The word should include only characters or spaces</h3>}
                <button id="submit" type='submit' disabled={!props.valid}>SUBMIT</button> 
            </form>
        </>
    )
}