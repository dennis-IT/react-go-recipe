import React from 'react';
import uuid from 'react-uuid';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, useMediaQuery, useTheme, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        color: 'ivory',
        fontSize: '1.25rem',
        width: '8rem',
        textTransform: 'capitalize'
    }
}));

const Navbar = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [sidebarOpened, setSidebarOpened] = React.useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); //Down: Small or smaller | Up: Bigger

    const handleButtonClick = pageUrl => {
        history.push(pageUrl);
    };

    const handleChange = (newValue) => {
        setSidebarOpened(newValue);
    };

    const menuItems = [
        {
            itemTitle: 'Home',
            itemUrl: '/'
        },
        {
            itemTitle: 'Recipe',
            itemUrl: '/cuisine'
        },
        {
            itemTitle: 'About',
            itemUrl: '/about'
        }
    ];

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        GoRecipe
                    </Typography>

                    {isMobile ? (
                        <div>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setSidebarOpened(!sidebarOpened)}
                                style={{ padding: '1.25rem 1.25rem' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Sidebar data={menuItems} anchor={'right'} status={sidebarOpened} onChange={handleChange} />
                        </div>
                    )
                        : (
                            <div className={classes.headerOptions}>
                                {menuItems.map((menuItem) => {
                                    return (
                                        <Box key={uuid()} mr={4}><Button variant="outlined" color="primary" className={classes.buttonStyle} disableElevation onClick={() => handleButtonClick(menuItem.itemUrl)}>{menuItem.itemTitle}</Button></Box>
                                    );
                                })}
                            </div>
                        )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Navbar);
