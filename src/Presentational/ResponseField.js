import React, { useEffect, useState } from "react";

export function ResponseField(props) {
    const [scrollable, setScrollable] = useState(null);

    // use createRef() to create new ref after every re-render (after every new word)
    const elementRef = React.createRef();
    // get the element through ref and check if it can be scrollable
    useEffect(() => {
        const node = elementRef.current;
        if (!node) return;
        const { clientHeight, scrollHeight } = node;
        setScrollable(clientHeight < scrollHeight);
    }, [elementRef]) // after a new re-render, elementRef will be changed and calculated to check if it is overflow

    const renderResponse = () => {
        const response = props.response;

        if (response === null) {
            return;
        }

        if (response === "") {
            return <p className='warning'>You have not typed a word</p>;
        }

        if (response === "Waiting") {
            return <h3 style= {{textAlign: "center"}}>Loading...</h3>;
        }

        if (response === "Not found") {
            return(
                <>
                    <p className='warning'>Try again!</p>
                    <p className='warning'>Cannot find the definition for this word</p>
                    <p className='warning'>If the connection is poor, refresh the page and type again</p>
                </>
            ) 
        }

        if (response === "Server error") {
            return(
                <>
                    <p className='warning'>There is internal error in the server</p>
                    <p className='warning'>Refresh the page</p>
                </>
            ) 
        }

        // process and display the response
        let wordDefinitions = [];
        response.forEach((dictionaryObject, index) => {
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

    return (
        // use ref attribute to get the element
        <div ref={elementRef} id="responseField"> 
            <p id="def">Definition</p>
            {renderResponse()}
            {scrollable ? <p className="element">scroll</p> : <p className="element">cannot scroll</p>}
        </div>
    )
}