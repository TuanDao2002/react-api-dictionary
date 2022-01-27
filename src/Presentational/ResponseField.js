import React, { useEffect, useState } from "react";

export function ResponseField(props) {
    const [scrollable, setScrollable] = useState(null); // check if it can be scrollable
    const [bottom, setBottom] = useState(null);

    /* createRef() or useRef() is not suitable here as useEffect() can re-render many times which affects the state */ 
    
    // after a new response is rendered, set the state "bottom" to false to display the message if the div is overflow
    useEffect(() => {
        setBottom(false);
    }, [props.response]) 

    // get the new ref and check if it is scrollable
    const setElement = (element) => {
        if (!element) return;
        const { clientHeight, scrollHeight } = element;
        setScrollable(clientHeight < scrollHeight);
    }

    const handleScroll = ( e ) => {
        if (!scrollable) return;
        const { clientHeight, scrollHeight, scrollTop } = e.target;

        // the height of div "scroll" + padding (px) (relatively)
        let scrollDivHeight = 30;
        
        // rounding the values and use precision method
        setBottom(Math.round(scrollTop + clientHeight) >= scrollHeight - scrollDivHeight);
    } 

    const renderResponse = () => {
        const response = props.response;

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
        <>
            <div ref={elementRef => setElement(elementRef)} id="responseField" onScroll={handleScroll}> 
                <p id="def">Definition</p>
                {renderResponse()}

                {/* if the responseField is overflow and user has not scrolled to bottom, display this */}
                {scrollable && !bottom && 
                    <div id="scroll">
                        <i className="arrow up"></i>
                        <h3>Scroll to view more</h3>
                    </div>
                }
            </div>
        </>
    )
}