import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col, Table, Badge, Button, Label } from 'reactstrap'
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import { ACCESS_TOKEN, URL_API } from '../Settings/Config';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      iduser: '',
      username: '',
      name: ''
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      iduser: decoded.iduser,
      username: decoded.username,
      name: decoded.name
    })
    this.getData();
  }

  getData() {
    axios.get(`${URL_API}/Userr8506s`, {
      headers: { Authorization: ACCESS_TOKEN },
      params: {
        filter: {
          where: {
            iduser:  this.state.iduser
          }
        }
      }
    })
    .then(response => {
      console.log(response.data);
      // this.setState({
      //   users: response.data
      // });
      
    })
    .catch(error => {
      console.log("error " + error);
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-folder-alt"></i> User Profile
          </div>
          <div className="card-body">
            <Row>
              <Col xs="12">
              <Table hover bordered striped responsive size="sm">
                  <tbody>
                  <tr>
                    <td><b>Username</b></td>
                    <td>{this.state.username}</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Name</b></td>
                    <td>{this.state.name}</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>IdUser</td>
                    <td>{this.state.iduser}</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Félix Troels</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Aulus Agmundr</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <div className="card-footer">
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Edit Profile</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
