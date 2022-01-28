import React, { useEffect, useState } from 'react';
import { ResponseField } from '../Presentational/ResponseField';

export function ResponseContainer(props) {
    const {endpoint, setError, reload} = props;
    const [response, setResponse] = useState("");

    useEffect(() => {
        if (endpoint === "") {
            setResponse("");
            return;
        }
        
        setResponse("Waiting");
        
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.open('GET', endpoint);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    setResponse(xhr.response);
                    setError(false);
                } else if (status === 404) {
                    setResponse("Not found");
                    setError(true);
                }
            } 
        };

    }, [endpoint, reload, setError])

    
    return <ResponseField response={response}/>
}