import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Box, Container, Tab, Tabs, Typography, Grid } from '@material-ui/core';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import * as actions from '../store/actions/index';
import RecipeCard from '../components/RecipeCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    rootcss: {
        height: '100vh'
    },
    heroText: {
        color: '#4D4B4A'
    },
    img: {
        maxWidth: '100%',
        maxHeight: '250px',
        // minHeight: '100px'
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabRoot: {
        fontSize: '1.2rem',
        height: '4rem'
    },
    tabSelected: {
        color: '#4D4B4A',
        fontWeight: 'bold'
    },
    tabsRoot: {
        overflow: 'visible'
    },
    tabPanel: {
        flexGrow: 1
    },
    infoText: {
        color: '#4D4B4A',
        margin: '0.75rem 0',
        fontSize: '1.1rem',
        overflowWrap: 'break-word',
        wordBreak: 'break-word'
    },
    infoImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentRightRight: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    }
}));

const Mybook = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { userInfo, userFavorite, onFetchUserInfo, onFetchUserFavorite } = props;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');


    useEffect(() => {
        onFetchUserInfo(token, userId);
        onFetchUserFavorite(token, userId);
    }, [onFetchUserInfo, token, userId, onFetchUserFavorite]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss}>
            <Box>
                <Nav />
            </Box>

            <Box flexGrow={1} my={3}>
                <Container maxWidth="lg">
                    <Box mb={3} style={{ textAlign: 'center' }}>
                        <Typography variant='h4' className={classes.heroText}>
                            Welcome to GoRecipe
                        </Typography>
                    </Box>

                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                            indicatorColor='primary'
                            classes={{ root: classes.tabsRoot }}
                        >
                            <Tab label="My Info" {...a11yProps(0)} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
                            <Tab label="Favorite" {...a11yProps(1)} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
                            <Tab label="Cookbook" {...a11yProps(2)} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
                        </Tabs>
                        <TabPanel value={value} index={0} className={classes.tabPanel}>
                            <Grid container>
                                <Grid item xs={12} md={3} className={classes.infoImage}>
                                    <img src={process.env.PUBLIC_URL + `/media/loginBanner.jpg`} alt={`Welcome banner`} className={classes.img}></img>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    {userInfo !== null && (
                                        <Box display='flex' justifyContent='center' flexDirection='column'>
                                            <div className={classes.infoText}>First name: {userInfo.firstName}</div>
                                            <div className={classes.infoText}>Last name: {userInfo.lastName}</div>
                                            <p className={classes.infoText}>Email: {userInfo.email}</p>
                                            <div className={classes.infoText}>UserID: {userInfo.userId}</div>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {userFavorite !== null && (
                                <Grid container spacing={2} className={classes.contentRightRight}>
                                    {userFavorite.map(recipe => (
                                        <Grid item key={recipe.id}>
                                            <RecipeCard key={recipe.id} recipe={recipe} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Cookbook
                        </TabPanel>
                    </div>
                </Container>
            </Box>

            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        userFavorite: state.auth.userFavorite
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserInfo: (token, userId) => dispatch(actions.getUser(token, userId)),
        onFetchUserFavorite: (token, userId) => dispatch(actions.getFavorite(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mybook);
