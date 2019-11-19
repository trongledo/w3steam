import React, { Component } from 'react';
import jQuery from 'jquery';

import NavBar from './NavBar';
import Main from './Main';
import Error from './Error';
import Pages from './Pages';
import ConfirmPage from './ConfirmPage';
import { Support } from './Support.js';

import $ from 'jquery';

import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Support.parseObjectFormFile('config/config.json').then(response => {
      console.log(response.data);
      document.title = response.data.siteTitle ? response.data.siteTitle : '';
    });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar root={this} />
        <div className="main-content">
          <Switch>
            <Route
              exact
              path="/confirm"
              render={props => (
                <ConfirmPage {...props} root={this} url="success" />
              )}
            />
            {/* <Route exact path="/about" render={(props)=><About {...props} root={this}/>} /> */}
            <Route
              exact
              path="/pages/:page"
              render={props => <Pages {...props} root={this} />}
            />
            {/* <Route exact path="/contact" render={(props)=><Contact {...props} root={this}/>} /> */}
            <Route exact path="/error" component={Error} />
            <Route
              exact
              path="/"
              render={props => <Main {...props} root={this} />}
            />

            {/* <Route path="*" status={404} render={() => (<Redirect to="/error" />)} /> */}
            <Route component={Error} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
