import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import classNames from 'classnames';
import { Alert, Col, FormGroup, Input, Button, Label } from 'reactstrap'
import { ACCESS_TOKEN, URL_API } from '../Settings/Config';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

class Importform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alert: null,
            sexs: [],
            marietals: [],
            races: [],
            races1: [],
            occupats: [],
            diseases: []
        }
        this.onChange = this.onChange.bind(this);
        this.getSex = this.getSex.bind(this);
        this.getMarietal = this.getMarietal.bind(this);
        this.getRace = this.getRace.bind(this);
        this.getRace1 = this.getRace1.bind(this);
        this.getOccupat = this.getOccupat.bind(this);
        this.getDisease = this.getDisease.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillMount() {
        this.getSex();
        this.getMarietal();
        this.getRace();
        this.getRace1();
        this.getOccupat();
        this.getDisease();
    }

    submit(e) {
        if (this.state.patient_name) {
            axios({
                method: "post",
                url: `${URL_API}/Cases`,
                headers: { Authorization: ACCESS_TOKEN },
                data: {
                idcase: "",
                e0: this.state.e0,
                e1: this.state.e1,
                pe0: this.state.pe0,
                pe1: this.state.pe1,
                disease: this.state.disease,
                name: this.state.patient_name,
                hn: this.state.hn,
                nmepat: this.state.nmepat,
                sex: this.state.sex,
                agey: this.state.agey,
                agem: this.state.agem,
                aged: this.state.aged,
                hserv: 41010110,
                icd10: this.state.icd10,
                officeid: 41010110,
                cstatus: 1,
                cimportDate: new Date().toLocaleString(),
                caddrProvince: 41,
                caddrAmp: 1,
                caddrTum: 1,
                caddrVillage: 1,
                chservProvince: 41,
                idmoph: 10671
                }
            });
            // console.log(new Date().toLocaleString());
            this.SuccessAlert();
        } else {
            this.WarningAlert();
        }
    }

    SuccessAlert() {
        const getAlert = () => (
          <SweetAlert 
            success 
            title="Success!"
            onConfirm={() => this.hideAlert()}
          >
            Import done!
          </SweetAlert>
        );
    
        this.setState({
          alert: getAlert()
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
        this.props.history.push('./dashboard');
    }

    WarningAlert() {
        const getAlert = () => (
          <SweetAlert 
            danger
            title="Warning!"
            onConfirm={() => this.hideAlert2()}
          >
            กรุณากรอกข้อมูลให้ครบถ้วนตาม *
          </SweetAlert>
        );
    
        this.setState({
          alert: getAlert()
        });
    }

    hideAlert2() {
        this.setState({
            alert: null
        });
    }

    getSex() {
        axios
        .get(`${URL_API}/Sexes`, {
          headers: { Authorization: ACCESS_TOKEN },
          params: {
            filter: {
              limit: "10"
            }
          }
        })
        .then(res => {
          this.setState({
            sexs: res.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    getMarietal() {
        axios
        .get(`${URL_API}/Marietals`, {
          headers: { Authorization: ACCESS_TOKEN }
        })
        .then(res => {
          this.setState({
            marietals: res.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    getRace() {
        axios
        .get(`${URL_API}/Races`, {
          headers: { Authorization: ACCESS_TOKEN }
        })
        .then(res => {
          this.setState({
            races: res.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    getRace1() {
        axios
        .get(`${URL_API}/Race1s`, {
          headers: { Authorization: ACCESS_TOKEN }
        })
        .then(res => {
          this.setState({
            races1: res.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    getOccupat() {
        axios
        .get(`${URL_API}/Occupations`, {
          headers: { Authorization: ACCESS_TOKEN },
          params: {
            filter: {
                order: "idoccupation ASC"
            }
          }
        })
        .then(res => {
          this.setState({
            occupats: res.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    getDisease() {
        axios
        .get(`${URL_API}/Diseases`, {
          headers: { Authorization: ACCESS_TOKEN },
          params: {
            filter: {
              limit: "10"
            }
          }
        })
        .then(res => {
          this.setState({
            diseases: res.data
          });
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        <i className="icon-note"></i> Import Form
                    </div>
                    <div className="card-body">
                        <FormGroup row>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="e0">E0</Label>
                                    <Input type="text" name="e0" id="e0" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">PE0</Label>
                                    <Input type="text" name="pe0" id="pe0" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="e1">E1</Label>
                                    <Input type="text" name="e1" id="e1" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="pe1">PE1</Label>
                                    <Input type="text" name="pe1" id="pe1" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="success">
                            <i className="fa fa-address-book fa-lg"></i> <strong>ข้อมูลส่วนตัวผู้ป่วย</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="patient_name">ชื่อผู้ป่วย <span className="text-danger">*</span></Label>
                                    <Input type="text" name="patient_name" id="patient_name" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="nmepat">ชื่อผู้ปกครอง</Label>
                                    <Input type="text" name="nmepat" id="nmepat" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">เพศ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md" onChange={e => this.onChange(e)}>
                                        <option value="">กรุณาเลือก</option>
                                        {this.state.sexs.map(sex => {
                                            return (
                                                <option key={sex.idsex} value={sex.idsex}>{sex.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="agey">อายุ (ปี)</Label>
                                    <Input type="text" name="agey" id="agey" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="agem">อายุ (เดือน)</Label>
                                    <Input type="text" name="agem" id="agem" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="aged">อายุ (วัน)</Label>
                                    <Input type="text" name="aged" id="aged" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="marietal">สภาพสมรส</Label>
                                    <Input type="select" name="marietal" id="marietal" bsSize="md" onChange={e => this.onChange(e)}>
                                        <option value="">กรุณาเลือก</option>
                                        {this.state.marietals.map(marietal => {
                                            return (
                                                <option key={marietal.idmarietal} value={marietal.idmarietal}>{marietal.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="race">สัญชาติ</Label>
                                    <Input type="select" name="race" id="race" bsSize="md" onChange={e => this.onChange(e)}>
                                        <option value="">กรุณาเลือก</option>
                                        {this.state.races.map(race => {
                                            return (
                                                <option key={race.idrace} value={race.idrace}>{race.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="race1">ประเภทต่างด้าว</Label>
                                    <Input type="select" name="race1" id="race1" bsSize="md" onChange={e => this.onChange(e)}>
                                        <option value="">กรุณาเลือก</option>
                                        {this.state.races1.map(race => {
                                            return (
                                                <option key={race.idrace1} value={race.idrace1}>{race.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="occupat">อาชีพ</Label>
                                    <Input type="select" name="occupat" id="occupat" bsSize="md" onChange={e => this.onChange(e)}>
                                        <option value="">กรุณาเลือก</option>
                                        {this.state.occupats.map(occupat => {
                                            return (
                                                <option key={occupat.idoccupation} value={occupat.idoccupation}>{occupat.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="sex">ที่อยู่</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">หมู่บ้าน</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ตำบล</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">อำเภอ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">จังหวัด</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">เขตเทศบาล/อบต</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ชั้นเรียน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">โรงเรียน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">หมายเลขบัตรประชาชน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="danger">
                            <i className="fa fa-plus-circle fa-lg"></i> <strong>ข้อมูลเกี่ยวกับโรค</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ชื่อโรค</Label>
                                    <Input type="select" name="disease" id="disease" bsSize="md" onChange={e => this.onChange(e)}>
                                        <option value="">กรุณาเลือก</option>
                                        {this.state.diseases.map(disease => {
                                            return (
                                                <option key={disease.iddisease} value={disease.iddisease}>{disease.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">รหัส HN</Label>
                                    <Input type="text" name="hn" id="hn" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">ประเภทสถานที่รักษา</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ประเภทผู้ป่วย</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="e0">จังหวัดที่สถานที่รักษาตั้งอยู่</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="pe0">ชื่อสถานที่รักษา* (HSERV)</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ผลการรักษา</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ความทันเวลา</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ชนิดของเชื้อ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">โรคแทรกซ้อน</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="e0">จังหวัดที่หน่วยงานที่บันทึกข้อมูลตั้งอยู่</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="pe0">หน่วยงานที่บันทึกข้อมูล* (OFFICEID)</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">วันที่เริ่มป่วย</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่พบผู้ป่วย</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">วันตาย</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่เขียนรายงาน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่รับรายงาน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="success">
                            <i className="fa fa-user-circle-o fa-lg"></i> <strong>ข้อมูลเจ้าของเคส</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="e0">ชื่อผู้นำข้อมูลเข้าสู่ระบบ</Label>
                                    <Input type="text" id="pe0" placeholder="" disabled />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="pe0">จังหวัดที่ตั้งของหน่วยงานเจ้าของเคส</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="e0">หน่วยงานเจ้าของเคส *</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="danger">
                            <i className="fa fa-clipboard fa-lg"></i> <strong>สรุปผลการตรวจสอบ</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">สถานะของเคส</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">รหัส ICD10</Label>
                                    <Input type="text" name="icd10" id="icd10" placeholder="" onChange={e => this.onChange(e)} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">วันที่รับ R506 เข้าสู่ระบบ *</Label>
                                    <Input type="text" id="pe0" placeholder="" disabled />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่เปลี่ยนสถานะของเคส *</Label>
                                    <Input type="text" id="pe0" placeholder="" disabled />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่ได้รับผลการยืนยันจากแพทย์</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </div>
                    <div className="card-footer">
                        <Button type="submit" size="sm" color="primary" onClick={e => this.submit(e)}><i className="fa fa-dot-circle-o"></i> บันทึก</Button>
                    </div>
                </div>
                {this.state.alert}
            </div>
        );
    }
}

export default Importform;
