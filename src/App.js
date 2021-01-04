import { React, Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import Layout from './hoc/Layout';
import Preface from './layout/Preface';
import Home from './layout/Home';
import Recipes from './layout/Recipes';
import RecipeDetails from './layout/RecipeDetails';
import Mybook from './layout/Mybook';
import Login from './layout/Login';
import Logout from './layout/Logout';
import * as actions from './store/actions/index';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Roboto Condensed"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
  palette: {
    //type: 'dark'
  }
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    //!TODO: setup routes for users that are not logged in
    let routes = (
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/recipe' exact component={Recipes} />
        <Route path='/recipe/:id' exact component={RecipeDetails} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Preface} />
        <Redirect to='/home' />
      </Switch>
    );

    //!TODO: protect route for only logined user
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/recipe' exact component={Recipes} />
          <Route path='/recipe/:id' exact component={RecipeDetails} />
          <Route path='/login' exact component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/mybook' exact component={Mybook} />
          <Route path='/' exact component={Preface} />
          <Redirect to='/home' />
        </Switch>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        {/* <Paper style={{ height: '100vh' }}> */}
        <Layout>
          {routes}
        </Layout>
        {/* </Paper> */}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
