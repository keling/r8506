import React, { Component, lazy, Suspense } from 'react'

import axios from 'axios'
import Select from 'react-select'
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
    FormGroup,
    Input,
    Label,
    Progress,
    Row,
    Table,

} from 'reactstrap';

import {
    ACCESS_TOKEN,
    URL_API
} from './DashboardSettings'
import DashboardCardIn from "./DashboardCardIn";

export default class DashboardRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dashboardRowIn: {},
            dashboardRowWait: {},
            dashboardRowSick: {},
            dashboardRowIncorrect: {}
        }
    }

    componentWillMount() {
        this.getDataIn();
        this.getDataWait();
        this.getDataSick();
        this.getDataIncorrect();
    }

    async getDataIn() {
        console.log(this.props);
        let params = {
            where: {
                chservProvince: `41`,
                disease: this.props.diseasecode.id,
                cstatus: {
                    between: [1, 2]
                },
                datedefine: {
                    between: [
                        `2019-01-01`,
                        `2019-05-31`
                    ]
                }
            }
        }

        let axiosObject = await axios.get(`${URL_API}/Cases/count`, {
            headers: { Authorization: ACCESS_TOKEN },
            params
        })

        // this.setState({
        //     isLoading: false
        // });

        // console.log(axiosObject);
        if (axiosObject.status != 200) {
            return;
        }

        this.setState({
            dashboardRowIn: axiosObject.data
        })
    }

    async getDataWait() {
        let params = {
            where: {
                chservProvince: "41",
                disease: this.props.diseasecode.id,
                cstatus: "3",
                datedefine: {
                    between: ["2019-01-01", "2019-08-31"]
                }
            }
        }
        let axiosObject = await axios
            .get(`${URL_API}/Cases/count`, {
                headers: { Authorization: ACCESS_TOKEN },
                params
            })
        // console.log(axiosObject);

        if (axiosObject.status != 200) {
            return;
        }

        this.setState({
            dashboardRowWait: axiosObject.data
        })
    }

    async getDataSick() {
        let params = {
            where: {
                chservProvince: "41",
                disease: this.props.diseasecode.id,
                cstatus: "4",
                datedefine: {
                    between: ["2019-01-01", "2019-08-31"]
                }
            }
        }
        let axiosObject = await axios
            .get(`${URL_API}/Cases/count`, {
                headers: { Authorization: ACCESS_TOKEN },
                params
            })
        console.log(axiosObject);

        if (axiosObject.status != 200) {
            return;
        }

        this.setState({
            dashboardRowSick: axiosObject.data
        })
    }

    async getDataIncorrect() {
        let params = {
            where: {
                chservProvince: "41",
                disease: this.props.diseasecode.id,
                cstatus: {
                    nin: [1, 2, 3, 4]
                },
                datedefine: {
                    between: ["2019-01-01", "2019-08-31"]
                }
            }
        }
        let axiosObject = await axios
            .get(`${URL_API}/Cases/count`, {
                headers: { Authorization: ACCESS_TOKEN },
                params
            })
        console.log(axiosObject);

        if (axiosObject.status != 200) {
            return;
        }

        this.setState({
            dashboardRowIncorrect: axiosObject.data
        })
    }

    render() {
        return (
            <Row>
                <Col xs="12" sm="12" lg="12">
                    <h5 id="d1">{this.props.diseasecode.diseasename}</h5>
                </Col>
                <Col xs="6" sm="6" lg="3">
                    <Card id="card1" className="text-white bg-warning">
                        <CardBody className="pb-0">
                            <div>
                                <i className="icon-location-pin"></i> รอตรวจสอบ<span className="text-value pull-right">
                                    {
                                        this.state.dashboardRowIn.count != undefined ?
                                            this.state.dashboardRowIn.count :
                                            <i className="fa fa-spinner fa-spin fa-fw"></i>
                                    }
                                </span>
                            </div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                            {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                        </div>
                    </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                    <Card id="card2" className="text-white bg-success">
                        <CardBody className="pb-0">
                            <div><i className="icon-location-pin"></i> รอ รพ. สรุปผล<span className="text-value pull-right">
                                {
                                    this.state.dashboardRowWait.count != undefined ?
                                        this.state.dashboardRowWait.count :
                                        <i className="fa fa-spinner fa-spin fa-fw"></i>
                                }
                            </span></div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                            {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                        </div>
                    </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                    <Card id="card2" className="text-white bg-info">
                        <CardBody className="pb-0">
                            <div><i className="icon-location-pin"></i> ผู้ป่วยทั้งหมด<span className="text-value pull-right">
                                {
                                    this.state.dashboardRowSick.count != undefined ?
                                        this.state.dashboardRowSick.count :
                                        <i className="fa fa-spinner fa-spin fa-fw"></i>
                                }
                            </span></div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                            {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                        </div>
                    </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                    <Card id="card2" className="text-white bg-danger">
                        <CardBody className="pb-0">
                            <div><i className="icon-location-pin"></i> ไม่พบ<span className="text-value pull-right">
                                {
                                    this.state.dashboardRowIncorrect.count != undefined ?
                                        this.state.dashboardRowIncorrect.count :
                                        <i className="fa fa-spinner fa-spin fa-fw"></i>
                                }
                            </span></div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                            {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }
}
