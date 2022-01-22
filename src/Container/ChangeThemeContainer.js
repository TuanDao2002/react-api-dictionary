import React from "react";
import { ToggleButton } from "../Presentational/ToggleButton";

export function ChangeThemeContainer(props) {
    const changeTheme = () => {
        if (props.theme === 'light') {
            props.setTheme('dark');
        } else if (props.theme === 'dark') {
            props.setTheme('light' );
        }
    }

    return <ToggleButton theme={props.theme} onClick={changeTheme} />
}