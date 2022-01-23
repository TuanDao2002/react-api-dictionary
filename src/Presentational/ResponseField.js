import React from "react";

export function ResponseField(props) {
    const renderResponse = () => {
        const response = props.response;

        if (response === null) {
            return;
        }

        if (response === "") {
            return <p id='warning'>You have not typed a word</p>;
        }

        if (response === "Waiting") {
            return <h3 style= {{textAlign: "center"}}>Loading...</h3>;
        }

        if (response === "Not found") {
            return(
                <>
                    <p id='warning'>Try again!</p>
                    <p id='warning'>There is no definition for this word</p>
                </>
            ) 
        }

        let wordDefinitions = [];
        response.forEach((dictionaryObject, index) => {
            const len = dictionaryObject.meanings.length;
            
            for (let i = 0; i < len; i++){
                const partOfSpeech = dictionaryObject.meanings[i].partOfSpeech;
                wordDefinitions.push(<p id="partOfSpeech" key={`${index} ${i}`}>+ {partOfSpeech}:</p>);

                const definitions = dictionaryObject.meanings[i].definitions;
                let definitionsArray = []
                definitions.forEach((element, index) => {
                    definitionsArray.push(<p id="element" key={`child ${index}`}>{`--> ${element.definition}`}</p>);
                });
                
                wordDefinitions.push(definitionsArray);
            }
        })
            
        return <div id="display">{wordDefinitions}</div>

    }

    return (
        <div id="responseField">
            <p id="def">Definition </p>
            {renderResponse()}
        </div>
    )
}