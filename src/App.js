import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import Layout from './hoc/Layout';
import Home from './layout/Home';
import Cuisine from './layout/Cuisine';
import About from './layout/About';

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
            <Route exact path='/cuisine' component={Cuisine} />
            <Route exact path='/about' component={About} />
            <Route path='/' component={Home} />
          </Switch>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
