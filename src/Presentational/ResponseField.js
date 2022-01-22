import React from "react";

export function ResponseField(props) {
    if (props.response) {
        console.log(props.response);
    }
    return (
        <div id="responseField">
            <p id="def">Definition {props.response}</p>
            {/* {props.isLoading && <h3 style='text-align: center'>Loading...</h3>} */}
            {/* {props.response && console.log(props.response)} */}
        </div>
    )
}