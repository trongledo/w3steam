import React from 'react';
import Home from './Home';
import Footer from './Footer';
import Loading from './Loading';

import { Support } from './Support.js';

import $ from 'jquery';

import { Route, Switch } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      ready: false
    };
    this.checkPermission = this.checkPermission.bind(this);
  }

  checkPermission() {
    Support.parseObjectFormFile('config/menu.json').then(response => {
      let MenuList = response.data;
      let pathname = this.props.location.pathname;
      this.setState({
        menuList: response.data
      });

      if (Support.isRequirePermissionLink(pathname, MenuList)) {
        let key = Support.getParamFromURL('k');

        if (!key || !(window.permission == key)) {
          let url = '/confirm' + '?page=' + pathname;
          this.props.history.push(url);
        } else {
          this.setState({
            ready: true
          });
        }
      } else {
        this.setState({
          ready: true
        });
      }
    });
  }

  componentDidMount() {
    console.log('load Main');
    this.checkPermission();
  }

  render() {
    if (this.state.ready) {
      return (
        <div>
          <Home />
          <Footer />
          <div id="btn-move-top">
            <a href="#grid-sizer">
              <i className="fa fa-angle-up"></i>
            </a>
          </div>
          <Loading />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Main;
