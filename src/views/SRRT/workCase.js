import React, { Component } from "react";
// import axios from "axios";
// import ReactDOM from "react-dom";
// import classnames from 'classnames';
import {
  Row,
  Col,
  // Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  // ListGroupItemText,
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

                <Form>
                  <ListGroup style={{marginBottom:"20px"}}>
                    <ListGroupItem active>
                      <ListGroupItemHeading>ข้อมูลทั่วไป</ListGroupItemHeading>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="name">ชื่อ-สกุล</Label>
                          <Input type="text" name="name" id="name" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                          <Label for="cid">เลขประจำตัวประชาชน</Label>
                          <Input type="text" name="cid" id="cid" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={1}>
                          <FormGroup>
                          <Label for="sex">เพศ</Label>
                          <Input type="text" name="sex" id="sex" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={1}>
                          <FormGroup>
                          <Label for="age">อายุ</Label>
                          <Input type="text" name="age" id="age" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                          <Label for="illDate">วันเริ่มป่วย</Label>
                          <Input type="date" name="illDate" id="illDate" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                  
                  <ListGroup style={{marginBottom:"20px"}}>
                    <ListGroupItem active>
                      <ListGroupItemHeading>ที่อยู่ขณะป่วย</ListGroupItemHeading>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="house">บ้านเลขที่</Label>
                          <Input type="text" name="house" id="house" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="village">หมู่</Label>
                          <Input type="select" name="village" id="village" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="tambon">ตำบล</Label>
                          <Input type="select" name="tambon" id="tambon" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="ampur">อำเภอ</Label>
                          <Input type="select" name="ampur" id="ampur" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="province">จังหวัด</Label>
                          <Input type="select" name="province" id="province" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="localArea">ท้องที่</Label>
                          <Input type="select" name="localArea" id="localArea" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>

                  <ListGroup style={{marginBottom:"20px"}}>
                    <ListGroupItem active>
                      <ListGroupItemHeading>ลงพื้นที่</ListGroupItemHeading>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="approachDate">วันที่ลงพื้นที่</Label>
                          <Input type="date" name="approachDate" id="approachDate" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                          <Label for="approachTime">เวลาที่ลงพื้นที่</Label>
                          <Input type="time" name="approachTime" id="approachTime" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                          <Label for="findPatient">พบผู้ป่วยหรือไม่</Label>
                          <Input type="select" name="findPatient" id="findPatient" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="nextApproach">ต้องลงพื้นที่ครั้งต่อไปหรือไม่</Label>
                          <Input type="select" name="nextApproach" id="nextApproach" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>

                  <ListGroup style={{marginBottom:"20px"}}>
                    <ListGroupItem active>
                      <ListGroupItemHeading>สำรวจ</ListGroupItemHeading>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="approachNumber">ครั้งที่ลงพื้นที่</Label>
                          <Input type="select" name="approachNumber" id="approachNumber" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="ciPatientHome">บ้านผู้ป่วย CI%</Label>
                          <Input type="number" step="0.01" name="ciPatientHome" id="ciPatientHome" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                      <Col md={4}>
                          <FormGroup>
                          <Label for="ciPatientHomeAround100">รอบบ้านบ้านผู้ป่วยรัศมี100เมตร CI%</Label>
                          <Input type="number" step="0.01" name="ciPatientHomeAround100" id="ciPatientHomeAround100" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="hiPatientHomeAround100">รอบบ้านบ้านผู้ป่วยรัศมี100เมตร HI%</Label>
                          <Input type="number" step="0.01" name="hiPatientHomeAround100" id="hiPatientHomeAround100" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="biPatientHomeAround100">รอบบ้านบ้านผู้ป่วยรัศมี100เมตร BI%</Label>
                          <Input type="number" step="0.01" name="biPatientHomeAround100" id="biPatientHomeAround100" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="ciPatientSchool">ในโรงเรียนที่ผู้เป่วยเรียน CI%</Label>
                          <Input type="number" step="0.01" name="ciPatientSchool" id="ciPatientSchool" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="ciPatientTemple">ในวัด/ศูนย์เด็กเล็ก CI%</Label>
                          <Input type="number" step="0.01" name="ciPatientTemple" id="ciPatientTemple" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="ciOther">แหล่งเพราะพันธุ์ยุงลายอื่นๆ CI%</Label>
                          <Input type="number" step="0.01" name="ciOther" id="ciOther" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="surveyActivity">กิจกรรม</Label>
                          <Input type="select" name="surveyActivity" id="surveyActivity" placeholder="" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>

                </Form>

              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </>
    );
  }
}

export default workCase;
