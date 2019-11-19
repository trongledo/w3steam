import React from 'react';

import ItemProject from './ItemProject';

import Detail from './Detail';
import { Support } from './Support.js';
import './css/Home.css';
import $ from 'jquery';
import { database } from './helpers/Firebase';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      preview: [],
      detail: ''
    };

    //console.log(this.state.list);
    this.onItemProjectClick = this.onItemProjectClick.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }

  componentDidMount() {
    // Support.parseObjectFormFile('config/projects-list.json').then(response => {
    //   this.setState({
    //     list: response.data
    //   });
    //   window.loadMarsonry();
    //   window.controllButtonMoveTop();
    //   //   database.ref('information').push(this.state.list[0]);
    // });

    const info = database.ref('information').on(
      'value',
      data => {
        const dataValue = data.val();
        const keys = Object.keys(dataValue);
        const newList = [];

        for (let i = 0; i < keys.length; i++) {
          const newProject = {
            id: i,
            projectName: dataValue[keys[i]].projectName,
            projectType: dataValue[keys[i]].projectType,
            projectLink: dataValue[keys[i]].projectLink,
            projectDescription: dataValue[keys[i]].description,
            theme: dataValue[keys[i]].theme,
            backgroundUrl: dataValue[keys[i]].imageURLs[0],
            listBackgroundUrl: dataValue[keys[i]].imageURLs,
            colBootstrap: dataValue[keys[i]].projectCSS,
            author: dataValue[keys[i]].author
          };
          newList.push(newProject);
        }

        this.setState({
          list: newList
        });
        console.log(this.state.list);
        window.loadMarsonry();
        window.controllButtonMoveTop();
      },
      () => {}
    );
  }

  onItemProjectClick(content) {
    $('.bgd-img').removeClass('item-fade-in-center');
    // console.log(content);
    // this.setState({
    //     detail: <ItemProjectUpSlide content={content} parent = {this} closeDetail = {this.closeDetail}/>
    // });

    this.setState({
      detail: (
        <Detail
          content={content}
          parent={this}
          closeDetail={this.closeDetail}
        />
      )
    });
  }

  closeDetail() {
    this.setState({
      detail: ''
    });
    $('body').removeClass('hide-scroll');
  }

  render() {
    return (
      <div className="project-list">
        <div className=" row grid">
          <div id="grid-sizer" className="grid-sizer "></div>
          {this.state.list.map(item => (
            <ItemProject
              key={item.id}
              content={item}
              onItemProjectClick={this.onItemProjectClick}
            />
          ))}
        </div>

        {this.state.detail}
      </div>
    );
  }
}

export default Home;
