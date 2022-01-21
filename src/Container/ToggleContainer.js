import React from "react";
import { ToggleButton } from "../Presentational/toggleTheme";

export class ChangeThemeContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme() {
        if (this.props.theme === 'light') {
            this.props.setTheme('dark');
        } else if (this.props.theme === 'dark') {
            this.props.setTheme('light' );
        }
    }

    render() {
        return <ToggleButton theme={this.props.theme} onClick={this.changeTheme} />
    }
}