import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Box, Typography, LinearProgress, Button, Container } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Nav from '../components/Nav';
import BottomNav from '../components/BottomNav';
import * as actions from '../store/actions/index';

const useStyles = makeStyles(theme => ({
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
    // containerLeft: {
    //     padding: '1.5rem'
    // },
    // containerRight: {
    //     backgroundColor: '#f7f7f7',
    //     padding: '1.5rem'
    // },
    inputField: {
        width: '20rem'
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);

    const submitData = (values, actions) => {
        actions.setSubmitting(true);
        props.onAuth(values.email, values.password, isSignup);
        actions.setSubmitting(false);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    return (
        <Box display='flex' flexDirection='column' className={classes.rootcss}>
            <Box>
                <Nav />
            </Box>
            <Box className={classes.topBanner} />
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
                                    email: '',
                                    password: ''
                                }}
                                validate={(values) => {
                                    const errors = {};
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
                                            <Box display='flex' flexDirection='row'>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    disabled={isSubmitting}
                                                    onClick={submitForm}
                                                    disableElevation
                                                >
                                                    {isSignup ? 'Create' : 'Sign in'}
                                                </Button>

                                                <Box ml={2}>
                                                    <Button
                                                        color='secondary'
                                                        disableFocusRipple
                                                        disableRipple
                                                        onClick={switchAuthModeHandler}
                                                    >
                                                        {isSignup ? 'Have account? Sign in here' : 'No account? Sign up here'}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box flexShrink={0}>
                <BottomNav />
            </Box>
        </Box>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(null, mapDispatchToProps)(Login);
