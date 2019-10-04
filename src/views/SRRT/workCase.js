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
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class workCase extends Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    // this.handleInputProvinceChange = this.handleInputProvinceChange.bind(this);
    this.state = {
      AuthString:
        "cMhqtcyDfiwnnG9s3ZVfDkxoEcf34tnap4FZzd0zZErAcFo1tRhokPuRkO864DR5",
      caseNumber: (this.props.location.state)?this.props.location.state.caseNumber:"",
    //   nameprovince: this.props.location.state.nameprovince

    };
    // console.log(this.props.location.state);
    // console.log(this.state);
  }

//   handleSave=e=>{
// // console.log(this.state.userInfo);
// console.log(this.state.userInfo.iduser);
//     if (this.state.userInfo.iduser) {
//       axios
//       .put(`http://203.157.168.91:3000/api/Userr8506s/${this.state.userInfo.iduser}`, this.state.userInfo, {
//         headers: { Authorization: this.state.AuthString }
//       })
//       .then(response => {
//   // console.log(response);        
//         this.setState({
//           Users: response.data,
//           UsersIsLoading: false
//         });
//       })
//       .catch(error => {
//         console.log("error " + error);
//       });
//     }
//     else {
//       axios
//       .put(`http://203.157.168.91:3000/api/Userr8506s`, this.state.userInfo, {
//         headers: { Authorization: this.state.AuthString }
//       })
//       .then(response => {
//   // console.log(response);        
//         this.setState({
//           Users: response.data,
//           UsersIsLoading: false
//         });
//       })
//       .catch(error => {
//         console.log("error " + error);
//       });
//     }
//   }

  render() {
    const { caseNumber } = this.state;
    return (
      <>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> ส่งรายงานเคส หมายเลข : {caseNumber}
              </CardHeader>
              <CardBody>

              <Alert color="primary">รายงานลงพื้นที่ โรคไข้เด็งกี่</Alert>

              <Alert color="light">
                <h4 className="alert-heading">ข้อมูลทั่วไป</h4>
                <Form inline>

                    <Row form>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="name" className="mr-sm-2">ชื่อ-สกุล</Label>
                        <Input type="text" name="name" id="name" placeholder="" 
                            // value={(this.state.userInfo)?this.state.userInfo.name:""} 
                            // onChange={this.handleChange}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="email" className="mr-sm-2">อีเมลล์</Label>
                        <Input type="email" name="email" id="email" placeholder="mymail@email.com" 
                            // value={(this.state.userInfo)?this.state.userInfo.email:""} 
                            // onChange={this.handleChange} 
                        />
                        </FormGroup>
                    </Row>

                    <Row form>
                        <Col md={4}>
                        <FormGroup>
                        <Label for="homeTel">เบอร์โทรศัพท์ที่ทำงาน</Label>
                        <Input type="text" name="homeTel" id="homeTel" placeholder="" 
                            // value={(this.state.userInfo)?this.state.userInfo.homeTel:""} 
                            // onChange={this.handleChange} 
                        />
                        </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup>
                        <Label for="mobileTel">เบอร์โทรศัพท์มือถือ</Label>
                        <Input type="text" name="mobileTel" id="mobileTel" placeholder="" 
                            // value={(this.state.userInfo)?this.state.userInfo.mobileTel:""} 
                            // onChange={this.handleChange} 
                        />
                        </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup>
                        <Label for="idemployee">รหัสประจำตัวพนักงาน</Label>
                        <Input type="text" name="idemployee" id="idemployee" placeholder="" 
                            // value={(this.state.userInfo)?this.state.userInfo.idemployee:""} 
                            // onChange={this.handleChange} 
                        />
                        </FormGroup>
                        </Col>
                    </Row>
                    <hr className="my-3" style={{color: '#aaaaaa', backgroundColor: '#aaaaaa', height: 1, borderColor : '#aaaaaa'}} />

                  </Form>
                </Alert>

              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </>
    );
  }
}

export default workCase;
