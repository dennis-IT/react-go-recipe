import React, { useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, makeStyles } from '@material-ui/core';
import { gsap } from 'gsap';
import FloatingButton from '../components/FloatingButton';

const Preface = (props) => {
    const useStyles = makeStyles((theme) => ({
        intro: {
            background: props.isDarkMode ? `url(${process.env.PUBLIC_URL}/media/sliderD.jpg)` : `url(${process.env.PUBLIC_URL}/media/slider.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column'
        },
        introText: {
            color: props.isDarkMode ? 'ivory' : 'darkred',
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
            },
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
        }
    }));

    const history = useHistory();
    const classes = useStyles();
    let intro = useRef(null);
    let textR1 = useRef(null);
    let textR2 = useRef(null);
    let textR3 = useRef(null);
    let textR4 = useRef(null);

    useEffect(() => {
        gsap.fromTo(intro, { opacity: 0 }, { opacity: 1, duration: 1 });

        const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
        tl.to(textR1, { y: '0%', duration: 1 });
        tl.to(textR2, { y: '0%', duration: 1 }, '-=0.5');
        tl.to(textR3, { y: '0%', duration: 1 }, '-=0.5');
        tl.to(textR4, { y: '0%', duration: 1 }, '-=0.5');
    }, []);

    return (
        <Fragment>
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
                                onClick={() => history.push('/home')}
                            >
                                Explore Now
                            </Button>
                        </span>
                    </div>
                </div>
            </Box>

            <FloatingButton />
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

export default connect(mapStateToProps)(Preface);
