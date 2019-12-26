import React, { Component } from "react";
// import Select from 'react-select';
import axios from "axios";
import {
    // Badge,
    // Button,
    // ButtonDropdown,
    // ButtonGroup,
    // ButtonToolbar,
    Card,
    CardBody,
    // CardFooter,
    // CardHeader,
    // CardTitle,
    Col,
    // Dropdown,
    // DropdownItem,
    // DropdownMenu,
    // DropdownToggle,
    // Progress,
    Row,
    Table,
    // FormGroup,
    // Label,
    // Input

} from 'reactstrap';
// import DatePicker from 'react-datepicker';
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import th from 'date-fns/locale/th';
import "react-datepicker/dist/react-datepicker.css";
import {
    ACCESS_TOKEN,
    URL_API
} from '../ReportSettings'
import ReportForm, { DISEASE_OPTIONS, PROVINCE_OPTIONS } from './SurveillanceForm/SurveillanceForm';
import PaginationComponent from "react-reactstrap-pagination";
import MaterialTable, {
    MTableFilterRow,
} from 'material-table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Moment from 'moment'
// import Icons from '@material-ui/core';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { tsPropertySignature } from "@babel/types";
// import E0Tables from './E0Table';
// import LoadingText from "../../Dashboard/LoadingText";

export default class E0 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isError: ``,
            isLoading: true,

            diseases: [],
            datas: [],

            fetchParams: {
                dateStart: Moment().set({ h: 0, m: 0, s: 0 })._d,
                dateEnd: Moment().set({ h: 0, m: 0, s: 0 })._d,
                selectedProvince: PROVINCE_OPTIONS[0],
                selectedDisease: DISEASE_OPTIONS[0],
            }
        }

        this.handleReportFormSubmit = this.handleReportFormSubmit.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        this.setState({
            isLoading: true
        })


        let params = {
            filter: {
                where: {
                    datedefine: {
                        between: [
                            Moment(this.state.fetchParams.dateStart).format(),
                            Moment(this.state.fetchParams.dateEnd).format()
                        ]
                    }
                }
            }
        }

        // console.info(this.state.fetchParams)
        if (this.state.fetchParams.selectedDisease.value != 0) {
            params.filter.where.disease = this.state.fetchParams.selectedDisease.value
        }

        if (this.state.fetchParams.selectedProvince.value != 0) {
            params.filter.where.chservProvince = this.state.fetchParams.selectedProvince.value
        }

        let fetchResult = await axios.get(`${URL_API}/Cases`, {
            headers: {
                Authorization: ACCESS_TOKEN
            },
            params
        })

        this.setState({
            isLoading: false
        })

        if (fetchResult.isAxiosError || fetchResult.status != 200) {
            console.error(`API Error`, fetchResult.response)
            return
        }

        // console.log(fetchResult);

        this.setState({
            datas: fetchResult.data
        })
    }

    handleReportFormSubmit(params) {
        // console.info(params, this)
        this.setState({
            fetchParams: {
                dateStart: params.dateStart,
                dateEnd: params.dateEnd,
                selectedProvince: params.selectedProvince,
                selectedDisease: params.selectedDisease
            }
        }, _ => {
            this.getData()
        })
    }

    render() {
        // const { datas } = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" lg="12">
                        <h3><strong>รายงานคุณภาพการสอบสวนโรค</strong></h3>
                        <h4>ระบบเผ้าระวังทางระบาดวิทยา เขตสุขภาพที่ 8</h4>
                    </Col>
                </Row>
                <ReportForm onSubmit={this.handleReportFormSubmit} />
                <Row>
                    <Col xs="12" md="12" lg="12">
                        {
                            this.state.isLoading
                                ?
                                <>
                                    <span>Loading</span>
                                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                                </>
                                :
                                <MaterialTable
                                    title="Basic Export Preview"
                                    columns={
                                        [
                                            { title: `จังหวัด`, field: `province` },
                                            { title: `อำเภอ`, field: `district` },
                                            { title: `จำนวนเคส`, field: `total` },
                                            { title: `มีภาพ`, field: `has_image` },
                                            { title: `มีภาพร้อยละ`, field: `has_image_percentage` },
                                            { title: `ลงพิกัด`, field: `has_coord` },
                                            { title: `ลงพิกัดร้อยละ`, field: `has_coord_percentage` },
                                            { title: `มีภาพและพิกัด`, field: `has_image_and_corrd` },
                                            { title: `มีภาพและพิกัดร้อยละ`, field: `has_image_and_corrd_percentage` },
                                        ]
                                    }
                                    data={
                                        this.state.datas
                                    }

                                // options={{
                                //     filtering: true
                                // }}
                                // components={{
                                //     FilterRow: props => { console.info(props); return <MTableFilterRow {...props} /> }
                                // }}
                                />
                        }
                    </Col>
                </Row>
            </div >
        );
    }
}
