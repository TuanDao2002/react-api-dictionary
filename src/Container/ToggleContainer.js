import React from "react";
import { Toggle } from "../Presentational/toggleTheme";

export class ToggleContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme() {
        if (this.props.theme === 'light') {
            this.props.getTheme('dark');
        } else if (this.props.theme === 'dark') {
            this.props.getTheme('light' );
        }
    }

    render() {
        return <Toggle theme={this.props.theme} onClick={this.changeTheme} />
    }
}