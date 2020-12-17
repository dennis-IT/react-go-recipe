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
        background: `url(${process.env.PUBLIC_URL}/media/slider.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    hide: {
        background: 'opaque',
        overflow: 'hidden',
        '& > span': {
            transform: 'translateY(100%)',
            display: 'inline-block'
        },
        textAlign: 'center'
    },
    content: {
        opacity: 0
    },
    fontem: {
        fontFamily: [
            '"Kaushan Script"',
            'cursive'
        ].join(','),
        [theme.breakpoints.down('sm')]: {
            fontSize: '4rem'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '6rem',
        }
    }
}));

const Home = (props) => {
    const classes = useStyles();
    let textR1 = useRef(null);
    let textR2 = useRef(null);
    let textR3 = useRef(null);
    let textR4 = useRef(null);
    let intro = useRef(null);
    let content = useRef(null);

    const slideIntro = (intro, content) => {
        gsap.to(intro, { y: "-100%", duration: 1 });
        gsap.fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 });
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
            <div ref={element => content = element} className={classes.content}>
                <Nav />
                <Box className={classes.hero}>

                </Box>
            </div>
            <Box
                className={classes.intro}
                display='flex'
                justifyContent='center'
                alignItems='center'
                ref={element => intro = element}
            >
                <div className={classes.introText}>
                    <div className={classes.hide} >
                        <span ref={element => textR1 = element}>Discovering unique</span>
                    </div>
                    <div className={classes.hide}>
                        <span className={classes.fontem} ref={element => textR2 = element}>Recipes</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR3 = element}>for food lovers ❤</span>
                    </div>
                    <div className={classes.hide}>
                        <span ref={element => textR4 = element}>
                            <Button
                                variant='contained'
                                disableElevation
                                className={classes.buttonStyle}
                                onClick={() => slideIntro(intro, content)}
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
