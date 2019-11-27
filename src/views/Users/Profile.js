import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import classNames from 'classnames';
import { Row, Col, Table, Button } from 'reactstrap'
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import { ACCESS_TOKEN, URL_API } from '../Settings/Config';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      iduser: '',
      username: '',
      name: '',
      users: [],
      email: ''
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
    this.getData(decoded.iduser);
  }

  getData(iduser) {
    axios.get(`${URL_API}/Userr8506s`, {
      headers: { Authorization: ACCESS_TOKEN },
      params: {
        filter: {
          where: {
            iduser: iduser
          }
        }
      }
    })
    .then(response => {
      //console.log(response.data);
      response.data.map(user => {
        this.setState({
          email: user.email
        });
      })
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
              <Col xs="6">
                <Table hover bordered striped responsive size="sm">
                  <tbody>
                  <tr>
                      <td><b>ID User</b></td>
                      <td>{this.state.iduser}</td>
                    </tr>
                    <tr>
                      <td><b>Username</b></td>
                      <td>{this.state.username}</td>
                    </tr>
                    <tr>
                      <td><b>ชื่อ - สกุล</b></td>
                      <td>{this.state.name}</td>
                    </tr>
                    <tr>
                      <td><b>อีเมล์</b></td>
                      <td>{this.state.email}</td>
                    </tr>
                    <tr>
                      <td><b>ระดับผู้ใช้งาน</b></td>
                      <td></td>
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
