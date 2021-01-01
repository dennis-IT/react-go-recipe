import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, Box, Grid, Typography, LinearProgress, Button, Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import * as actions from '../store/actions/index';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    rootcss: {
        height: '100vh'
    },
    topBanner: {
        marginTop: '1rem',
        marginBottom: '1rem',
        height: '20vh',
        background: `url(${process.env.PUBLIC_URL}/media/loginBanner.jpg)`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    container: {
        width: '80%',
        margin: '0 auto',
        border: '1px solid #dddddd'
    },
    inputField: {
        width: '20rem'
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [open, setOpen] = useState(false);

    const submitData = (values, actions) => {
        actions.setSubmitting(true);
        props.onAuth(values.email, values.password, isSignup, values.firstName, values.lastName);
        actions.setSubmitting(false);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    useEffect(() => {
        if (props.error !== null) {
            setOpen(true);
        }
    }, [props.error]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss}>
            <Box>
                <Nav />
            </Box>

            <Box className={classes.topBanner} />

            {!props.isAuthenticated ? (
                <Box flexGrow={1}>
                    <Container maxWidth="md">
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Box mb={2.5}>
                                <Typography variant='h5'>
                                    Welcome to GoRecipe
                                    </Typography>
                            </Box>

                            <Box>
                                <Formik
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        password: ''
                                    }}
                                    validate={(values) => {
                                        const errors = {};

                                        if (isSignup) {
                                            if (!values.firstName) {
                                                errors.firstName = 'Required';
                                            }

                                            if (!values.lastName) {
                                                errors.lastName = 'Required';
                                            }
                                        }

                                        if (!values.email) {
                                            errors.email = 'Required';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                            errors.email = 'Invalid email address';
                                        }

                                        if (!values.password) {
                                            errors.password = 'Required';
                                        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(values.password)) {
                                            errors.password = 'Password must contain 6 to 12 characters with letters and numbers only';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={submitData}
                                >
                                    {
                                        ({ submitForm, isSubmitting, touched, errors }) => (
                                            <Form>
                                                {isSignup && (
                                                    <>
                                                        <Box mb={2.5}>
                                                            <Field
                                                                component={TextField}
                                                                variant="outlined"
                                                                color="primary"
                                                                name='firstName'
                                                                type='text'
                                                                label='First Name'
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                className={classes.inputField}
                                                            />
                                                        </Box>
                                                        <Box mb={2.5}>
                                                            <Field
                                                                component={TextField}
                                                                variant="outlined"
                                                                color="primary"
                                                                name='lastName'
                                                                type='text'
                                                                label='Last Name'
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                className={classes.inputField}
                                                            />
                                                        </Box>
                                                    </>
                                                )}

                                                <Box mb={2.5}>
                                                    <Field
                                                        component={TextField}
                                                        variant="outlined"
                                                        color="primary"
                                                        name='email'
                                                        type='email'
                                                        label='Email'
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        className={classes.inputField}
                                                    />
                                                </Box>
                                                <Box mb={2.5}>
                                                    <Field
                                                        component={TextField}
                                                        variant="outlined"
                                                        color="primary"
                                                        name='password'
                                                        type='password'
                                                        label='Password'
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        className={classes.inputField}
                                                    />
                                                </Box>
                                                {isSubmitting && <LinearProgress />}

                                                {!props.loading ? (
                                                    <Box display='flex' flexDirection='row'>
                                                        <Grid container >
                                                            <Grid item xs={4}>
                                                                <Button
                                                                    variant='contained'
                                                                    color='primary'
                                                                    disabled={isSubmitting}
                                                                    onClick={submitForm}
                                                                    disableElevation
                                                                    fullWidth
                                                                >
                                                                    {isSignup ? 'Register' : 'Sign in'}
                                                                </Button>
                                                            </Grid>

                                                            <Grid item xs={8}>
                                                                <Button
                                                                    color='secondary'
                                                                    disableFocusRipple
                                                                    disableRipple
                                                                    onClick={switchAuthModeHandler}
                                                                    style={{ backgroundColor: 'transparent', textTransform: 'none' }}
                                                                >
                                                                    {isSignup ? 'Have account? Sign in here' : 'No account? Register here'}
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                ) : (
                                                        <LinearProgress />
                                                    )}
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            ) : (
                    <Redirect to='/home' />
                )}

            {props.error !== null && (
                <Box>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {props.error.message}
                        </Alert>
                    </Snackbar>
                </Box>
            )}


            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup, firstName, lastName) => dispatch(actions.auth(email, password, isSignup, firstName, lastName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
