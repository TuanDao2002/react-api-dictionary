import React from 'react';

export function Toggle(props) {

    let nextTheme;

    // put this code here as handleClick can only change nextTheme but cannot tell button to update nextTheme
    if (props.theme === 'light') {
        nextTheme = 'DARK';
    } else if (props.theme === 'dark') {
        nextTheme = 'LIGHT';
    }

    const handleClick = () => {
        props.onClick();
    }

    return <button id="toggle" onClick={handleClick}>Switch to {nextTheme} mode</button>
}