import React, { Component } from 'react'
import axios from 'axios';
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
} from '../SrrtSettings';
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatepickerWidth.css'

export const PROVINCE_OPTIONS = [
    { value: `0`, label: `ทุกจังหวัด` }
]

export const DISTRICT_OPTIONS = [
    { value: '0', label: 'ทุกอำเภอ' },
]

export const SUBDISTRICT_OPTIONS = [
    { value: '0', label: 'ทุกตำบล' },
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
            selectedDisease: DISEASE_OPTIONS[0],
            selectedProvince: PROVINCE_OPTIONS[0],
            selectedDistrict: DISTRICT_OPTIONS[0],
            selectedSubdistrict: SUBDISTRICT_OPTIONS[0],
            isLoading: true,
            provinces: Array.from(PROVINCE_OPTIONS),
            districts: Array.from(DISTRICT_OPTIONS),
            subdistricts: Array.from(SUBDISTRICT_OPTIONS),
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)

        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleProvinceChange = this.handleProvinceChange.bind(this)
        this.handleDistrictChange = this.handleDistrictChange.bind(this)
        this.handleSubdistrictChange = this.handleSubdistrictChange.bind(this)
    }

    componentDidMount() {
        this.getProvince()
    }

    async getProvince() {
        console.info('getprovince')

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

    async getDistrict() {
        console.info('getdistrict')

        this.setState({
            isLoading: true
        })

        let params = {
            filter: {
                where: {
                    idprovince: this.state.selectedProvince.value
                }
            }
        }

        let fetchResult = await axios.get(`${URL_API}/Amps`, {
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

        let districts = DISTRICT_OPTIONS.concat(
            fetchResult.data.map(district => {
                return {
                    value: district.id,
                    label: district.name,
                }
            })
        )

        this.setState({
            districts,
            isLoading: false
        })
        // console.info(fetchResult)
    }

    async getSubdistrict() {
        console.info('getsubdistrict')

        this.setState({
            isLoading: true
        })

        let params = {
            filter: {
                where: {
                    idprovince: this.state.selectedProvince.value,
                    idamp: this.state.selectedDistrict.value,
                }
            }
        }

        let fetchResult = await axios.get(`${URL_API}/Ta`, {
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

        let subdistricts = SUBDISTRICT_OPTIONS.concat(
            fetchResult.data.map(subdistrict => {
                return {
                    value: subdistrict.id,
                    label: subdistrict.name
                }
            })
        )

        this.setState({
            subdistricts,
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

    handleDiseaseChange(selectedDisease) {
        this.setState({
            selectedDisease
        })
    }

    handleProvinceChange(selectedProvince) {
        console.info('provincechange')

        this.refs.selectDistrict.select.setValue(DISTRICT_OPTIONS[0])
        this.refs.selectSubdistrict.select.setValue(SUBDISTRICT_OPTIONS[0])

        this.setState({
            selectedProvince,
            districts: DISTRICT_OPTIONS,
            subdistricts: SUBDISTRICT_OPTIONS,
            selectedDistrict: DISTRICT_OPTIONS[0],
            selectedSubdistrict: SUBDISTRICT_OPTIONS[0],
        }, _ => {
            if (selectedProvince.value != 0) {
                this.getDistrict()
            }
        })
    }

    handleDistrictChange(selectedDistrict) {
        console.info('districtchange')

        this.refs.selectSubdistrict.select.setValue(SUBDISTRICT_OPTIONS[0])

        this.setState({
            selectedDistrict,
            subdistricts: SUBDISTRICT_OPTIONS,
            selectedSubdistrict: SUBDISTRICT_OPTIONS[0],
        }, _ => {
            if (selectedDistrict.value != 0) {
                this.getSubdistrict()
            }
        })
    }

    handleSubdistrictChange(selectedSubdistrict) {
        console.info('subdistrictchange')

        this.setState({
            selectedSubdistrict
        })
    }

    handleFormSubmit() {
        if (typeof this.props.onSubmit != `function`) {
            return
        }

        this.props.onSubmit({
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            selectedDisease: this.state.selectedDisease,
            selectedProvince: this.state.selectedProvince,
            selectedDisease: this.state.selectedDisease,
            selectedSubdisease: this.state.selectedSubdisease,
        })
    }

    render() {
        return (
            <Row>
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
                        <Label>อำเภอ: </Label>
                        <Select
                            defaultValue={this.state.districts[0]}
                            name="selectDistrict"
                            options={this.state.districts}
                            ref="selectDistrict"
                            searchable={false}
                            onChange={this.handleDistrictChange}
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="3">
                    <FormGroup>
                        <Label>ตำบล: </Label>
                        <Select
                            defaultValue={this.state.subdistricts[0]}
                            name="selectSubdistrict"
                            options={this.state.subdistricts}
                            ref="selectSubdistrict"
                            searchable={false}
                            onChange={this.handleSubdistrictChange}
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
                        <Button className="w-100" color="success" size="md" onClick={this.handleFormSubmit} disabled={this.state.isLoading}>
                            {
                                this.state.isLoading
                                    ?
                                    <i className="fa fa-spinner fa-spin fa-fw"></i>
                                    :
                                    <i className="fa fa-dot-circle-o"></i>
                            } ประมวลผล
                        </Button>
                    </FormGroup>
                </Col>
            </Row >
        )
    }
}
