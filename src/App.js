import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import Layout from './hoc/Layout';
import Home from './layout/Home';
import Recipes from './layout/Recipes';
import RecipeDetails from './layout/RecipeDetails';
import Login from './layout/Login';

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
            <Route path='/recipe' exact component={Recipes} />
            <Route path='/recipe/:id' exact component={RecipeDetails} />
            <Route path='/login' exact component={Login} />
            <Route path='/' exact component={Home} />
          </Switch>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
