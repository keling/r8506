import React, { Component } from "react";
import Select from 'react-select';
import axios from "axios";
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
    FormGroup,
    Label,
    Input

} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('th', th)
class Reporte0 extends Component {
    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

        this.state = {
            AuthString:
                "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
            patients: [],
            isLoading: true,
            startDate: new Date(),
            endDate: new Date(),
            Province: { value: '0', label: 'ทุกจังหวัด' }
        };
    }

    _onChange(valueProv) {
        // console.log(valueProv);
        this.setState({ Province: valueProv });
    }
    handleStartDateChange(dateStart) {
        // console.log(dateStart);
        this.setState({ startDate: dateStart });
    }
    handleEndDateChange(dateEnd) {
        // console.log(dateEnd);
        if (this.state.startDate > dateEnd) {
            alert('เลือกวันที่ สิ้นสุด ใหม่');
        }
        else {
            this.setState({ endDate: dateEnd });
        }
    }
    // handleChange = date => {
    //     this.setState({
    //         startDate: date

    //     });
    // };
    // handleChange = date2 => {
    //     this.setState({
    //         endDate: date2

    //     });
    // };
    // handleChange = province => {
    //     this.setState({
    //         Province: province
    //     });
    //     console.log(province)
    // };

    componentWillMount() {
        this.getData();
    }

    getData() {
        axios
            .get("http://203.157.168.91:3000/api/Reporte0s?filter=%7B%22limit%22%3A20%7D", {
                headers: { Authorization: this.state.AuthString }
            })
            .then(response => {
                console.log(response.data);
                this.setState({
                    patients: response.data,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log("error " + error);
            });
    }
    render() {
        var optionProvince = [
            { value: '0', label: 'ทุกจังหวัด' },
            { value: '38', label: 'บึงกาฬ' },
            { value: '39', label: 'หนองบัวลำภู' },
            { value: '41', label: 'อุดรธานี' },
            { value: '42', label: 'เลย' },
            { value: '43', label: 'หนองคาย' },
            { value: '47', label: 'สกลนคร' },
            { value: '48', label: 'นครพนม' }
        ];

        const { isLoading, patients } = this.state;
        return (

            <React.Fragment>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify" /> รายงาน E0
                </CardHeader>
                            <CardBody>
                                <FormGroup>

                                    <Col xs="12" md="6" lg="4">
                                        {/* <Label>เลือกจังหวัด</Label> */}
                                        <Label>จังหวัด: </Label>
                                        <Select
                                            name="selectProvince"
                                            defaultValue={this.state.Province}
                                            value={this.state.Province}
                                            options={optionProvince}
                                            searchable={false}
                                            onChange={this._onChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup >
                                    <Col xs="12" md="6" lg="4">
                                        <Label>จากวันที่: </Label><br />
                                        <DatePicker className="form-control" name="dateStart"
                                            locale="th"
                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.startDate}
                                            onChange={this.handleStartDateChange}
                                        />
                                    </Col>
                                    <Col xs="12" md="6" lg="4">
                                        <Label>ถึงวันที่: </Label><br />
                                        <DatePicker className="form-control" name="dateEnd"
                                            locale="th"
                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.endDate}
                                            onChange={this.handleEndDateChange}
                                        />
                                        {/* <Col xs="12" md="12">ระหว่างวันที่&nbsp;&nbsp;
                                        <DatePicker className="form-control"
                                            locale="th"
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                        &nbsp;&nbsp;ถึงวันที่&nbsp;&nbsp;
                                        <DatePicker className="form-control"
                                            locale="th"
                                            selected={this.state.endDate}
                                            onChange={this.handleChange}
                                        /> */}
                                        {/* <Input type="date" id="date-input" name="date-input" placeholder="date" /> */}
                                        {/* &nbsp;&nbsp;<Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> ค้นหา</Button>
                                    </Col> */}
                                    </Col>

                                </FormGroup>
                                <Table responsive className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>โรค</th>
                                            <th>ชื่อ - สกุล</th>
                                            <th>ที่อยู่</th>
                                            <th>รหัสพื้นที่</th>
                                            <th>วันเริ่มป่วย</th>
                                            <th>วันรักษา</th>
                                            <th>วันรับรายงาน</th>
                                            <th>สถานบริการ</th>
                                            <th>สถานที่ส่ง</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isLoading ? (
                                            patients.map(patient => {
                                                const { disname, casename, address, addrcode, datesick, datedefine, datereach, officeid, idmoph
                                                } = patient;
                                                return (
                                                    <tr>
                                                        <td>{disname}</td>
                                                        <td>{casename}</td>
                                                        <td>{address}</td>
                                                        <td>{addrcode}</td>
                                                        <td>{datesick}</td>
                                                        <td>{datedefine}</td>
                                                        <td>{datereach}</td>
                                                        <td>{officeid}</td>
                                                        <td>{idmoph}</td>
                                                        {/* <td><Button block color="warning" size="xs" className="btn-pill">Import</Button></td> */}

                                                    </tr>
                                                );
                                            })
                                        ) : (
                                                <p>Loading...</p>
                                            )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </React.Fragment >
        );
    }
}

export default Reporte0;
