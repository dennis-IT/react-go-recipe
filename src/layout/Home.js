import React, { useEffect, useRef, Fragment } from 'react';
import { Box, Button, makeStyles, FormControl, Input, FormHelperText, Grid, Container } from '@material-ui/core';
import { gsap } from "gsap";
import clsx from 'clsx';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import RecipeCardCarousel from '../components/RecipeCardCarousel';

const useStyles = makeStyles((theme) => ({
    heroContainer: {
        background: `url(${process.env.PUBLIC_URL}/media/hero.jpg)`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0,
        color: '#4D4B4A'
    },
    heroContent: {
        height: '100vh',
        maxHeight: '100%',
        //width: '100vw',
        padding: '0 calc((100vw - 1300px)/2)',
    },
    heroItems: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 'calc(100vh - 64px)',
        maxHeight: '100%',
        width: '600px',
        lineHeight: '1.3',
        fontWeight: 'bold',
        padding: '0 1.5rem',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(5px)'
        },
    },
    heroH1: {
        fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
        marginTop: '1rem',
        marginBottom: '1rem',
        boxShadow: '5px 5px #F5DF4D',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        paddingRight: '1.5rem'
    },
    heroP: {
        fontSize: 'clamp(1.2rem, 2vw, 2rem)',
        marginBottom: '1rem',
    },
    intro: {
        background: `url(${process.env.PUBLIC_URL}/media/slider.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    introText: {
        color: 'darkred',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.5rem',
        }
    },
    buttonStyle: {
        borderRadius: 0,
        backgroundColor: '#ee9b2f',
        color: 'ivory',
        '&:hover': {
            backgroundColor: '#e0e0e0',
            color: 'black'
        }
    },
    hide: {
        background: 'opaque',
        overflow: 'hidden',
        '& > span': {
            transform: 'translateY(100%)',
            display: 'inline-block'
        },
        textAlign: 'center',
        marginBottom: '0.5rem'
    },
    fontem: {
        fontFamily: [
            '"Kaushan Script"',
            'cursive'
        ].join(','),
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '3.5rem',
        }
    },
    textField: {
        width: '10rem',
    },
    postHeroContent: {
        backgroundColor: '#fce5be'
    },
    postHeroItem: {
        fontSize: 'clamp(1.2rem, 1vw, 1.5rem)',
        color: '#4D4B4A',
        backgroundClip: 'content-box',
        backgroundColor: '#f1f2f3',
        height: '4rem',
        padding: '0.3rem'
    },
    postHeroItemLeft: {
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 0,
            paddingRight: '0.3rem'
        },
        [theme.breakpoints.up('sm')]: {
            paddingRight: 0
        }
    },
    postHeroItemRight: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
            paddingLeft: '0.3rem'
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 0
        }
    },
    recipeCardCarousel: {
        marginTop: '3rem',
        marginBottom: '3rem'
    },
    carouselLeft: {
        background: `url(${process.env.PUBLIC_URL}/media/chef.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%'
    },
    carouselRight: {
        //height: '500px',
    },
    carouselText: {
        fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: '#4D4B4A',
        textAlign: 'center',
        marginBottom: '2rem'
    }
}));

const Home = (props) => {
    const classes = useStyles();
    let textR1 = useRef(null);
    let textR2 = useRef(null);
    let textR3 = useRef(null);
    let textR4 = useRef(null);
    let intro = useRef(null);
    let container = useRef(null);

    const slideIntro = (intro, container) => {
        gsap.to(intro, { y: "-100%", duration: 1 });
        gsap.fromTo(container, { opacity: 0 }, { opacity: 1 });
    };

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
        tl.to(textR1, { y: '0%', duration: 1 });
        tl.to(textR2, { y: '0%', duration: 1 }, '-=0.5');
        tl.to(textR3, { y: '0%', duration: 1 }, '-=0.5');
        tl.to(textR4, { y: '0%', duration: 1 }, '-=0.5');
    }, []);

    return (
        <Fragment>
            <Box ref={element => container = element} className={classes.heroContainer}>
                <Nav />
                <Box className={classes.heroContent}>
                    <Box className={classes.heroItems}>
                        <div className={classes.heroH1}>
                            Eat right. Live right.<br />
                            Cook together.
                        </div>
                        <div className={classes.heroP}>
                            Everyone can become a master chief<br />
                            Pick up your recipe today
                        </div>
                        <FormControl className={classes.textField}>
                            <Input
                                placeholder="steak, pasta,..."
                                id="recipe-searchbox"
                                //value={values.weight}
                                //onChange={handleChange('weight')}
                                aria-describedby="recipe-helper-text"
                                inputProps={{
                                    'aria-label': 'recipe'
                                }}
                            />
                            <FormHelperText id="recipe-helper-text">Tell us what you are looking for</FormHelperText>
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            <Box
                className={classes.intro}
                display='flex'
                justifyContent='center'
                alignItems='center'
                ref={element => intro = element}
            >
                <div className={classes.introText}>
                    <div className={classes.hide} >
                        <span ref={element => textR1 = element}>Discovering Unique</span>
                    </div>
                    <div className={classes.hide}>
                        <span className={classes.fontem} ref={element => textR2 = element}>Recipes</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR3 = element}>For Foodies</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR4 = element}>
                            <Button
                                variant='contained'
                                disableElevation
                                className={classes.buttonStyle}
                                onClick={() => slideIntro(intro, container)}
                            >
                                Explore Now
                            </Button>
                        </span>
                    </div>
                </div>
            </Box>

            <Grid container className={classes.postHeroContent}>
                <Grid item xs={12} md={4} >
                    <Box textAlign='center' display='flex' justifyContent='center' alignItems='center' className={clsx(classes.postHeroItem, classes.postHeroItemLeft)}><i className="far fa-clock"></i>&nbsp;&nbsp;Save your time searching recipes</Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box textAlign='center' display='flex' justifyContent='center' alignItems='center' className={classes.postHeroItem}><i className="far fa-heart"></i>&nbsp;&nbsp;Stop wondering how to cook</Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box textAlign='center' display='flex' justifyContent='center' alignItems='center' className={clsx(classes.postHeroItem, classes.postHeroItemRight)}><i className="far fa-question-circle"></i>&nbsp;&nbsp;Understand how many calories per serving</Box>
                </Grid>
            </Grid>

            <Container maxWidth="lg">
                <Box className={classes.recipeCardCarousel}>
                    <div className={classes.carouselText}>
                        Popular Recipes Today
                    </div>
                    <Grid container>
                        <Grid item xs={12} md={5} className={classes.carouselLeft}>
                        </Grid>
                        <Grid item xs={12} md={7} className={classes.carouselRight}>
                            <RecipeCardCarousel />
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <BottomNav />
        </Fragment>
    );
};

export default Home;
