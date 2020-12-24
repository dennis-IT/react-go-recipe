import React from 'react';
import uuid from 'react-uuid';
import { Link, useHistory } from 'react-router-dom';
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
        fontSize: '2rem',
        width: '8rem',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#F5DF4D'
        },
        borderRadius: 0
    }
}));

const Navbar = (props) => {
    //const { history } = props;
    const history = useHistory();
    const classes = useStyles();
    const [sidebarOpened, setSidebarOpened] = React.useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
            itemUrl: '/recipe'
        },
        {
            itemTitle: 'Login',
            itemUrl: '/login'
        }
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
                                        <Box key={uuid()} mr={1}>
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

//export default withRouter(Navbar);
export default Navbar;

