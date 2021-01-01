import React from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, useMediaQuery, useTheme, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        //marginRight: theme.spacing(2),
        color: '#676563'
    },
    title: {
        fontFamily: [
            '"Kaushan Script"',
            'cursive'
        ].join(','),
        fontWeight: 'bold',
        fontSize: '1.5rem',
        flexGrow: 1
    },
    link: {
        textDecoration: 'none',
        color: '#676563'
    },
    headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        fontFamily: [
            '"Bangers"',
            'cursive'
        ].join(','),
        color: '#676563',
        fontSize: '1.5rem',
        width: '6rem',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#F5DF4D'
        },
        borderRadius: 0
    },
    highlightedButton: {
        backgroundColor: '#F5DF4D'
    }
}));

const Navbar = (props) => {
    //const { history } = props;
    //const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [sidebarOpened, setSidebarOpened] = React.useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    // const handleButtonClick = pageUrl => {
    //     history.push(pageUrl);
    // };

    const handleChange = (newValue) => {
        setSidebarOpened(newValue);
    };

    const menuItems = [
        {
            itemTitle: 'Home',
            itemUrl: '/home',
            visible: true
        },
        {
            itemTitle: 'Recipe',
            itemUrl: '/recipe',
            visible: true
        },
        {
            itemTitle: 'Mybook',
            itemUrl: '/mybook',
            visible: props.isAuthenticated
        },
        {
            itemTitle: 'Login',
            itemUrl: '/login',
            visible: !props.isAuthenticated
        },
        {
            itemTitle: 'Logout',
            itemUrl: '/logout',
            visible: props.isAuthenticated
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar elevation={0} color="transparent" position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        <Link to={{ pathname: '/' }} className={classes.link}>
                            GoRecipe
                        </Link>
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
                                        menuItem.visible && <Box key={uuid()} mr={1.5}>
                                            <Link to={{ pathname: menuItem.itemUrl }} className={classes.link}>
                                                <Button
                                                    color="primary"
                                                    className={clsx(classes.buttonStyle, menuItem.itemUrl === location.pathname && classes.highlightedButton)}
                                                    disableElevation
                                                >
                                                    {menuItem.itemTitle}
                                                </Button>
                                            </Link>
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

//export default withRouter(Navbar);
export default connect(mapStateToProps)(Navbar);

