import React, { useState } from "react";

export function ResponseField(props) {
    const [scrollable, setScrollable] = useState(null);

    // choose the element that can be overflow and set scrollable state
    const setElement = (element) => {
        if (!element) return;
        const { clientHeight, scrollHeight } = element;
        setScrollable(clientHeight < scrollHeight);
    }

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
                    <p id='warning'>If the connection is poor, refresh the page and type again</p>
                </>
            ) 
        }

        if (response === "Server error") {
            return(
                <>
                    <p id='warning'>There is internal error in the server</p>
                    <p id='warning'>Refresh the page</p>
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
        // use ref attribute to get the element
        <div ref={element => setElement(element)} id="responseField"> 
            <p id="def">Definition</p>
            {renderResponse()}
            {scrollable ? <p id="element">scroll</p> : <p id="element">cannot scroll</p>}
        </div>
    )
}