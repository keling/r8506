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
import {
    ACCESS_TOKEN,
    URL_API
} from './E0Settings';
import E0Form, { PROVINCE_OPTIONS } from './E0Form/E0Form';
import { tsPropertySignature } from "@babel/types";
import E0Tables from './E0Table';
import LoadingText from "../../Dashboard/LoadingText";

export default class E0 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isError: ``,
            isLoading: true,

            diseases: [],
            datas: [],

            E0ResultParams: {
                dateStart: new Date(),
                dateEnd: new Date(),
                selectedProvince: PROVINCE_OPTIONS[0],
                datas: []
                //diseases: []
            }
        };
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        let getE0Result = await axios.get(`${URL_API}/Reporte0s`, {
            headers: {
                Authorization: ACCESS_TOKEN
            },
            where: {
                DATEDEFINE: {
                    between: ['2019-09-01', '2019-12-31']
                }
            }
        })

        this.setState({
            isLoading: false
        })

        if (getE0Result.isAxiosError || getE0Result.status != 200) {
            console.error(`API Error`, getE0Result.response)
            return
        }

        let E0ResultParams = this.state.E0ResultParams
        E0ResultParams[`diseases`] = getE0Result.data
        E0ResultParams[`datas`] = getE0Result.data

        this.setState({
            diseases: getE0Result.data,
            datas: getE0Result.data,
            E0ResultParams
        })
    }

    handleE0FormSubmit(params) {
        this.setState({
            E0ResultParams: {
                dateStart: params.dateStart,
                dateEnd: params.dateEnd,
                selectedProvince: params.selectedProvince
                //diseases: this.state.diseases
            }
        })
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" lg="12">
                        <h3><strong>รายงาน E0</strong></h3>
                        <h4>ระบบเผ้าระวังทางระบาดวิทยา เขตสุขภาพที่ 8</h4>
                    </Col>
                </Row>
                <E0Form onSubmit={this.handleE0FormSubmit} />
                <Row>
                    <Col xs="12" md="12" lg="12">
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Card xs='12' md='12' lg='12'>
                        <CardBody>
                            <Table responsive hover>
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
                                    {
                                        this.state.isLoading ?
                                            //<Loading /> :
                                            <Col>Loading ...</Col> :
                                            // <DashboardResult params={this.state.dashboardResultParams} timestamp={new Date()} />
                                            // <E0Tables params={this.state.E0ResultParams.datas} />
                                            this.state.E0ResultParams.datas.map(datax => {
                                                const { disname, casename, address, addrcode, datesick, datedefine, datereach, officeid, idmoph } = datax;
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
                                                </tr>
                                            }
                                            )
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Row>
            </div >
        );
    }
}
