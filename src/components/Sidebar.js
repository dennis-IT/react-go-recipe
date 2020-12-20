import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemText, SwipeableDrawer, Box, IconButton, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
    list: {
        width: 225
    },
    paper: {
        background: '#97999B',
        color: 'black'
    },
    icon: {
        fontSize: '4.5rem',
        padding: '1rem',
        color: 'black'
    },
    listItemText: {
        fontFamily: [
            '"Bangers"',
            'cursive'
        ].join(','),
        textAlign: 'center',
        fontSize: '1.5rem'
    }
});

const SideDrawer = (props) => {
    const { history } = props;
    const { data, anchor, status } = props;
    const classes = useStyles();
    const [state, setState] = useState({
        sidebarStatus: status
    });

    useEffect(() => {
        setState(prevState => ({ ...prevState, sidebarStatus: status }));
    }, [status]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const handleChange = (open) => {
        props.onChange(open);
    };

    const handleButtonClick = pageUrl => {
        history.push(pageUrl);
    };

    const handleClose = () => {
        toggleDrawer(false);
        handleChange(false);
    };

    const list = data => (
        <div
            className={classes.list}
            role="presentation"
            onClick={handleClose}
            onKeyDown={handleClose}
        >
            <List style={{ padding: 0 }}>
                {data.map(item => (
                    <ListItem button key={item.itemTitle} onClick={() => handleButtonClick(item.itemUrl)} >
                        <ListItemText primary={item.itemTitle} classes={{ primary: classes.listItemText }} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state.sidebarStatus}
                    onClose={handleClose}
                    onOpen={toggleDrawer(true)}
                    classes={{ paper: classes.paper }}
                >
                    <Box display='flex' justifyContent='flex-end' >
                        <IconButton onClick={handleClose} style={{ padding: '0' }}>
                            <ClearIcon className={classes.icon} />
                        </IconButton>
                    </Box>
                    {list(data)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
};

export default withRouter(SideDrawer);
