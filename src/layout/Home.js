import React, { useEffect, useRef } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { gsap } from "gsap";
import Nav from '../components/Nav';

const useStyles = makeStyles((theme) => ({
    hero: {
        minHeight: '100vh',
        background: `url(${process.env.PUBLIC_URL}/media/heronew.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    intro: {
        background: 'darkred',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    introText: {
        color: 'ivory',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.75rem'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '4.5rem',
        }
    },
    buttonStyle: {
        borderRadius: 0,
        backgroundColor: '#ee9b2f',
        color: 'ivory',
        '&:hover': {
            backgroundColor: '#e0e0e0',
            color: 'darkred'
        },
        fontSize: '1.5rem'
    },
    slider: {
        background: 'lightgrey',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        transform: 'translateY(100%)'
    },
    hide: {
        background: 'darkred',
        overflow: 'hidden',
        '& > span': {
            transform: 'translateY(100%)',
            display: 'inline-block'
        }
    }
}));

const Home = (props) => {
    const classes = useStyles();
    let textR1 = useRef(null);
    let textR2 = useRef(null);
    let textR3 = useRef(null);
    let textR4 = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
        tl.to(textR1, { y: '0%', duration: 1 });
        tl.to(textR2, { y: 0, duration: 1 }, '-=0.5');
        tl.to(textR3, { y: 0, duration: 1 }, '-=0.5');
        tl.to(textR4, { y: 0, duration: 1 }, '-=0.5');

    }, []);

    return (
        <React.Fragment>
            <Nav />
            <Box className={classes.hero}>

            </Box>
            <Box className={classes.intro} display='flex' justifyContent='center' alignItems='center'>
                <div className={classes.introText}>
                    <div className={classes.hide} >
                        <span ref={element => textR1 = element}>Discovering unique</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR2 = element}>Recipes</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR3 = element}>For Everyone</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR4 = element}>
                            <Button variant='contained' disableElevation className={classes.buttonStyle} >
                                Explore Now
                        </Button>
                        </span>
                    </div>
                </div>
            </Box>
            <Box className={classes.slider}></Box>
        </React.Fragment>
    );
};

export default Home;
