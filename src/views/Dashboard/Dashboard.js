import React, { Component, lazy, Suspense } from 'react';
import Select from 'react-select';
import axios from "axios";
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

import {
    ACCESS_TOKEN,
    URL_API
} from './DashboardSettings'
import DashboardForm, { PROVINCE_OPTIONS } from './DashboardForm/DashboardForm'
import DashboardRow from './DashboardRow'

// const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')

registerLocale('th', th);

const provinceOptions = [
    { value: '0', label: 'ทุกจังหวัด' },
    { value: '38', label: 'บึงกาฬ' },
    { value: '39', label: 'หนองบัวลำภู' },
    { value: '41', label: 'อุดรธานี' },
    { value: '42', label: 'เลย' },
    { value: '43', label: 'หนองคาย' },
    { value: '47', label: 'สกลนคร' },
    { value: '48', label: 'นครพนม' }
]

const Loading = _ => <div className="animated fadeIn pt-1 text-center">Loading...</div>

class Dashboard extends Component {
    constructor(props) {
        super(props)

        // set current state
        this.state = {
            isLoading: true,

            diseases: [],

            dateStart: new Date(),
            dateEnd: new Date(),
            selectedProvince: provinceOptions[0],

            dashboardRowParams: {
                dateStart: new Date(),
                dateEnd: new Date(),
                selectedProvince: provinceOptions[0]
            }
        };

        // binding events
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentDidMount() {
        // console.info(this.refs.dateStart)
        this.getData()
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(this.state.dateStart != nextState.dateStart || this.state.date)
    // }

    async getData() {
        let getDiseaseResult = await axios.get(`${URL_API}/Reportdashboards`, {
            headers: {
                Authorization: ACCESS_TOKEN
            }
        })

        this.setState({
            isLoading: false
        })

        if (getDiseaseResult.status != 200) {
            return
        }

        this.setState({
            diseases: getDiseaseResult.data
        })
    }

    handleProvinceChange(selectedProvince) {
        this.setState({
            selectedProvince
        })
    }

    handleStartDateChange(dateStart) {
        // this.refs.dateStart.setSelected(dateStart)
        if (dateStart > this.state.dateEnd) {
            alert('เลือกวันที่ เริ่มต้น ใหม่')

            this.setState({
                dateStart: this.state.dateEnd
            })

            return
        }

        this.setState({
            dateStart
        })
    }

    handleEndDateChange(dateEnd) {
        if (this.state.dateStart > dateEnd) {
            alert('เลือกวันที่ สิ้นสุด ใหม่')

            this.setState({
                dateEnd: this.state.dateStart
            })

            return
        }

        this.setState({
            dateEnd
        })
    }

    handleFormSubmit() {
        // this.setState({
        //     clickChange: !this.state.clickChange
        // })
    }

    handleDashboardFormSubmit(params) {
        console.info(params)
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
                {
                    this.state.isLoading ?
                        <Loading /> :
                        this.state.diseases.map(disease => {
                            console.info('dashboard rerender')
                            return <DashboardRow
                                disease={disease}
                            // params={this.state.dashboardRowParams}
                            />
                        })
                }
            </div >
        );
    }
}

export default Dashboard;
