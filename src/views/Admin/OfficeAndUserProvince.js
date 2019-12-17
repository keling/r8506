import React, { Component } from "react";
import axios from "axios";
import classnames from 'classnames';
// import ReactDOM from "react-dom";
// import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  TabContent,
  TabPane,
  Nav, 
  NavItem, 
  NavLink,
} from "reactstrap";

class OfficeAndUserProvince extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      AuthString:
        "cMhqtcyDfiwnnG9s3ZVfDkxoEcf34tnap4FZzd0zZErAcFo1tRhokPuRkO864DR5",
      Docs: [],
      isLoading: true,
      Users: [],
      UsersIsLoading: true,
      idprovince: (this.props.location.state)?((this.props.location.state.idprovince)?this.props.location.state.idprovince:""):"",
      nameprovince: (this.props.location.state)?((this.props.location.state.nameprovince)?this.props.location.state.nameprovince:""):"",
    };
    // console.log(this.props.location.state);
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
  }

  handleEditUser=(userInfo=null)=> {
    // console.log(userInfo);
    this.props.history.push({
      pathname: `/admin/userEdit`,
      state: {userInfo: userInfo,idprovince:this.state.idprovince,roleLevel:"province"}
    });
  }

  render() {
    const { isLoading, Docs, Users, UsersIsLoading, nameprovince } = this.state;
    return (
      <>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> จังหวัด{nameprovince}
              </CardHeader>
              <CardBody>

                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      อำเภอ
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      ผู้ใช้งาน
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>

                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <h4>รายชื่ออำเภอ</h4>
                        {!isLoading ? (
                          <Table>
                          <thead>
                            <tr style={{backgroundColor:'#7FD9FF'}}>
                              <th>รหัส</th>
                              <th>ชื่ออำเภอ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Docs.map((thisData,index) => {
                              const { id,name} = thisData;
                              // console.log(thisData);
                              return (
                                <tr key={index}>
                                <th scope="row">{id}</th>
                                <td>{name}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                          </Table>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">

                        <Row style={{paddingBottom:"5px"}}>
                          <div className="col-sm-9"><h4>รายชื่อผู้ใช้งาน</h4></div>
                          <div className="col-sm-3 text-right">
                            <Button color="success" onClick={()=>this.handleEditUser()}>เพิ่มผู้ใช้งาน</Button>
                          </div>
                        </Row>
                        {!UsersIsLoading ? (
                          <Table>
                          <thead>
                            <tr style={{backgroundColor:'#7FD9FF'}}>
                              <th>#</th>
                              <th>ชื่อ-สกุล</th>
                              <th>UserName</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {Users.map((thisData,index) => {
                              const { name,username} = thisData;
                              return (
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{name}</td>
                                <td>{username}</td>
                                <td align="right">
                                <Button 
                                    color="warning"
                                    onClick={()=>this.handleEditUser(thisData)}
                                  >
                                  แก้ไข
                                </Button>
                                </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          </Table>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </Col>
                    </Row>
                  </TabPane>

                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </>
    );
  }
}

export default OfficeAndUserProvince;
