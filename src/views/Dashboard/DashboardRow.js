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
import Moment from 'moment'

import {
    ACCESS_TOKEN,
    URL_API
} from './DashboardSettings'
import DashboardCardIn from './DashboardCardIn';
import LoadingText from './LoadingText'

// functions
function formatDate(incomingDate) {
    var numsDate = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    var makeDate = incomingDate.getFullYear() + "-" + numsDate[incomingDate.getMonth() + 1] + "-" + numsDate[incomingDate.getDate()];
    // console.log(makeDate);
    return makeDate;
}

// console.info('this is moment', Moment, Moment(new Date()).format('YYYY-MM-DD'))

export default class DashboardRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dashboardRowIn: {},
            dashboardRowWait: {},
            dashboardRowSick: {},
            dashboardRowIncorrect: {},
            province: 0
        }
    }


    componentWillMount() {

        console.info('this is row will mount')

        // this.getDataIn();
        // this.getDataWait();
        // this.getDataSick();
        // this.getDataIncorrect();
    }

    // componentWillUpdate

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.info('this is should component update', nextProps, this.props, nextState, this.state)
    //     console.info('this is should update', nextProps.province, this.props.province)

    //     if (nextState.dashboardRowIn.count != this.state.dashboardRowIn.count) {
    //         return true
    //     }

    //     if (nextState.dashboardRowWait.count != this.state.dashboardRowWait.count) {
    //         return true
    //     }

    //     if (nextState.dashboardRowSick.count != this.state.dashboardRowSick.count) {
    //         return true
    //     }

    //     if (nextState.dashboardRowIncorrect.count != this.state.dashboardRowIncorrect.count) {
    //         return true
    //     }

    //     if (nextProps.province == this.props.province) {
    //         return false
    //     }

    //     return true
    // }

    // componentWillUpdate(nextProps) {
    //     if (nextProps.province == this.props.province) {
    //         return
    //     }


    //     console.info('this is row will update', nextProps, this.props)

    //     this.setState({
    //         province: this.props.province
    //     }, _ => {
    //         console.info('this is state', this.state)
    //         this.getDataIn();
    //         this.getDataWait();
    //         this.getDataSick();
    //         this.getDataIncorrect();
    //     })


    // }

    componentDidUpdate(prevProp) {
        if (prevProp.province == this.props.province) {
            return
        }

        this.getDataIn();
        this.getDataWait();
        this.getDataSick();
        this.getDataIncorrect();
    }

    async getDataIn() {
        console.log(this.props);
        let dStart = Moment(this.props.dtstart).format('YYYY-MM-DD');
        let dEnd = Moment(this.props.dtend).format('YYYY-MM-DD');
        let prov = [];
        if (this.props.provcode['value'] == 0) {
            prov = [38, 39, 41, 42, 43, 47, 48];
        }
        else {
            prov = this.props.provcode['value'];
        }
        // console.log(dStart);
        console.log(prov);
        let params = {
            where: {
                chservProvince: {
                    in: prov
                },
                disease: this.props.disease.id,
                cstatus: {
                    between: [1, 2]
                },
                datedefine: {
                    between: [
                        dStart,
                        dEnd
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
        let dStart = formatDate(this.props.dtstart);
        let dEnd = formatDate(this.props.dtend);
        let params = {
            where: {
                chservProvince: this.props.province || 0,
                disease: this.props.disease.id,
                cstatus: "3",
                datedefine: {
                    between: [
                        dStart,
                        dEnd
                    ]
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
        let dStart = formatDate(this.props.dtstart);
        let dEnd = formatDate(this.props.dtend);
        let params = {
            where: {
                chservProvince: this.props.province || 0,
                disease: this.props.disease.id,
                cstatus: "4",
                datedefine: {
                    between: [
                        dStart,
                        dEnd
                    ]
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
            dashboardRowSick: axiosObject.data
        })
    }

    async getDataIncorrect() {
        let dStart = formatDate(this.props.dtstart);
        let dEnd = formatDate(this.props.dtend);
        let params = {
            where: {
                chservProvince: this.props.province || 0,
                disease: this.props.disease.id,
                cstatus: {
                    nin: [1, 2, 3, 4]
                },
                datedefine: {
                    between: [
                        dStart,
                        dEnd
                    ]
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
            dashboardRowIncorrect: axiosObject.data
        })
    }

    render() {
        return (
            <Row>
                <Col xs="12" sm="12" lg="12">
                    <h5 id="d1">{this.props.disease.diseasename}</h5>
                </Col>
                <Col xs="6" sm="6" lg="3">
                    <Card id="card1" className="text-white bg-warning">
                        <CardBody className="pb-0">
                            <div>
                                <i className="icon-location-pin"></i> รอตรวจสอบ<span className="text-value pull-right">
                                    <LoadingText data={this.state.dashboardRowIn.count} />
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
                                <LoadingText data={this.state.dashboardRowWait.count} />
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
                                <LoadingText data={this.state.dashboardRowSick.count} />
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
                                <LoadingText data={this.state.dashboardRowIncorrect.count} />
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
