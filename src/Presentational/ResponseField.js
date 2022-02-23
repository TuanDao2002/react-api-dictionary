import React, { useEffect, useState } from "react";

export function ResponseField(props) {
    const {result} = props;

    const [scrollable, setScrollable] = useState(null); // check if it can be scrollable
    const [bottom, setBottom] = useState(null);

    /* createRef() or useRef() is not suitable here as useEffect() can re-render many times which affects the state */ 
    
    // after a new response is rendered, set the state "bottom" to false to display the message if the div is overflow
    useEffect(() => {
        setBottom(false);
    }, [result]) 

    // get the new ref and check if it is scrollable
    const setElement = (element) => {
        if (!element) return;
        const { clientHeight, scrollHeight } = element;
        setScrollable(clientHeight < scrollHeight);
    }

    const handleScroll = ( e ) => {
        if (!scrollable) return;
        const { clientHeight, scrollHeight, scrollTop } = e.target;

        const scrollDiv = document.getElementById("scroll");

        // the height of div "scroll" + padding (px) (base on each device's viewport)
        let scrollDivHeight = scrollDiv ? scrollDiv.offsetHeight : 0;
        
        // rounding the values and use precision method (minus 5px to prevent lagging)
        setBottom(Math.round(scrollTop + clientHeight) >= scrollHeight - scrollDivHeight - 5);
    } 

    return (
        // use ref attribute to get the element
        <>
            <div ref={elementRef => setElement(elementRef)} id="responseField" onScroll={handleScroll}> 
                <p id="def">Definition</p>
                {result}

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