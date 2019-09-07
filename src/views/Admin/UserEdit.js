import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import classnames from 'classnames';
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  Nav, 
  NavItem, 
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      AuthString:
        "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
      Docs: [],
      isLoading: true,
      Users: [],
      UsersIsLoading: true,
      userInfo:(this.props.location.state)?this.props.location.state.userInfo:{iduser:"",name:"",username:"",idprovince:""},
      // userInfo:{name:"",username:"",idprovince:""},
      roleList: [],
    //   idprovince: this.props.location.state.idprovince,
    //   nameprovince: this.props.location.state.nameprovince

    };
    // console.log(this.state);

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios
      .get(`http://203.157.168.91:3000/api/Amps?filter={"where":{"idprovince":"${this.state.idprovince}"}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
// console.log(response);        
        this.setState({
          Docs: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });

      axios
      .get(`http://203.157.168.91:3000/api/Userr8506s?filter={"where":{"and":[{"idrole":"11"},{"idprovince":"${this.state.idprovince}"}]}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
// console.log(response);        
        this.setState({
          Users: response.data,
          UsersIsLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
      
      axios
      .get(`http://203.157.168.91:3000/api/Roler8506s`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
// console.log(response);        
        this.setState({
          roleList: response.data,
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }

  handleChange=e=>{
      this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value} });
  }

  handleSave=e=>{
// console.log(this.state.userInfo);
      axios
      .put(`http://203.157.168.91:3000/api/Userr8506s`, this.state.userInfo, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
console.log(response);        
        this.setState({
          Users: response.data,
          UsersIsLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }

  render() {
    const { isLoading, Docs, Users, UsersIsLoading, nameprovince, roleList } = this.state;
    // const { name, username} = this.state.userInfo;
    return (
      <>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> ข้อมูลผู้ใช้งาน{nameprovince}
              </CardHeader>
              <CardBody>

                <Form>
                  <Input type="hidden" name="idprovince" id="idprovince" placeholder="" value={(this.state.userInfo)?this.state.userInfo.idprovince:this.props.location.state.idprovince} onChange={this.handleChange} />

                  <Row form>
                    <Col md={8}>
                      <FormGroup>
                        <Label for="idrole">ประเภทผู้ใช้งาน</Label>
                        <Input type="select" id="idrole" name="idrole">
                          {roleList.map((thisData,index) => {
                            const { id,name} = thisData;
                            return (
                              <option key={index} value={id}>{name}</option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr className="my-3" style={{color: '#aaaaaa', backgroundColor: '#aaaaaa', height: 1, borderColor : '#aaaaaa'}} />

                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="name">ชื่อ-สกุล</Label>
                      <Input type="text" name="name" id="name" placeholder="" value={(this.state.userInfo)?this.state.userInfo.name:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="email">อีเมลล์</Label>
                      <Input type="email" name="email" id="email" placeholder="mymail@email.com" value={(this.state.userInfo)?this.state.userInfo.name:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="home_tel">เบอร์โทรศัพท์ที่ทำงาน</Label>
                      <Input type="text" name="home_tel" id="home_tel" placeholder="" value={(this.state.userInfo)?this.state.userInfo.name:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="mobile_tel">เบอร์โทรศัพท์มือถือ</Label>
                      <Input type="text" name="mobile_tel" id="mobile_tel" placeholder="" value={(this.state.userInfo)?this.state.userInfo.name:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idemployee">รหัสประจำตัวพนักงาน</Label>
                      <Input type="text" name="idemployee" id="idemployee" placeholder="" value={(this.state.userInfo)?this.state.userInfo.name:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr className="my-3" style={{color: '#aaaaaa', backgroundColor: '#aaaaaa', height: 1, borderColor : '#aaaaaa'}} />
                  <h5>ที่อยู่</h5>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idprovince">จังหวัด</Label>
                      <Input id="idprovince" name="idprovince" type="select">
                        {roleList.map((thisData,index) => {
                          const { id,name} = thisData;
                          return (
                            <option key={index} value={id}>{name}</option>
                          );
                        })}
                      </Input>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idamp">อำเภอ</Label>
                      <Input id="idamp" name="idamp" type="select">
                        {roleList.map((thisData,index) => {
                          const { id,name} = thisData;
                          return (
                            <option key={index} value={id}>{name}</option>
                          );
                        })}
                      </Input>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idtum">ตำบล</Label>
                      <Input id="idtum" name="idtum" type="select">
                        {roleList.map((thisData,index) => {
                          const { id,name} = thisData;
                          return (
                            <option key={index} value={id}>{name}</option>
                          );
                        })}
                      </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idvillage">หมู่บ้าน</Label>
                      <Input id="idvillage" name="idvillage" type="select">
                        {roleList.map((thisData,index) => {
                          const { id,name} = thisData;
                          return (
                            <option key={index} value={id}>{name}</option>
                          );
                        })}
                      </Input>
                      </FormGroup>
                    </Col>
                    <Col md={8}>
                    <FormGroup>
                      <Label for="address">เลขที่</Label>
                      <Input type="text" name="address" id="address" placeholder="เลขที่" value={(this.state.userInfo)?this.state.userInfo.username:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr className="my-3" style={{color: '#aaaaaa', backgroundColor: '#aaaaaa', height: 1, borderColor : '#aaaaaa'}} />

                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" name="username" id="username" placeholder="MyUsername" value={(this.state.userInfo)?this.state.userInfo.username:""} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="username">รหัสผ่าน</Label>
                      <Input type="password" name="password" id="password" placeholder="" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="username">ยืนยันรหัสผ่าน</Label>
                      <Input type="password" name="password2" id="password2" placeholder="" />
                      </FormGroup>
                    </Col>
                  </Row>

                    <Button onClick={this.handleSave}>Submit</Button>
                </Form>

              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </>
    );
  }
}

export default UserEdit;
