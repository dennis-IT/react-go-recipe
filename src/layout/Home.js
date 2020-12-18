import React, { useEffect, useRef } from 'react';
import { Box, Button, makeStyles, FormControl, Input, FormHelperText } from '@material-ui/core';
import { gsap } from "gsap";
import Nav from '../components/Nav';

const useStyles = makeStyles((theme) => ({
    heroContainer: {
        background: `url(${process.env.PUBLIC_URL}/media/heroa.jpg)`,
        height: '95vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0
    },
    heroContent: {
        height: '100vh',
        maxHeight: '100%',
        width: '100vw',
        padding: '0 calc((100vw - 1300px)/2)',
    },
    heroItems: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        maxHeight: '100%',
        width: '600px',
        lineHeight: '1.3',
        fontWeight: 'bold',
        padding: '0 2rem',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(5px)'
        },
    },
    heroH1: {
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        marginBottom: '1rem',
        boxShadow: '5px 5px #F5DF4D',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        paddingRight: '4rem'

    },
    heroP: {
        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
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
        <React.Fragment>
            <Box ref={element => container = element} className={classes.heroContainer}>
                <Nav />
                <Box className={classes.heroContent}>
                    <Box className={classes.heroItems}>
                        <div className={classes.heroH1}>
                            Eat right<br />Live right<br />
                            Cook together<br />Stay together<br />
                        </div>
                        <div className={classes.heroP}>
                            Everyone can be a master chief<br />
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
                            <FormHelperText id="recipe-helper-text">Recipe</FormHelperText>
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
        </React.Fragment>
    );
};

export default Home;
