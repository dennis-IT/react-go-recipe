import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    ].join(','),
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Switch>
            <Route path='/home' exact component={Home} />
            <Route path='/recipe' exact component={Recipes} />
            <Route path='/recipe/:id' exact component={RecipeDetails} />
            <Route path='/login' exact component={Login} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/mybook' exact component={Mybook} />
            <Route path='/' exact component={Preface} />
          </Switch>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
