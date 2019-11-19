import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Button,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  Form
} from 'reactstrap';
import firebase, { database } from '../../helpers/Firebase';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      editModal: false,
      addModal: false,
      name: '',
      link: '',
      isPrivate: false,
      key: '',
      menu: [],
      loading: false,
      currentItem: null
    };

    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    database.ref('menu').on('value', data => {
      const dataVal = data.val();
      const keys = Object.keys(dataVal);
      let newList = [];

      for (let i = 0; i < keys.length; i++) {
        dataVal[keys[i]].key = keys[i];
        newList.push(dataVal[keys[i]]);
      }
      this.setState({ menu: newList, loading: false });
    });

    this.onAuthListener();
  }

  onAuthListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Signed In');
      } else {
        console.log('Not signed in');
      }
    });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleDelete() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  toggleDeleteItem(item) {
    this.toggleDelete();
    this.setState({ currentItem: item });
    console.log(item);
  }

  toggleEdit() {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  toggleEditItem(item) {
    this.toggleEdit();
    this.setState({ currentItem: item });
  }

  toggleAdd() {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  onCreate(e) {
    e.preventDefault();
    const checkBox = document.getElementById('checkbox');
    const isChecked = checkBox.checked;
    this.setState({ isPrivate: isChecked });

    const newData = {
      name: this.state.name,
      link: this.state.link,
      isPrivate: isChecked
    };

    database.ref('menu').push(newData);
  }

  onEdit = e => {
    e.preventDefault();
    const checkBox = document.getElementById('checkbox');
    const isChecked = checkBox.checked;
    this.setState({ isPrivate: isChecked });

    const testData = {
      name: this.state.name,
      link: this.state.link,
      isPrivate: isChecked
    };

    database.ref(`menu/${this.state.currentItem.key}`).update(testData);
  };

  onDelete(e) {
    e.preventDefault();
    this.setState({ deleteModal: false });

    database.ref(`menu/${this.state.currentItem.key}`).remove();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Menu List
              </CardHeader>
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
                <CardBody>
                  <Button
                    onClick={this.toggleAdd}
                    color="success"
                    className="btn-pill mb-3 float-right"
                  >
                    New
                  </Button>

                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Is Private</th>
                        <th>Update/Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.menu.map(item => (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.link}</td>
                          <td>{item.isPrivate ? 'Yes' : 'No'}</td>
                          <td>
                            <div className="float-right">
                              <Button
                                onClick={() => this.toggleEditItem(item)}
                                className="btn-pill mr-1"
                                color="info"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => this.toggleDeleteItem(item)}
                                className="btn-pill"
                                color="danger"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </LoadingOverlay>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.addModal}
          toggleDelete={this.toggleAdd}
          className={'modal-success '}
        >
          <ModalHeader>Add</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onCreate}>
              <Input
                type="text"
                id="text-input"
                name="name"
                placeholder="Name"
                required
                className="mb-2"
                onChange={this.onChangeHandler}
              />
              <Input
                type="text"
                id="text-input"
                name="link"
                placeholder="Link"
                required
                onChange={this.onChangeHandler}
                className="mb-2"
              />
              <Input
                className="form-check-input ml-2"
                type="checkbox"
                id="checkbox"
                onChange={this.onChangeHandler}
                value="true"
              />
              <Label className="form-check-label ml-4" htmlFor="checkbox">
                Is Private
              </Label>
              <Button className="float-right" color="success" type="submit">
                Add
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleAdd}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.editModal}
          toggleDelete={this.toggleEdit}
          className={'modal-info '}
        >
          <ModalHeader>Edit</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onEdit}>
              <Input
                type="text"
                id="edit-name"
                name="key"
                placeholder="key"
                required
                disabled
                value={this.state.currentItem ? this.state.currentItem.key : ''}
                className="mb-2"
                onChange={this.onChangeHandler}
              />
              <Input
                type="text"
                id="edit-link"
                name="name"
                placeholder="Name"
                required
                className="mb-2"
                onChange={this.onChangeHandler}
              />
              <Input
                type="text"
                id="edit-privacy"
                name="link"
                placeholder="Link"
                required
                onChange={this.onChangeHandler}
                className="mb-2"
              />
              <Input
                className="form-check-input ml-2"
                type="checkbox"
                id="checkbox"
                onChange={this.onChangeHandler}
                value="true"
              />
              <Label className="form-check-label ml-4" htmlFor="checkbox">
                Is Private
              </Label>
              <Button className="float-right" color="info" type="submit">
                Update
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.deleteModal}
          toggleDelete={this.toggleDelete}
          className={'modal-danger '}
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>Deleted content cannot be recovered. Continue?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.onDelete}>
              Confirm
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MenuList;
