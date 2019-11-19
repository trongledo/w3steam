/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap';
import { storage, database } from '../../helpers/Firebase';
import firebase from '../../helpers/Firebase';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      projectType: '',
      projectLink: '',
      projectCSS: '',
      theme: 'dark-theme',
      author: '',
      description: '',
      imageFiles: [],
      imageURLs: [],
      loading: false,
      loggedIn: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  componentDidMount() {
    this.onAuthListener();
  }

  onAuthListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Signed In');
      } else {
        console.log('Not signed in');
        this.props.history.push('/admin/login');
      }
    });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler = async e => {
    e.preventDefault();
    // const {
    //   projectName,
    //   projectType,
    //   projectLink,
    //   projectCSS,
    //   theme,
    //   author,
    //   description
    // } = this.state;

    let { imageFiles, imageURLs } = this.state;
    for (let i = 0; i < imageFiles.length; i++) {
      this.setState({ loading: true });
      const uploadImage = storage
        .ref(`images/${imageFiles[i].name}`)
        .put(imageFiles[i]);

      uploadImage.on(
        'state_changed',
        () => {
          // console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        async () => {
          const imageURL = await storage
            .ref('images')
            .child(imageFiles[i].name)
            .getDownloadURL();

          imageURLs.push(imageURL);

          if (i === imageFiles.length - 1) {
            this.setState({ imageURLs: imageURLs, loading: false });

            const projectData = {
              projectName: this.state.projectName,
              projectType: this.state.projectType,
              projectLink: this.state.projectLink,
              projectCSS: this.state.projectCSS,
              theme: this.state.theme,
              author: this.state.author,
              description: this.state.description,
              imageURLs: this.state.imageURLs
            };

            database.ref('information').push(projectData);
          }
        }
      );
    }
  };

  onImageUpload(e) {
    if (e.target.files.length) {
      const imageFiles = e.target.files;

      console.log('FILES');
      console.log(imageFiles);
      this.setState({ imageFiles });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <LoadingOverlay
              active={this.state.loading}
              spinner
              text="Loading..."
              styles={{
                overlay: base => ({
                  ...base,
                  background: 'rgba(255, 255, 255, 0.5)',
                  color: 'black'
                }),
                spinner: base => ({
                  ...base,
                  width: '100px',
                  '& svg circle': {
                    stroke: 'rgba(255, 0, 0, 0.5)'
                  }
                })
              }}
            >
              <Card>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                  onSubmit={this.onSubmitHandler}
                >
                  <CardHeader>
                    <strong>New</strong> Project
                  </CardHeader>
                  <CardBody>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Project Name</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="text"
                          id="text-input"
                          name="projectName"
                          placeholder="Name"
                          required
                          onChange={this.onChangeHandler}
                        />
                        <FormText color="muted">
                          Please enter your project name
                        </FormText>
                      </Col>
                      <Col md="2">
                        <Label htmlFor="select">Theme</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="select"
                          name="theme"
                          id="select"
                          onChange={this.onChangeHandler}
                        >
                          <option value="dark-theme" selected>
                            dark-theme
                          </option>
                          <option value="light-theme">light-theme</option>
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Project Type</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="text"
                          id="text-input"
                          name="projectType"
                          placeholder="Type"
                          required
                          onChange={this.onChangeHandler}
                        />
                        <FormText className="help-block">
                          Please enter your project type
                        </FormText>
                      </Col>
                      <Col md="2">
                        <Label htmlFor="text-input">Author</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="text"
                          id="text-input"
                          name="author"
                          placeholder="Author"
                          required
                          onChange={this.onChangeHandler}
                        />
                        <FormText className="help-block">
                          Please enter author
                        </FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Project Link</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="text"
                          id="text-input"
                          name="projectLink"
                          placeholder="Link"
                          required
                          onChange={this.onChangeHandler}
                        />
                        <FormText className="help-block">
                          Please enter your project link
                        </FormText>
                      </Col>
                      <Col md="2">
                        <Label htmlFor="file-multiple-input">Galleries</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="file"
                          id="file-multiple-input"
                          name="galleries"
                          multiple
                          required
                          onChange={this.onImageUpload}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">CSS column bootstrap</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="text"
                          id="text-input"
                          name="projectCSS"
                          placeholder="CSS class"
                          required
                          onChange={this.onChangeHandler}
                        />
                        <FormText className="help-block">
                          Please enter CSS class
                        </FormText>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="textarea-input">Description</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input
                          type="textarea"
                          name="description"
                          id="textarea-input"
                          rows="9"
                          placeholder="Content..."
                          required
                          onChange={this.onChangeHandler}
                        />
                      </Col>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"></i> Submit
                    </Button>
                    <Button type="reset" size="sm" color="danger">
                      <i className="fa fa-ban"></i> Reset
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </LoadingOverlay>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;
