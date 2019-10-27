import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default class CustomHeaderGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                Playlist
                <IconButton className={useStyles.margin} size="small"
                    onClick={this.props.agGridReact.gridOptions.context.componentParent.handlePlayInGrid}>
                    <PlayArrowIcon color="secondary" /></IconButton>
                &#60;--Click to Play
                <IconButton className={useStyles.margin} size="small"
                    onClick={this.props.agGridReact.gridOptions.context.componentParent.handleSaveListInGrid}>
                    <SaveIcon color="secondary" /></IconButton>
                &#60;--Click to Save your Playlist as default
            </div>
        );
    }


}