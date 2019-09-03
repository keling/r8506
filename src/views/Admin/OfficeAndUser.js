import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
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
} from "reactstrap";

class OfficeAndUser extends Component {
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
      UsersIsLoading: true

    };
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
      .get(`http://203.157.168.91:3000/api/Provinces?filter={"where":{"idstate":"8"}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
console.log(response);        
        this.setState({
          Docs: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });

      axios
      .get(`http://203.157.168.91:3000/api/Userr8506s?filter={"where":{"idrole":"10"}}`, {
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

  handleClickProvince(idprovince,nameprovince) {
    // alert(idprovince+'|'+name);
    this.props.history.push({
      pathname: `/admin/officeUserProv`,
      state: {idprovince: idprovince, nameprovince: nameprovince}
    });
  }

  render() {
    const { isLoading, Docs, Users, UsersIsLoading } = this.state;
    return (
      <>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> เขตสุขภาพที่ 8
              </CardHeader>
              <CardBody>

                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      จังหวัด
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
                        <h4>รายชื่อจังหวัด</h4>
                        {!isLoading ? (
                          <Table>
                          <thead>
                            <tr style={{backgroundColor:'#7FD9FF'}}>
                              <th>รหัส</th>
                              <th>ชื่อจังหวัด</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Docs.map((thisData,index) => {
                              const { idprovince,name} = thisData;
                              return (
                                <tr key={index} onClick={()=>{this.handleClickProvince(idprovince,thisData.name);}}>
                                <th scope="row">{idprovince}</th>
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
                        <h4>รายชื่อผู้ใช้งาน</h4>
                        {!UsersIsLoading ? (
                          <Table>
                          <thead>
                            <tr style={{backgroundColor:'#7FD9FF'}}>
                              <th>#</th>
                              <th>ชื่อ-สกุล</th>
                              <th>UserName</th>
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

export default withRouter(OfficeAndUser);
