import React, { Component } from "react";
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
} from 'reactstrap';

class Reporte0 extends Component {
    constructor() {
        super();
        this.state = {
            AuthString:
                "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
            patients: [],
            isLoading: true
        };
    }

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


            </React.Fragment>
        );
    }
}

export default Reporte0;
