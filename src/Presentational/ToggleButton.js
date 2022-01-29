import React from 'react';

export function ToggleButton(props) {
    const {theme, onClick} = props;

    let nextTheme;

    // put this code here as handleClick can only change nextTheme but cannot tell button to update nextTheme
    if (theme === 'light') {
        nextTheme = 'DARK';
    } else if (theme === 'dark') {
        nextTheme = 'LIGHT';
    }

    const handleClick = () => {
        onClick();
    }

    return <button id="toggle" onClick={handleClick}>Switch to {nextTheme} mode</button>
}