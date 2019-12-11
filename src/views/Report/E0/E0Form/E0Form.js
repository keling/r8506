import React, { Component } from 'react'
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

import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatepickerWidth.css'

export const PROVINCE_OPTIONS = [
    { value: '0', label: 'ทุกจังหวัด' },
    { value: '38', label: 'บึงกาฬ' },
    { value: '39', label: 'หนองบัวลำภู' },
    { value: '41', label: 'อุดรธานี' },
    { value: '42', label: 'เลย' },
    { value: '43', label: 'หนองคาย' },
    { value: '47', label: 'สกลนคร' },
    { value: '48', label: 'นครพนม' }
]

export const DISEASE_OPTIONS = [
    { value: '0', label: 'ทุกโรค' },
    { value: '1', label: 'อุจจาระร่วง' },
    { value: '26', label: 'ไข้เลือดออก' },
    { value: '46', label: 'พิษสุนัขบ้า' },
]

const DATEPICKER_FORMAT = `d MMMM yyyy`

registerLocale('th', th);

export default class E0Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateStart: Moment()._d,
            dateEnd: Moment()._d,
            selectedProvince: PROVINCE_OPTIONS[0],
            selectedDisease: DISEASE_OPTIONS[0],
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleDiseaseChange = this.handleDiseaseChange.bind(this)
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
            selectedDisease: this.state.selectedDisease
        })
    }

    render() {
        return (
            <Row>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>จังหวัด: </Label>
                        <Select
                            defaultValue={PROVINCE_OPTIONS[0]}
                            name="selectProvince"
                            options={PROVINCE_OPTIONS}
                            ref="selectProvince"
                            searchable={false}
                            onChange={this.handleProvinceChange}
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>โรค: </Label>
                        <Select
                            defaultValue={DISEASE_OPTIONS[0]}
                            name="selectDisease"
                            options={DISEASE_OPTIONS}
                            ref="selectDisease"
                            searchable={false}
                            onChange={this.handleDiseaseChange}
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
