import React, { Component, lazy, Suspense } from 'react';
import Select from 'react-select';
// import axios from "axios";
import { Bar, Line } from 'react-chartjs-2';
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
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
import "react-datepicker/dist/react-datepicker.css";

import axios from './AwaitableAxios'

import {
    ACCESS_TOKEN,
    URL_API
} from './DashboardSettings'
import DashboardForm, { PROVINCE_OPTIONS } from './DashboardForm/DashboardForm'
import DashboardResult from './DashboardResult/DashboardResult'

// const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')

const Loading = _ => <div className="animated fadeIn pt-1 text-center">Loading...</div>

class Dashboard extends Component {
    constructor(props) {
        super(props)

        // set current state
        this.state = {
            isError: ``,
            isLoading: true,

            diseases: [],

            dashboardResultParams: {
                dateStart: new Date(),
                dateEnd: new Date(),
                selectedProvince: PROVINCE_OPTIONS[0],
                diseases: []
            }
        };

        // binding events
        this.handleDashboardFormSubmit = this.handleDashboardFormSubmit.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        let getDiseaseResult = await axios.get(`${URL_API}/Reportdashboards`, {
            headers: {
                Authorization: ACCESS_TOKEN
            }
        })

        this.setState({
            isLoading: false
        })

        if (getDiseaseResult.isAxiosError || getDiseaseResult.status != 200) {
            console.error(`API Error`, getDiseaseResult.response)
            return
        }

        let dashboardResultParams = this.state.dashboardResultParams
        dashboardResultParams[`diseases`] = getDiseaseResult.data

        this.setState({
            diseases: getDiseaseResult.data,
            dashboardResultParams
        })
    }

    handleDashboardFormSubmit(params) {
        this.setState({
            dashboardResultParams: {
                dateStart: params.dateStart,
                dateEnd: params.dateEnd,
                selectedProvince: params.selectedProvince,
                diseases: this.state.diseases
            }
        })
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" lg="12">
                        <h2><strong>R8-506 Dashboard</strong></h2>
                        <h4>ระบบเผ้าระวังทางระบาดวิทยา เขตสุขภาพที่ 8</h4>
                    </Col>
                </Row>
                <DashboardForm onSubmit={this.handleDashboardFormSubmit} />
                <Row>
                    <Col xs="12" md="12" lg="12">
                        <hr />
                    </Col>
                </Row>
                {
                    this.state.isLoading ?
                        <Loading /> :
                        <DashboardResult params={this.state.dashboardResultParams} timestamp={new Date()} />
                }
                {/* <Row>
                    <div className="animated fadeIn pt-1 text-center">
                        {
                            this.state.isError
                        }
                    </div>
                </Row> */}
            </div >
        );
    }
}

export default Dashboard;
