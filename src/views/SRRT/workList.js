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

class workList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    // this.handleInputProvinceChange = this.handleInputProvinceChange.bind(this);
    this.state = {
      AuthString:
        "cMhqtcyDfiwnnG9s3ZVfDkxoEcf34tnap4FZzd0zZErAcFo1tRhokPuRkO864DR5",
      caseNumber:"",
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

  handleWorkCase=(caseNumber=null)=> {
    this.props.history.push({
      pathname: `/SRRT/workCase`,
      state: {caseNumber: caseNumber}
    });
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

                <Alert color="warning" style={{margin:"0px",marginBottom:"20px",padding:"0px",paddingTop:"20px",paddingBottom:"20px"}}>
                  <Row style={{margin:"0px",padding:"0px"}}>
                    <Col>
                      <Col xs="12"><b>หมายเลขเคส</b> 95232</Col>
                      <Col xs="12"><b>โรค</b> ไข้เด็งกี่</Col>
                      <Col xs="12"><b>ชื่อผู้ป่วย</b> สมชาย ชาติไทย</Col>
                      <Col xs="12"><b>ที่อยู่</b> 555 ม.5 ต.ในเมือง อ.เมือง จ.สกลนคร</Col>
                      <Col xs="12"><b>วันที่สั่งงาน</b> 12/12/2562</Col>
                    </Col>
                    <Col xs="auto">
                      <div style={{textAlign:"center"}}></div>
                      <Button 
                        color="warning" 
                        style={{height:"100%",width:"150px"}}
                        onClick={()=>this.handleWorkCase('316565')}
                      >
                        ดำเนินการต่อ
                      </Button>
                    </Col>
                    <Col xs="12" style={{marginLeft:"15px",color:"red"}}>
                      <b>รับทราบเคสแล้ว </b>**ถูกบันทึกตำแหน่ง GPS และเริ่มต้นการจับเวลาในการลงพื้นที่แล้ว**
                    </Col>
                  </Row>
                </Alert>

                <Alert color="primary" style={{margin:"0px",marginBottom:"20px",padding:"0px",paddingTop:"20px",paddingBottom:"20px"}}>
                  <Row style={{margin:"0px",padding:"0px"}}>
                    <Col>
                      <Col xs="12"><b>หมายเลขเคส</b> 95232</Col>
                      <Col xs="12"><b>โรค</b> ไข้เด็งกี่</Col>
                      <Col xs="12"><b>ชื่อผู้ป่วย</b> สมชาย ชาติไทย</Col>
                      <Col xs="12"><b>ที่อยู่</b> 555 ม.5 ต.ในเมือง อ.เมือง จ.สกลนคร</Col>
                      <Col xs="12"><b>วันที่สั่งงาน</b> 12/12/2562</Col>
                    </Col>
                    <Col xs="auto">
                      <Button color="primary" style={{height:"100%",width:"150px"}}>รับทราบเคส</Button>
                    </Col>
                  </Row>
                </Alert>

                <Alert color="primary" style={{margin:"0px",marginBottom:"20px",padding:"0px",paddingTop:"20px",paddingBottom:"20px"}}>
                  <Row style={{margin:"0px",padding:"0px"}}>
                    <Col>
                      <Col xs="12"><b>หมายเลขเคส</b> 95232</Col>
                      <Col xs="12"><b>โรค</b> ไข้เด็งกี่</Col>
                      <Col xs="12"><b>ชื่อผู้ป่วย</b> สมชาย ชาติไทย</Col>
                      <Col xs="12"><b>ที่อยู่</b> 555 ม.5 ต.ในเมือง อ.เมือง จ.สกลนคร</Col>
                      <Col xs="12"><b>วันที่สั่งงาน</b> 12/12/2562</Col>
                    </Col>
                    <Col xs="auto">
                      <Button color="primary" style={{height:"100%",width:"150px"}}>รับทราบเคส</Button>
                    </Col>
                  </Row>
                </Alert>

              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </>
    );
  }
}

export default workList;
