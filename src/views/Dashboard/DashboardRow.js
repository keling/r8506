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
} from 'reactstrap'

import {
    ACCESS_TOKEN,
    URL_API
} from './DashboardSettings'

export default class DashboardRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        // this.getData()
    }

    async getData() {
        // console.log(this.props);
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
            data: axiosObject.data
        })
    }

    render() {
        return (
            <Row>
                <Col xs="12" sm="12" lg="12">
                    <h5 id="d1">disease</h5>
                </Col>
                <Col xs="6" sm="6" lg="3">
                    <Card id="card1" className="text-white bg-warning">
                        <CardBody className="pb-0">
                            <div>
                                <i className="icon-location-pin"></i> รอตรวจสอบ
                                <span className="text-value pull-right">
                                    {this.state.data.count}
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
                            <div><i className="icon-location-pin"></i> รอ รพ. สรุปผล<span className="text-value pull-right">asdsasda</span></div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                            {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                        </div>
                    </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                    <Card id="card2" className="text-white bg-info">
                        <CardBody className="pb-0">
                            <div><i className="icon-location-pin"></i> ผู้ป่วยทั้งหมด<span className="text-value pull-right">sfsfsad</span></div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                            {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                        </div>
                    </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                    <Card id="card2" className="text-white bg-danger">
                        <CardBody className="pb-0">
                            <div><i className="icon-location-pin"></i> ไม่พบ<span className="text-value pull-right">ccc</span></div>
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
