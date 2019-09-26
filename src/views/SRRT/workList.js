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

class workList extends Component {
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
                <i className="fa fa-align-justify" /> งานที่ได้รับมอบหมาย{nameprovince}
              </CardHeader>
              <CardBody>

                <Row>
                  งาน #001
                </Row>

                <Row>
                  งาน #002
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </>
    );
  }
}

export default workList;
