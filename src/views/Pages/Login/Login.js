import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ACCESS_TOKEN, URL_API } from '../../Settings/Config';
import axios from 'axios'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import SweetAlert from 'react-bootstrap-sweetalert';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_login: '',
      user_pass: '',
      users: [],
      alert: null
    }

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  submit(e) {
    //e.prevenDefault()
    axios.get(`${URL_API}/Userr8506s`, {
      headers: { Authorization: ACCESS_TOKEN },
      params: {
        filter: {
          where: {
            username:  this.state.user_login,
            pwd: md5(this.state.user_pass),
            active: 1
          }
        }
      }
    })
    .then(response => {
      //console.log(response.data);
      this.setState({
        users: response.data
      });
      if (response.data != "") {
        this.state.users.map(user => {
          var aa = '{"iduser":' + user.iduser + ', "username":"' + user.username + '", "name":"' + user.name + '","idrole":' + user.idrole + '}';
          let usertoken = jwt.sign(aa, 'shhhhh');
          localStorage.setItem('usertoken', usertoken);
        })
        //let usertoken = jwt.sign(JSON.stringify(this.state.users), 'shhhhh')
        //localStorage.setItem('usertoken', usertoken)
        // var decoded = jwt.verify(usertoken, 'shhhhh');
        // console.log(decoded)

        this.props.history.push('./dashboard');
      } else {
        //console.log("Login Fail")
        this.WarningAlert()
      }
    })
    .catch(error => {
      console.log("error " + error);
    });
  }

  WarningAlert() {
    const getAlert = () => (
      <SweetAlert 
        warning 
        title="Warning!"
        onConfirm={() => this.hideAlert()}
      >
        Invalid authentication!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    //console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                      <h1>Login R8-506</h1>
                      <p className="text-muted">เข้าสู่ระบบ</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="user_login" id="user_login" placeholder="Username" autoComplete="username" onChange={e => this.onChange(e)} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="user_pass" id="user_pass" placeholder="Password" autoComplete="current-password" onChange={e => this.onChange(e)} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={e => this.submit(e)}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {this.state.alert}
      </div>
    );
  }
}

export default Login;
