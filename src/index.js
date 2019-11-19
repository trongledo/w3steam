import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin/App';
import Error from './Error';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" render={props => <App {...props} root={this} />} />
      <Route path="/admin" render={props => <Admin {...props} root={this} />} />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
