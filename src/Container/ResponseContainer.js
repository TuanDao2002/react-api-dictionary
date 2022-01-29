import React, { useEffect, useState } from 'react';
import { ResponseField } from '../Presentational/ResponseField';
import axios from 'axios';

const url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";

export function ResponseContainer(props) {
    const {word, setError, reload} = props;
    const [response, setResponse] = useState(null);

    useEffect(() => {
        // not display anything when first vist the website
        if (word === null) {
            setResponse(null);
            return;
        }

        if (word === "") {
            setResponse("");
            return;
        }
        
        setResponse("Waiting");

        const endpoint = url + word;

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

    }, [word, reload, setError])

    
    return <ResponseField response={response}/>
}