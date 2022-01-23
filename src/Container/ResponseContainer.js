import React, { useEffect, useState } from 'react';
import { ResponseField } from '../Presentational/ResponseField';

export function ResponseContainer(props) {
    const [response, setResponse] = useState("");

    useEffect(() => {
        if (props.endpoint === "") {
            setResponse("");
            return;
        }
        
        setResponse("Waiting");
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.open('GET', props.endpoint);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    setResponse(xhr.response);
                } else if (status === 404) {
                    setResponse("Not found");
                } else if (status === 500) {
                    setResponse("Server error");
                }
            } 
        };

    }, [props.endpoint])

    
    return <ResponseField response={response}/>
}