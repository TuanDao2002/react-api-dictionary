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

    const render = (response) => {
        if (response === null) {
            return;
        }

        if (response === "") {
            return <p className='warning'>You have not typed a word</p>;
        }

        if (response === "Waiting") {
            return <h3 className="loading">Loading <i className="fa fa-spinner fa-spin"></i></h3>;
        }

        if (response === "Not found") {
            return(
                <>
                    <p className='warning'>Try again!</p>
                    <p className='warning'>Cannot find the definition for this word</p>
                    <p className='warning'>If due to the poor connection, submit again to refresh</p>
                </>
            ) 
        }

        // process and display the response
        let wordDefinitions = [];
        response.forEach((dictionaryObject, index) => {
            const word = dictionaryObject.word;
            wordDefinitions.push(<h2 className="word" key={index}>{word}</h2>);

            const len = dictionaryObject.meanings.length;
            
            for (let i = 0; i < len; i++){
                const partOfSpeech = dictionaryObject.meanings[i].partOfSpeech;
                wordDefinitions.push(<p className="partOfSpeech" key={`${index} ${i}`}>+ {partOfSpeech}:</p>);

                const definitions = dictionaryObject.meanings[i].definitions;
                let definitionsArray = []
                definitions.forEach((element, index) => {
                    definitionsArray.push(<p className="element" key={`child ${index}`}>{`--> ${element.definition}`}</p>);
                });
                
                wordDefinitions.push(definitionsArray);
            }
        })
            
        return <div id="display">{wordDefinitions}</div>
    }

    
    return <ResponseField result={render(response)}/>
}