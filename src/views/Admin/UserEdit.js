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
  FormText
} from "reactstrap";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      AuthString:
        "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
      Docs: [],
      isLoading: true,
      Users: [],
      UsersIsLoading: true,
      userInfo:this.props.location.state.userInfo||{name:"",username:"",idprovince:""},

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
    // this.getData();
  }

  getData() {
    axios
      .get(`http://203.157.168.91:3000/api/Amps?filter={"where":{"idprovince":"${this.state.idprovince}"}}`, {
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
      .get(`http://203.157.168.91:3000/api/Userr8506s?filter={"where":{"and":[{"idrole":"11"},{"idprovince":"${this.state.idprovince}"}]}}`, {
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

  handleChange=e=>{
      this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value} });
  }

  handleSave=e=>{
      console.log(this.state.userInfo);
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
    const { isLoading, Docs, Users, UsersIsLoading, nameprovince } = this.state;
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

                    <FormGroup>
                    <Label for="idprovince">รหัสจังหวัด</Label>
                    <Input type="text" name="idprovince" id="idprovince" placeholder="รหัสจังหวัด" value={(this.state.userInfo)?this.state.userInfo.idprovince:this.props.location.state.idprovince} onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                    <Label for="name">ชื่อ-สกุล</Label>
                    <Input type="text" name="name" id="name" placeholder="ชื่อ-สกุล" value={(this.state.userInfo)?this.state.userInfo.name:""} onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="ชื่อล็อคอิน" value={(this.state.userInfo)?this.state.userInfo.username:""} onChange={this.handleChange} />
                    </FormGroup>

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
