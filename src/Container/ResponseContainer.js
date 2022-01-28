import React, { useEffect, useState } from 'react';
import { ResponseField } from '../Presentational/ResponseField';
import axios from 'axios';

export function ResponseContainer(props) {
    const {endpoint, setError, reload} = props;
    const [response, setResponse] = useState(null);

    useEffect(() => {
        // not display anything when first vist the website
        if (endpoint === null) {
            setResponse(null);
            return;
        }

        if (endpoint === "") {
            setResponse("");
            return;
        }
        
        setResponse("Waiting");

        axios.get(endpoint)
            .then(response => {
                setResponse(response.data);
                setError(false)
            })

            .catch(err => {
                if(!err.response) return;
                const {status} = err.response;
                if (status === 404) {
                    setResponse("Not found");
                    setError(true);
                }
            })

    }, [endpoint, reload, setError])

    
    return <ResponseField response={response}/>
}