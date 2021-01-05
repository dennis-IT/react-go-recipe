import { React, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';
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

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: [
//       '"Roboto Condensed"',
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(',')
//   },
//   palette: {
//     //type: 'dark'
//   }
// });

// class App extends Component {
//   componentDidMount() {
//     this.props.onTryAutoSignup();
//     this.props.onVerifyDarkMode();
//   }

//   render() {
//     //!TODO: setup routes for users that are not logged in
//     let routes = (
//       <Switch>
//         <Route path='/home' component={Home} />
//         <Route path='/recipe' exact component={Recipes} />
//         <Route path='/recipe/:id' exact component={RecipeDetails} />
//         <Route path='/login' component={Login} />
//         <Route path='/' exact component={Preface} />
//         <Redirect to='/home' />
//       </Switch>
//     );

//     //!TODO: protect route for only logined user
//     if (this.props.isAuthenticated) {
//       routes = (
//         <Switch>
//           <Route path='/home' component={Home} />
//           <Route path='/recipe' exact component={Recipes} />
//           <Route path='/recipe/:id' exact component={RecipeDetails} />
//           <Route path='/login' exact component={Login} />
//           <Route path='/logout' component={Logout} />
//           <Route path='/mybook' exact component={Mybook} />
//           <Route path='/' exact component={Preface} />
//           <Redirect to='/home' />
//         </Switch>
//       );
//     }

//     return (
//       <ThemeProvider theme={theme}>
//         <Paper>
//           <Layout>
//             {routes}
//           </Layout>
//         </Paper>
//       </ThemeProvider>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//     isDarkMode: state.darkModeEnable.isDarkMode
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState()),
//     onVerifyDarkMode: () => dispatch(actions.verifyDarkMode())
//   };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const App = (props) => {
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
      type: props.isDarkMode ? 'dark' : 'light',
      primary: props.isDarkMode ? {
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
        contrastText: 'ivory'
      } : {
          light: '#7986cb',
          main: '#3f51b5',
          dark: '#303f9f',
          contrastText: '#fff'
        }
    }
  });

  useEffect(() => {
    props.onTryAutoSignup();
    props.onVerifyDarkMode();
  });

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
  if (props.isAuthenticated) {
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
      <Paper>
        <Layout>
          {routes}
        </Layout>
      </Paper>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isDarkMode: state.darkModeEnable.isDarkMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onVerifyDarkMode: () => dispatch(actions.verifyDarkMode())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
