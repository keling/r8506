import React, { Component } from 'react'
import axios from 'axios'
import DatePicker, { registerLocale } from 'react-datepicker'
import th from 'date-fns/locale/th'
import Select from 'react-select'
import {
    // Badge,
    Button,
    // ButtonDropdown,
    // ButtonGroup,
    // ButtonToolbar,
    // Card,
    // CardBody,
    // CardFooter,
    // CardHeader,
    // CardTitle,
    Col,
    // Dropdown,
    // DropdownItem,
    // DropdownMenu,
    // DropdownToggle,
    FormGroup,
    // Input,
    Label,
    // Progress,
    Row,
    // Table,
} from 'reactstrap'
import Moment from 'moment'

import {
    ACCESS_TOKEN,
    URL_API
} from '../../ReportSettings'
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatepickerWidth.css'

export const PROVINCE_OPTIONS = [
    { value: '0', label: 'ทุกจังหวัด' },
]

export const DISEASE_OPTIONS = [
    { value: '0', label: 'ทุกโรค' },
]

const DATEPICKER_FORMAT = `d MMMM yyyy`

registerLocale('th', th);

export default class E0Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateStart: Moment().set({ h: 0, m: 0, s: 0 })._d,
            dateEnd: Moment().set({ h: 0, m: 0, s: 0 })._d,
            selectedProvince: PROVINCE_OPTIONS[0],
            selectedDisease: DISEASE_OPTIONS[0],
            isLoading: true,
            diseases: Array.from(DISEASE_OPTIONS),
            provinces: Array.from(PROVINCE_OPTIONS),
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleDiseaseChange = this.handleDiseaseChange.bind(this)
    }

    componentDidMount() {
        this.getDisease()
        this.getProvince()
    }

    async getDisease() {
        this.setState({
            isLoading: true
        })

        let params = {
            filter: {
                // where: {
                //     iddisease: {
                //         in: [3, 26, 27, 66, 9]
                //     }
                // },
                order: [`name ASC`]
            },
        }

        let fetchResult = await axios.get(`${URL_API}/Diseases`, {
            headers: {
                Authorization: ACCESS_TOKEN
            },
            params
        })

        // this.setState({
        //     isLoading: false
        // })

        if (fetchResult.isAxiosError || fetchResult.status != 200) {
            console.error(`API Error`, fetchResult.response)
            this.setState({
                isLoading: false
            })
            return
        }

        let diseases = DISEASE_OPTIONS.concat(
            fetchResult.data.map(disease => {
                return {
                    value: disease.iddisease,
                    label: disease.name
                }
            })
        )

        this.setState({
            diseases,
            isLoading: false
        })
        // console.info(fetchResult)
    }

    async getProvince() {
        // console.info('getprovince')

        this.setState({
            isLoading: true
        })

        let params = {
            filter: {
                where: {
                    idstate: 8
                }
            }
        }

        let fetchResult = await axios.get(`${URL_API}/Provinces`, {
            headers: {
                Authorization: ACCESS_TOKEN
            },
            params
        })

        // this.setState({
        //     isLoading: false
        // })

        if (fetchResult.isAxiosError || fetchResult.status != 200) {
            console.error(`API Error`, fetchResult.response)
            this.setState({
                isLoading: false
            })
            return
        }

        let provinces = PROVINCE_OPTIONS.concat(
            fetchResult.data.map(province => {
                return {
                    value: province.idprovince,
                    label: province.name
                }
            })
        )

        this.setState({
            provinces,
            isLoading: false
        })
        // console.info(fetchResult)
    }

    handleStartDateChange(dateStart) {
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

    handleProvinceChange(selectedProvince) {
        this.setState({
            selectedProvince
        })
    }

    handleDiseaseChange(selectedDisease) {
        this.setState({
            selectedDisease
        })
    }

    handleFormSubmit() {
        if (typeof this.props.onSubmit != `function`) {
            return
        }

        this.props.onSubmit({
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            selectedProvince: this.state.selectedProvince,
            selectedDisease: this.state.selectedDisease,
        })
    }

    render() {
        return (
            <Row>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>โรค: </Label>
                        <Select
                            defaultValue={this.state.diseases[0]}
                            name="selectDisease"
                            options={this.state.diseases}
                            ref="selectDisease"
                            searchable={false}
                            onChange={this.handleDiseaseChange}
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>จังหวัด: </Label>
                        <Select
                            defaultValue={this.state.provinces[0]}
                            name="selectProvince"
                            options={this.state.provinces}
                            ref="selectProvince"
                            searchable={false}
                            onChange={this.handleProvinceChange}
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>จากวันที่ : </Label>
                        <br />
                        <div className="customDatePickerWidth">
                            <DatePicker
                                className="form-control"
                                dateFormat={DATEPICKER_FORMAT}
                                locale="th"
                                name="dateStart"
                                ref="dateStart"
                                selected={this.state.dateStart}
                                onChange={this.handleStartDateChange}
                            />
                        </div>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>ถึงวันที่ : </Label>
                        <br />
                        <div className="customDatePickerWidth">
                            <DatePicker
                                className="form-control"
                                dateFormat={DATEPICKER_FORMAT}
                                locale="th"
                                name="dateEnd"
                                ref="dateEnd"
                                selected={this.state.dateEnd}
                                onChange={this.handleEndDateChange}
                            />
                        </div>
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <FormGroup style={{ paddingTop: `1.75rem` }}>
                        <Button className="w-100" color="success" size="md" onClick={this.handleFormSubmit}>
                            <i className="fa fa-dot-circle-o"></i> ประมวลผล
                            </Button>
                    </FormGroup>
                </Col>
            </Row >
        )
    }
}
