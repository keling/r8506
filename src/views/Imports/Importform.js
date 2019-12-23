import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import classNames from 'classnames';
import { Alert, Col, FormGroup, Input, Button, Label } from 'reactstrap'
import { ACCESS_TOKEN, URL_API } from '../Settings/Config';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from 'react-select'

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
            diseases: [],
            provinces: [],
            amphurs: [],
            tambols: [],
            villages: [],
            metropols: [],
            hospitals: [],
            patient_types: [],
            cstatuss: [],
            //patient_name: '', hn: '', nmepat: '', sex: ''
        }
        this.onChange = this.onChange.bind(this);
        this.getSex = this.getSex.bind(this);
        this.getMarietal = this.getMarietal.bind(this);
        this.getRace = this.getRace.bind(this);
        this.getRace1 = this.getRace1.bind(this);
        this.getOccupat = this.getOccupat.bind(this);
        this.getDisease = this.getDisease.bind(this);
        this.getProvince = this.getProvince.bind(this);
        // this.getMetropol = this.getMetropol.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        const token = localStorage.usertoken
        if (token) {
            if (this.props.location.state) {
                this.getDataEdit();
            }
            this.getSex();
            this.getMarietal();
            this.getRace();
            this.getRace1();
            this.getOccupat();
            this.getDisease();
            this.getProvince();
            this.getMetropol();
            this.getPatientType();
            this.getHospital();
            this.getCStatus();
        } else {
            this.props.history.push('/login');
        }
    }

    // Get Edit
    getDataEdit() {
        // console.log(this.props.location.state.idcase)
        axios
        .get(`${URL_API}/Cases/` + this.props.location.state.idcase, {
            headers: { Authorization: ACCESS_TOKEN }
        })
        .then(res => {
            this.setState({
                e0: res.data.e0,
                e1: res.data.e1,
                pe0: res.data.pe0,
                pe1: res.data.pe1,
                disease: res.data.disease,
                patient_name: res.data.name,
                hn: res.data.hn,
                nmepat: res.data.nmepat,
                sex: res.data.sex,
                agey: res.data.agey,
                agem: res.data.agem,
                aged: res.data.aged,
                marietal: res.data.marietal,
                race: res.data.race,
                race1: res.data.race1,
                occupat: res.data.occupat,
                address: res.data.address,
                metropol: res.data.metropol,
                hospital: res.data.hospital,
                patient_type: res.data.type,

                hserv: 41010110,
                classroom: res.data.class,
                school: res.data.school,
                cid: res.data.idcard,
                icd10: res.data.icd10,
                officeid: 41010110,
                cstatus: res.data.cstatus,
                province: res.data.caddrProvince,
                amphur: res.data.caddrAmp,
                tambol: res.data.caddrTum,
                village: res.data.caddrVillage,
                chservProvince: 41,
                idmoph: 10671,
                isLoading: false
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    submit(e) {
        if (this.state.patient_name) {
            if (this.props.location.state) {
                // Edit Case
                axios({
                    method: "post",
                    url: `${URL_API}/Cases/update`,
                    headers: { Authorization: ACCESS_TOKEN },
                    params: {
                        where : {idcase: this.props.location.state.idcase}
                    },
                    data: {
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
                        marietal: this.state.marietal,
                        race: this.state.race,
                        race1: this.state.race1,
                        occupat: this.state.occupat,
                        address: this.state.address,
                        metropol: this.state.metropol,
                        hospital: this.state.hospital,
                        type: this.state.patient_type,
                        
                        hserv: 41010110,
                        class: this.state.classroom,
                        school: this.state.school,
                        idcard: this.state.cid,
                        icd10: this.state.icd10,
                        officeid: 41010110,
                        cstatus: 1,
                        caddrProvince: this.state.province,
                        caddrAmp: this.state.amphur,
                        caddrTum: this.state.tambol,
                        caddrVillage: this.state.village,
                        chservProvince: 41,
                        idmoph: 10671
                    }
                })
                .then(res => {
                    this.SuccessAlert();
                })
                .catch(error => {
                    console.log("error " + error);
                });
            } else {
                // New Case
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
                        marietal: this.state.marietal,
                        race: this.state.race,
                        race1: this.state.race1,
                        occupat: this.state.occupat,
                        address: this.state.address,
                        metropol: this.state.metropol,
                        hospital: this.state.hospital,
                        type: this.state.patient_type,
                        
                        hserv: 41010110,
                        class: this.state.classroom,
                        school: this.state.school,
                        idcard: this.state.cid,
                        icd10: this.state.icd10,
                        officeid: 41010110,
                        cstatus: 1,
                        cimportDate: new Date().toLocaleString(),
                        caddrProvince: this.state.province,
                        caddrAmp: this.state.amphur,
                        caddrTum: this.state.tambol,
                        caddrVillage: this.state.village,
                        chservProvince: 41,
                        idmoph: 10671
                    }
                });
                // console.log(new Date().toLocaleString());
                this.SuccessAlert();
            }
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
        this.props.history.push('/caselist');
    }

    WarningAlert() {
        const getAlert = () => (
          <SweetAlert 
            danger
            title="Warning!"
            onConfirm={() => this.hideAlert2()}
          >
            กรุณากรอกข้อมูลให้ครบถ้วน
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
                order: "name ASC"
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
          headers: { Authorization: ACCESS_TOKEN }
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

    getProvince() {
        axios
        .get(`${URL_API}/Provinces`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    order: "name ASC"
                }
            }
        })
        .then(res => {

            this.setState({
                provinces: res.data
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    onChangeProvince(e) {
        this.setState({[e.target.name]: e.target.value})
        this.getAmphur(e.target.value)
    }

    getAmphur(province_id) {
        axios
        .get(`${URL_API}/Amps`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    where: {"idprovince": province_id},
                    order: "id ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                amphurs: res.data
            });
            // console.log(this.state.amphurs)
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    onChangeAmphur(e) {
        this.setState({[e.target.name]: e.target.value})
        this.getTambol(e.target.value)
    }

    getTambol(amphur_id) {
        axios
        .get(`${URL_API}/Ta`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    where: {"idprovince": this.state.province, "idamp": amphur_id},
                    order: "id ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                tambols: res.data
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    onChangeTambol(e) {
        this.setState({[e.target.name]: e.target.value})
        this.getVillage(e.target.value)
    }

    getVillage(tambol_id) {
        axios
        .get(`${URL_API}/Villages`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    where: {"idprovince": this.state.province, "idamp": this.state.amphur, "idtum": tambol_id},
                    order: "id ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                villages: res.data
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    getMetropol() {
        axios
        .get(`${URL_API}/Metropols`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    order: "idmetropol ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                metropols: res.data
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    getPatientType() {
        axios
        .get(`${URL_API}/Types`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    order: "idtype ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                patient_types: res.data
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    getHospital() {
        axios
        .get(`${URL_API}/Hospitals`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    order: "idhospital ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                hospitals: res.data
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    getCStatus() {
        axios
        .get(`${URL_API}/CaseStatuses`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    order: "idcaseStatus ASC"
                }
            }
        })
        .then(res => {
            this.setState({
                cstatuss: res.data
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
                                    <Input type="text" name="e0" id="e0" placeholder="" onChange={e => this.onChange(e)} value={this.state.e0} />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">PE0</Label>
                                    <Input type="text" name="pe0" id="pe0" placeholder="" onChange={e => this.onChange(e)} value={this.state.pe0} />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="e1">E1</Label>
                                    <Input type="text" name="e1" id="e1" placeholder="" onChange={e => this.onChange(e)} value={this.state.e1} />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="pe1">PE1</Label>
                                    <Input type="text" name="pe1" id="pe1" placeholder="" onChange={e => this.onChange(e)} value={this.state.pe1} />
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
                                    <Input type="text" name="patient_name" id="patient_name" placeholder="" onChange={e => this.onChange(e)} value={this.state.patient_name} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="nmepat">ชื่อผู้ปกครอง</Label>
                                    <Input type="text" name="nmepat" id="nmepat" placeholder="" onChange={e => this.onChange(e)} value={this.state.nmepat} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">เพศ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md" onChange={e => this.onChange(e)} value={this.state.sex}>
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
                                    <Input type="text" name="agey" id="agey" placeholder="" onChange={e => this.onChange(e)} value={this.state.agey} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="agem">อายุ (เดือน)</Label>
                                    <Input type="text" name="agem" id="agem" placeholder="" onChange={e => this.onChange(e)} value={this.state.agem} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="aged">อายุ (วัน)</Label>
                                    <Input type="text" name="aged" id="aged" placeholder="" onChange={e => this.onChange(e)} value={this.state.aged} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="marietal">สภาพสมรส</Label>
                                    <Input type="select" name="marietal" id="marietal" bsSize="md" onChange={e => this.onChange(e)} value={this.state.marietal}>
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
                                    <Input type="select" name="race" id="race" bsSize="md" onChange={e => this.onChange(e)} value={this.state.race}>
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
                                    <Input type="select" name="race1" id="race1" bsSize="md" onChange={e => this.onChange(e)} value={this.state.race1}>
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
                                    <Input type="select" name="occupat" id="occupat" bsSize="md" onChange={e => this.onChange(e)} value={this.state.occupat}>
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
                                    <Label htmlFor="address">ที่อยู่</Label>
                                    <Input type="text" name="address" id="address" placeholder="" onChange={e => this.onChange(e)} value={this.state.address} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                <Label htmlFor="province">จังหวัด</Label>
                                    <Input type="select" name="province" id="province" bsSize="md" onChange={e => this.onChangeProvince(e)} value={this.state.province}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.provinces.map(province => {
                                            return (
                                                <option key={province.idprovince} value={province.idprovince}>{province.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                <Label htmlFor="amphur">อำเภอ</Label>
                                    <Input type="select" name="amphur" id="amphur" bsSize="md" onChange={e => this.onChangeAmphur(e)} value={this.state.amphur}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.amphurs.map(amphur => {
                                            return (
                                                <option key={amphur.id} value={amphur.id}>{amphur.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="tambol">ตำบล</Label>
                                    <Input type="select" name="tambol" id="tambol" bsSize="md" onChange={e => this.onChangeTambol(e)} value={this.state.tambol}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.tambols.map(tambol => {
                                            return (
                                                <option key={tambol.id} value={tambol.id}>{tambol.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="village">หมู่บ้าน</Label>
                                    <Input type="select" name="village" id="village" bsSize="md" onChange={e => this.onChange(e)} value={this.state.village}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.villages.map(village => {
                                            return (
                                                <option key={village.id} value={village.id}>{village.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="metropol">เขตเทศบาล/อบต</Label>
                                    <Input type="select" name="metropol" id="metropol" bsSize="md" onChange={e => this.onChange(e)} value={this.state.metropol}>
                                    <option value="0">กรุณาเลือก</option>
                                        {this.state.metropols.map(metropol => {
                                            return (
                                                <option key={metropol.idmetropol} value={metropol.idmetropol}>{metropol.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="classroom">ชั้นเรียน</Label>
                                    <Input type="text" name="classroom" id="classroom" placeholder="" onChange={e => this.onChange(e)} value={this.state.classroom} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="school">โรงเรียน</Label>
                                    <Input type="text" name="school" id="school" placeholder="" onChange={e => this.onChange(e)} value={this.state.school} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="cid">หมายเลขบัตรประชาชน</Label>
                                    <Input type="text" name="cid" id="cid" placeholder="" onChange={e => this.onChange(e)} value={this.state.cid} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="danger">
                            <i className="fa fa-plus-circle fa-lg"></i> <strong>ข้อมูลเกี่ยวกับโรค</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="disease">ชื่อโรค</Label>
                                    <Input type="select" name="disease" id="disease" bsSize="md" onChange={e => this.onChange(e)} value={this.state.disease}>
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
                                    <Input type="text" name="hn" id="hn" placeholder="" onChange={e => this.onChange(e)} value={this.state.hn} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="hospital">ประเภทสถานที่รักษา</Label>
                                    <Input type="select" name="hospital" id="hospital" bsSize="md" onChange={e => this.onChange(e)} value={this.state.hospital}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.hospitals.map(hospital => {
                                            return (
                                                <option key={hospital.idhospital} value={hospital.idhospital}>{hospital.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="patient_type">ประเภทผู้ป่วย</Label>
                                    <Input type="select" name="patient_type" id="patient_type" bsSize="md" onChange={e => this.onChange(e)} value={this.state.patient_type}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.patient_types.map(patient_type => {
                                            return (
                                                <option key={patient_type.idtype} value={patient_type.idtype}>{patient_type.name}</option>
                                            );
                                        })}
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
                                    <Label htmlFor="cstatus">สถานะของเคส</Label>
                                    <Input type="select" name="cstatus" id="cstatus" bsSize="md" onChange={e => this.onChange(e)} value={this.state.cstatus}>
                                        <option value="0">กรุณาเลือก</option>
                                        {this.state.cstatuss.map(cstatus => {
                                            return (
                                                <option key={cstatus.idcaseStatus} value={cstatus.idcaseStatus}>{cstatus.name}</option>
                                            );
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">รหัส ICD10</Label>
                                    <Input type="text" name="icd10" id="icd10" placeholder="" onChange={e => this.onChange(e)} value={this.state.icd10} />
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
