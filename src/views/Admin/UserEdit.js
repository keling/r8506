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
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    // this.handleInputProvinceChange = this.handleInputProvinceChange.bind(this);
    this.state = {
      activeTab: '1',
      AuthString:
        "cMhqtcyDfiwnnG9s3ZVfDkxoEcf34tnap4FZzd0zZErAcFo1tRhokPuRkO864DR5",
      Docs: [],
      isLoading: true,
      Users: [],
      UsersIsLoading: true,
      userInfo:(this.props.location.state)?((this.props.location.state.userInfo)?this.props.location.state.userInfo:
      {
        iduser:"",
        idrole:"",
        name:"",
        email:"",
        homeTel:"",
        mobileTel:"",
        idemployee:"",
        idprovince:"",
        idamp:"",
        idtum:"",
        idvillage:"",
        address:"",
        username:"",
        password:"",
      }
      ):
      {
        iduser:"",
        idrole:"",
        name:"",
        email:"",
        homeTel:"",
        mobileTel:"",
        idemployee:"",
        idprovince:"",
        idamp:"",
        idtum:"",
        idvillage:"",
        address:"",
        username:"",
        password:"",
      },
      roleList: [],
      provinceList: [],
      ampurList: [],
      tambonList: [],
      villageList: [],
      selectedAmpurList: "",
      roleLevel:(this.props.location.state)?this.props.location.state.roleLevel:"",
    //   idprovince: this.props.location.state.idprovince,
    //   nameprovince: this.props.location.state.nameprovince

    };
    // console.log(this.props.location.state);
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
//  console.log(response);        
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

    let roleFilter=""; 
    console.log(this.props.location.state);
    if (this.state.roleLevel=="region") {
      roleFilter=`?filter={"where":{"or":[{"classRegion":"Y"},{"classProvince":"Y"},{"classAmpur":"Y"},{"classUnit":"Y"}]}}`;
    }
    else if (this.state.roleLevel=="province") {
      roleFilter=`?filter={"where":{"or":[{"classProvince":"Y"},{"classAmpur":"Y"},{"classUnit":"Y"}]}}`;
    }    
    axios
      .get(`http://203.157.168.91:3000/api/Roler8506s`+roleFilter, {
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

    axios
      .get(`http://203.157.168.91:3000/api/Provinces?filter={"where":{"idstate":8}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
// console.log(response);        
        this.setState({
          provinceList: response.data,
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }

  handleChange=e=>{
      this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value} });
      // console.log(this.state);
  }

  handleSave=e=>{
// console.log(this.state.userInfo);
console.log(this.state.userInfo.iduser);
    if (this.state.userInfo.iduser) {
      axios
      .put(`http://203.157.168.91:3000/api/Userr8506s/${this.state.userInfo.iduser}`, this.state.userInfo, {
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
    else {
      axios
      .put(`http://203.157.168.91:3000/api/Userr8506s`, this.state.userInfo, {
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
  }

  getAmpur=()=> {
    console.log(this.state.userInfo);
    if (this.state.userInfo.idprovince) {
      axios
      .get(`http://203.157.168.91:3000/api/Amps?filter={"where":{"idprovince":"${this.state.userInfo.idprovince}"}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
        this.setState({
          ampurList: response.data,
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
    }
  }

  getTambon=()=>{
    console.log('getTambon');
    console.log(this.state.userInfo.idamp);
    if (this.state.userInfo.idamp) {
      axios
      .get(`http://203.157.168.91:3000/api/Ta?filter={"where":{"and":[{"idamp":"${this.state.userInfo.idamp}"},{"idprovince":"${this.state.userInfo.idprovince}"}]}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
        this.setState({
          tambonList: response.data,
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
    }
  }

  getVillage=()=>{
    console.log('getVillage');
    console.log(this.state.userInfo.idvillage);
    if (this.state.userInfo.idvillage) {
      axios
      .get(`http://203.157.168.91:3000/api/Villages?filter={"where":{"and":[{"idtum":"${this.state.userInfo.idtum}"},{"idamp":"${this.state.userInfo.idamp}"},{"idprovince":"${this.state.userInfo.idprovince}"}]}}`, {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
        this.setState({
          villageList: response.data,
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
    }
  }

  componentWillMount() {
    this.getData();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.userInfo.idprovince!="" & this.state.userInfo.idprovince!="0" & this.state.ampurList.length==0) {
      this.getAmpur();
    }
    if (this.state.userInfo.idprovince!="" & this.state.userInfo.idamp!="" & this.state.userInfo.idprovince!="0" & this.state.userInfo.idamp!="0" & this.state.tambonList.length==0) {
      this.getTambon();
    }
    if (this.state.userInfo.idprovince!="" & this.state.userInfo.idamp!="" & this.state.userInfo.idtum!="" & this.state.userInfo.idprovince!="0" & this.state.userInfo.idamp!="0" & this.state.userInfo.idtum!="0" & this.state.villageList.length==0) {
      this.getVillage();
    }
  }

  handleInputProvinceChange=e=>{
    // console.log(e.target.value);
    this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value , "idamp":"0" ,"idtum":"0" , "idvillage":"0" } });
    axios
    .get(`http://203.157.168.91:3000/api/Amps?filter={"where":{"idprovince":"${e.target.value}"}}`, {
      headers: { Authorization: this.state.AuthString }
    })
    .then(response => {
      console.log('handleInputProvinceChange');
      this.setState({
        ampurList: response.data,

      });
    })
    .catch(error => {
      console.log("error " + error);
    });
  }

  handleInputAmpurChange=e=>{
    // console.log(e.target.value);
    this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value , "idtum":"0" , "idvillage":"0"} });
    axios
    .get(`http://203.157.168.91:3000/api/Ta?filter={"where":{"and":[{"idamp":"${e.target.value}"},{"idprovince":"${this.state.ampurList[0].idprovince}"}]}}`, {
      headers: { Authorization: this.state.AuthString }
    })
    .then(response => {
      this.setState({
        tambonList: response.data,
      });
    })
    .catch(error => {
      console.log("error " + error);
    });
  }

  handleInputTumbonChange=e=>{
    // console.log(e.target.value);
    this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value , "idvillage":"0"} });
    axios
    .get(`http://203.157.168.91:3000/api/Villages?filter={"where":{"and":[{"idtum":"${e.target.value}"},{"idamp":"${this.state.tambonList[0].idamp}"},{"idprovince":"${this.state.ampurList[0].idprovince}"}]}}`, {
      headers: { Authorization: this.state.AuthString }
    })
    .then(response => {
      this.setState({
        villageList: response.data,
      });
    })
    .catch(error => {
      console.log("error " + error);
    });
  }  

  handleInputVillageChange=e=>{
    this.setState({ userInfo: {...this.state.userInfo, [e.target.id]:e.target.value} });
  }

  render() {
    const { isLoading, Docs, Users, UsersIsLoading, nameprovince, roleList, provinceList, ampurList, tambonList, villageList } = this.state;
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
                  <Input type="hidden" name="user_idprovince" id="user_idprovince" placeholder="" value={(this.state.userInfo)?this.state.userInfo.idprovince:this.props.location.state.idprovince} onChange={this.handleChange} />

                  <Row form>
                    <Col md={8}>
                      <FormGroup>
                        <Label for="idrole">ประเภทผู้ใช้งาน</Label>
                        <Input type="select" id="idrole" name="idrole" 
                          value={(this.state.userInfo)?this.state.userInfo.idrole:""} 
                          onChange={this.handleChange}
                        >
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
                      <Input type="text" name="name" id="name" placeholder="" 
                        value={(this.state.userInfo)?this.state.userInfo.name:""} 
                        onChange={this.handleChange}
                      />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="email">อีเมลล์</Label>
                      <Input type="email" name="email" id="email" placeholder="mymail@email.com" 
                        value={(this.state.userInfo)?this.state.userInfo.email:""} 
                        onChange={this.handleChange} 
                      />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="homeTel">เบอร์โทรศัพท์ที่ทำงาน</Label>
                      <Input type="text" name="homeTel" id="homeTel" placeholder="" 
                        value={(this.state.userInfo)?this.state.userInfo.homeTel:""} 
                        onChange={this.handleChange} 
                      />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="mobileTel">เบอร์โทรศัพท์มือถือ</Label>
                      <Input type="text" name="mobileTel" id="mobileTel" placeholder="" 
                        value={(this.state.userInfo)?this.state.userInfo.mobileTel:""} 
                        onChange={this.handleChange} 
                      />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idemployee">รหัสประจำตัวพนักงาน</Label>
                      <Input type="text" name="idemployee" id="idemployee" placeholder="" 
                        value={(this.state.userInfo)?this.state.userInfo.idemployee:""} 
                        onChange={this.handleChange} 
                      />
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr className="my-3" style={{color: '#aaaaaa', backgroundColor: '#aaaaaa', height: 1, borderColor : '#aaaaaa'}} />
                  <h5>ที่อยู่</h5>
                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idprovince">จังหวัด</Label>
                      <Input id="idprovince" name="idprovince" type="select" 
                        value={(this.state.userInfo)?this.state.userInfo.idprovince:"0"} 
                        onChange={this.handleInputProvinceChange}
                      >
                        <option key="0" value="0">เลือกจังหวัด</option>
                        {provinceList.map((thisData,index) => {
                          const { idprovince,name} = thisData;
                          return (
                            <option key={index} value={idprovince}>{name}</option>
                          );
                        })}
                      </Input>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="idamp">อำเภอ</Label>
                      <Input id="idamp" name="idamp" type="select" 
                        value={(this.state.userInfo)?this.state.userInfo.idamp:"0"} 
                        onChange={this.handleInputAmpurChange}
                      >
                        <option key="0" value="0">เลือกอำเภอ</option>
                        {ampurList.map((thisData,index) => {
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
                      <Input id="idtum" name="idtum" type="select"
                        value={(this.state.userInfo)?this.state.userInfo.idtum:"0"} 
                        onChange={this.handleInputTumbonChange}
                      >
                        <option key="0" value="0">เลือกตำบล</option>
                        {tambonList.map((thisData,index) => {
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
                      <Input id="idvillage" name="idvillage" type="select"
                        value={(this.state.userInfo)?this.state.userInfo.idvillage:"0"} 
                        onChange={this.handleInputVillageChange}
                      >
                        <option key="0" value="0">เลือกหมู่บ้าน</option>
                        {villageList.map((thisData,index) => {
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
                      <Input type="text" name="address" id="address" placeholder="เลขที่" 
                        value={(this.state.userInfo)?this.state.userInfo.address:""} 
                        onChange={this.handleChange} 
                      />
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr className="my-3" style={{color: '#aaaaaa', backgroundColor: '#aaaaaa', height: 1, borderColor : '#aaaaaa'}} />

                  <Row form>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" name="username" id="username" placeholder="MyUsername" 
                        value={(this.state.userInfo)?this.state.userInfo.username:""} 
                        onChange={this.handleChange}
                      />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                      <Label for="username">รหัสผ่าน</Label>
                      <Input type="password" name="password" id="password" placeholder="" 
                        value={(this.state.userInfo)?this.state.userInfo.password:""} 
                        onChange={this.handleChange}
                      />
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
