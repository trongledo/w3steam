import React from 'react';
import marked from 'marked';
import { Support } from './Support.js';
import './css/markdown.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPage: 1
    };
    this.checkPermission = this.checkPermission.bind(this);
    this.checkPermission();
  }

  checkPermission() {
    console.log(sessionStorage.permission);
    let path = this.props.location.search;

    // || !sessionStorage.permission || !(path.substr(3) == sessionStorage.permission) not use
    if (!(window.permission == path.substr(3))) {
      this.props.history.push('/confirm/' + this.state.idPage);
    }
  }

  componentDidMount() {
    console.log('load About');
    // const readmePath = require("./markdowns/about.md");

    // fetch(readmePath)
    //   .then(response => {
    //     return response.text()
    //   })
    //   .then(text => {
    //     this.setState({
    //       markdown: marked(text)
    //     })
    //   })
  }

  render() {
    if (this.state.markdown) {
      return (
        <section className="markdown-section">
          {/* <article dangerouslySetInnerHTML={{__html: this.state.markdown}}></article> */}
        </section>
      );
    } else {
      return <div></div>;
    }
  }
}

export default About;
