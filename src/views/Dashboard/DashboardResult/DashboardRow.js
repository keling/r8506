// https://reactjs.org/docs/react-component.html#updating
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
} from '../DashboardSettings'
import DashboardCardIn from '../DashboardCardIn';
import LoadingText from '../LoadingText'

const convertProvinceParam = province => {
    if (province.value > 0) {
        return province.value
    }

    // console.info('in convert province', province)

    return {
        inq: [38, 39, 41, 42, 43, 47, 48]
    }
}

export default class DashboardRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataIn: {},
            dataWait: {},
            dataSick: {},
            dataIncorrect: {},
            timestamp: this.props.timestamp
        }

        this.data = {
            dataIn: {},
            dataWait: {},
            dataSick: {},
            dataIncorrect: {},
        }

    }

    // static getDerivedStateFromProps(props, state) {
    //     this.getData()
    // }

    componentDidMount() {
        console.info('this is row did mount', this.props.disease, this.props.params)

        this.getData()
        // this.getDataIn();
        // this.getDataWait();
        // this.getDataSick();
        // this.getDataIncorrect();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info('this is should component update')
        console.info(this.props)
        console.info(nextProps)
        // console.info(this.state)
        // console.info(nextState)

        if (this.props.timestamp != nextProps.timestamp) {
            return true
        }

        if (
            this.state.dataIn.count !== nextState.dataIn.count ||
            this.state.dataWait.count !== nextState.dataWait.count ||
            this.state.dataSick.count !== nextState.dataSick.count ||
            this.state.dataIncorrect.count !== nextState.dataIncorrect.count
        ) {
            return true
        }

        return false
        //     // if (
        //     //     this.props.params.dateStart != nextProps.params.dateStart ||
        //     //     this.props.params.dateEnd != nextProps.params.dateEnd ||
        //     //     this.props.params.selectedProvince != nextProps.params.selectedProvince
        //     // ) {
        //     //     return true
        //     // }

        //     // return false
        //     // console.info(this.state, nextState)
        //     if (
        //         this.state.dashboardRowIn.count !== nextState.dashboardRowIn.count ||
        //         this.state.dashboardRowWait.count !== nextState.dashboardRowWait.count ||
        //         this.state.dashboardRowSick.count !== nextState.dashboardRowSick.count ||
        //         this.state.dashboardRowIncorrect.count !== nextState.dashboardRowIncorrect.count
        //     ) {
        //         return true
        //     }

        //     return false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.info('this is row did update', this.props.disease, this.props.params)

        // if (prevProp.province == this.props.province) {
        //     return
        // }

        this.getData()

        // this.getDataIn();
        // this.getDataWait();
        // this.getDataSick();
        // this.getDataIncorrect();
    }

    async getData() {
        console.info('\n')
        console.info('\n')
        // promisify them
        // use isloading to trigger render from state change

        let cstatuses = {
            In: {
                between: [1, 2]
            },
            Wait: 3,
            Sick: 4,
            Incorrect: {
                nin: [1, 2, 3, 4]
            },
        }

        for (let cstatusIndex in cstatuses) {
            let cstatus = cstatuses[cstatusIndex]
            let dataResult = await this.getDataByCstatus(cstatus)

            if (dataResult.error) {
                return
            }

            this.data[`data${cstatusIndex}`] = dataResult.data
        }



        // let dataInResult = await this.getDataByCstatus()
        // console.info('after await getdata')
        // if (dataInResult.error) {
        //     return
        // }

        // this.getDataWait()
        // this.getDataSick()
        // this.getDataIncorrect()

        console.info('final', this.data)

        this.setState({
            ...this.data,
            shouldUpdate: true,
        }, _ => {
            console.info('after set state', this.state)
        })


        console.info('\n')
        console.info('\n')
    }

    getDataByCstatus(cstatus) {
        return new Promise(
            async (resolve, reject) => {
                let params = {
                    where: {
                        chservProvince: convertProvinceParam(this.props.params.selectedProvince),
                        disease: this.props.disease.id,
                        cstatus,
                        datedefine: {
                            between: [
                                Moment(this.props.params.dateStart).format('YYYY-MM-DD'),
                                Moment(this.props.params.dateEnd).format('YYYY-MM-DD')
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
                    resolve({
                        error: true
                    })
                    return
                }

                // console.info(this.data)
                // this.data.dataIn = axiosObject.data

                resolve({
                    error: false,
                    data: axiosObject.data
                })

                // this.setState({
                //     dataIn: axiosObject.data
                // }, _ => {
                //     console.info('complete set datain')
                //     resolve({
                //         error: false
                //     })
                // })
            }
        )


    }

    async getDataWait() {
        let params = {
            where: {
                chservProvince: convertProvinceParam(this.props.params.selectedProvince),
                disease: this.props.disease.id,
                cstatus: "3",
                datedefine: {
                    between: [
                        Moment(this.props.params.dateStart).format('YYYY-MM-DD'),
                        Moment(this.props.params.dateEnd).format('YYYY-MM-DD')
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
            dataWait: axiosObject.data
        })
    }

    async getDataSick() {

        let params = {
            where: {
                chservProvince: convertProvinceParam(this.props.params.selectedProvince),
                disease: this.props.disease.id,
                cstatus: "4",
                datedefine: {
                    between: [
                        Moment(this.props.params.dateStart).format('YYYY-MM-DD'),
                        Moment(this.props.params.dateEnd).format('YYYY-MM-DD')
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
            dataSick: axiosObject.data
        })
    }

    async getDataIncorrect() {
        let params = {
            where: {
                chservProvince: convertProvinceParam(this.props.params.selectedProvince),
                disease: this.props.disease.id,
                cstatus: {
                    nin: [1, 2, 3, 4]
                },
                datedefine: {
                    between: [
                        Moment(this.props.params.dateStart).format('YYYY-MM-DD'),
                        Moment(this.props.params.dateEnd).format('YYYY-MM-DD')
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
            dataIncorrect: axiosObject.data
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
                                    <LoadingText data={this.state.dataIn.count} />
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
                                <LoadingText data={this.state.dataWait.count} />
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
                                <LoadingText data={this.state.dataSick.count} />
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
                                <LoadingText data={this.state.dataIncorrect.count} />
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
