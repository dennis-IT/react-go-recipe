import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import * as actions from '../store/actions/index';

const useStyles = makeStyles((theme) => ({
    FaBtn: {
        position: 'fixed',
        right: '20px',
        bottom: '20px'
    }
}));

const FAB = (props) => {
    const classes = useStyles();
    const { isDarkMode, onSetDarkMode } = props;

    const handleClick = () => {
        onSetDarkMode(!isDarkMode);
    };

    return (
        <Fab color="secondary" aria-label="setMode" className={classes.FaBtn} onClick={handleClick}>
            {isDarkMode ? <Brightness2Icon /> : <BrightnessHighIcon />}
        </Fab>
    );
};

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetDarkMode: (status) => dispatch(actions.setDarkMode(status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FAB);