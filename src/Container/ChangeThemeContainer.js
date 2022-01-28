import React from "react";
import { ToggleButton } from "../Presentational/ToggleButton";

export function ChangeThemeContainer(props) {
    const {theme, setTheme} = props;
    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light' );
        }
    }

    return <ToggleButton theme={theme} onClick={changeTheme} />
}