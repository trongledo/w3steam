import React from 'react';
import marked from "marked";
import {Support} from './Support.js';
import './css/markdown.css';

class Pages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          page: '',      
          history: this.props.history,
          location:this.props.location,
          match: this.props.match
        };
        this.checkPermission = this.checkPermission.bind(this);       
        this.getMarkdown = this.getMarkdown.bind(this);      
       
    }

    checkPermission(){
      Support.parseObjectFormFile('config/menu.json')
      .then( response => {
            let MenuList = response.data;        
            let pathname = this.state.location.pathname;

            if(Support.isRequirePermissionLink(pathname, MenuList)){
                let key = Support.getParamFromURL('k');
                
                if(!key || !(window.permission == key)){
                  let url ="/confirm";	
                  this.state.history.push({
                      pathname: "/confirm",
                      state: {
                          page: pathname
                      }
                  });                  
               
                }else{
                  this.getMarkdown();
                }
            }else{
              this.getMarkdown();
            }        
      });      
      
    }

    getMarkdown(){
      this.setState({
        page:this.state.match.params.page
        }, ()=>{
          var rootUrl =  window.location.protocol  +'//'+  window.location.hostname +(window.location.port ? ':'+ window.location.port: '');               
            try{
              const readmePath = rootUrl + "/markdowns/"+ this.state.page;         
              fetch(readmePath)
                .then(response => {               
                  return response.text();
                })
                .then(text => {
                  if(text.indexOf("<!DOCTYPE html>") == 0 || text.indexOf('<html') == 0){
                    this.state.history.push('/error');
                  }
                  this.setState({
                    markdown: marked(text)
                  })
                })
            }   
            catch(error){
              this.state.history.push('/error');
            }               
        });
    }

    componentDidMount(){
      this.checkPermission();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
        currentClick: nextProps.currentClick,
        history: nextProps.history,
        location: nextProps.location,
        match: nextProps.match
       }, ()=>{
        this.checkPermission();
       });  
      
    }

    render() {
      if(this.state.markdown){
          return (
            <section className="markdown-section">
            <article dangerouslySetInnerHTML={{__html: this.state.markdown}}></article>
           
            </section>
          )
      }
      else{
        return (<div></div>);
      }
    
    }
}

export default Pages;