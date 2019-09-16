import React, { Component, lazy, Suspense } from 'react';
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
    FormGroup,
    Input,
    Label,
    Progress,
    Row,
    Table,
} from 'reactstrap';

export default class DashboardRow extends Component {
    constructor(props) {
        super(props);

        // binding events

        // set current state
        this.state = {
            AuthString:
                "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
            dashboardRow: {}
        }
    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        console.log(this.props);
        let params = {
            where: {
                chservProvince: "41",
                disease: this.props.diseasecode.id,
                cstatus: {
                    between: [1, 2]
                },
                datedefine: {
                    between: ["2019-01-01", "2019-05-31"]
                }
            }
        }
        let getCount = await axios
            .get("http://203.157.168.91:3000/api/Cases/count", {
                headers: { Authorization: this.state.AuthString },
                params
            })
        console.log(getCount);
        // this.setState({
        //     isLoading: false
        // });

        // console.log(getDisease);
        if (getCount.status != 200) {
            return;
        }

        this.setState({
            dashboardRow: getCount.data
        })
    }

    render() {
        return (
            < Row >
                <Col xs="12" sm="12" lg="12">
                    <h5 id="d1">disease</h5>
                </Col>
                <Col xs="6" sm="6" lg="3">
                    <Card id="card1" className="text-white bg-warning">
                        <CardBody className="pb-0">
                            <div>
                                <i className="icon-location-pin"></i> รอตรวจสอบ
                        <span className="text-value pull-right">
                                    {this.state.dashboardRow.count}
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
