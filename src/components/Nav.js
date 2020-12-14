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
        //marginRight: theme.spacing(2),
    },
    title: {
        fontFamily: [
            '"Lobster"',
            'cursive'
        ].join(','),
        flexGrow: 1
    },
    link: {
        textDecoration: 'none',
        color: 'ivory'
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
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#ee9b2f'
        },
        borderRadius: 0
    },
    toolbar: {
        backgroundColor: 'darkred'
    }
}));

const Navbar = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [sidebarOpened, setSidebarOpened] = React.useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            itemTitle: 'Login',
            itemUrl: '/login'
        }
    ];

    return (
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h4" className={classes.title}>
                        <a href='/' className={classes.link}>
                            GoRecipe
                        </a>
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
                                        <Box key={uuid()} mr={4}>
                                            <Button
                                                color="primary"
                                                className={classes.buttonStyle}
                                                disableElevation
                                                onClick={() => handleButtonClick(menuItem.itemUrl)}>{menuItem.itemTitle}
                                            </Button>
                                        </Box>
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
