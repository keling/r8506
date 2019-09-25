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
import DashboardRow from "./DashboardRow";

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

registerLocale('th', th);

// functions
function formatDate(incomingDate) {
  var numsDate = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  var makeDate = incomingDate.getFullYear() + "-" + numsDate[incomingDate.getMonth() + 1] + "-" + numsDate[incomingDate.getDate()];
  return makeDate;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // set current state
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      clickChange: false,
      AuthString:
        "cMhqtcyDfiwnnG9s3ZVfDkxoEcf34tnap4FZzd0zZErAcFo1tRhokPuRkO864DR5",
      dashboards: [],
      casein: [],
      casewait: [],
      casesick: [],
      caseincorrect: [],
      setProvince: { value: '0', label: 'ทุกจังหวัด' },
      isLoading: true,
      startDate: new Date(),
      endDate: new Date()
    };

    // binding events
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  // componentWillUpdate(NextProps) {
  //   if (NextProps.setProvince != this.state.setProvince) {
  //     this.getData();
  //   }
  // }

  async getData() {
    let params = "";
    let getDisease = await axios.get(`${URL_API}/Reportdashboards`, {
      headers: {
        Authorization: ACCESS_TOKEN
      },
      data: {},
      params
    })
    this.setState({
      isLoading: false
    });

    console.log(getDisease);
    if (getDisease.status != 200) {
      return;
    }

    this.setState({
      dashboards: getDisease.data
    })
    //this.render(getDisease.data);
  }

  // getValueCaseIn() {
  //   var dStart = formatDate(this.state.startDate);
  //   var dEnd = formatDate(this.state.endDate);
  //   var prov = this.state.setProvince['value'];
  //   var diseaseCode = this.state.dashboards[0, 0];
  //   // var conditionDate = "\"datedefine\":{\"between\":[\"2019-01-01\",\"2019-06-30\"]}";
  //   var conditionDate = "\"datedefine\":{\"between\":[\"" + dStart + "\",\"" + dEnd + "\"]}";
  //   var condition0 = ",\"disease\":\"" + diseaseCode + "\"";
  //   var condition1 = ",\"cstatus\":{\"between\":[1,2]}";
  //   var condition2 = "";

  //   if (this.state.setProvince['value'] == "0") {
  //     condition2 = "";
  //   }
  //   else {
  //     condition2 = ",\"chservProvince\":" + prov + "";
  //   }

  //   //`{URL_API}/Cases/count?where={%22chservProvince%22:%2241%22,%22disease%22:%2226%22,%22cstatus%22:{%22between%22:[1,4]},%22datedefine%22:{%22between%22:[%222019-01-01%22,%222019-03-31%22]}}&access_token=oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ

  //   axios.get(`${URL_API}/Cases/count?where={" + conditionDate + condition0 + condition1 + condition2 + "}`, {
  //     headers: {
  //       Authorization: ACCESS_TOKEN
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({
  //         casein: response.data,
  //         isLoading: false
  //       });
  //       // return response.data;
  //     })
  //     .catch(error => {
  //       console.log("error " + error);
  //     });
  // }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  // setting up event
  onChangeProvince(valueProv) {
    // console.log(valueProv);
    this.setState({ setProvince: valueProv });
  }
  handleStartDateChange(dateStart) {
    // console.log(dateStart);
    if (this.state.endDate < dateStart) {
      alert('เลือกวันที่ เริ่มต้น ใหม่');
    }
    else {
      this.setState({ startDate: dateStart });
    }
  }
  handleEndDateChange(dateEnd) {
    // console.log(dateEnd);
    if (this.state.startDate > dateEnd) {
      alert('เลือกวันที่ สิ้นสุด ใหม่');
    }
    else {
      this.setState({ endDate: dateEnd });
    }
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  onSubmitClick() {
    this.setState({
      clickChange: !this.state.clickChange
    });

  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    let optionProvince = [
      { value: '0', label: 'ทุกจังหวัด' },
      { value: '38', label: 'บึงกาฬ' },
      { value: '39', label: 'หนองบัวลำภู' },
      { value: '41', label: 'อุดรธานี' },
      { value: '42', label: 'เลย' },
      { value: '43', label: 'หนองคาย' },
      { value: '47', label: 'สกลนคร' },
      { value: '48', label: 'นครพนม' }
    ];

    const { isLoading, dashboards, casein } = this.state;
    return (

      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" lg="12">
            <h2><strong>R8-506 Dashboard</strong></h2><h4>ระบบเผ้าระวังทางระบาดวิทยา เขตสุขภาพที่ 8</h4>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg="3">
            <FormGroup>
              <Label>จังหวัด: </Label>
              <Select
                name="selectProvince"
                defaultValue={this.state.setProvince}
                value={this.state.setProvince}
                options={optionProvince}
                searchable={false}
                onChange={this.onChangeProvince}
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6" lg="3">
            <FormGroup>
              <Label>จากวันที่: </Label><br />
              <DatePicker className="form-control" name="dateStart"
                locale="th"
                dateFormat="dd MMMM yyyy"
                selected={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6" lg="3">
            <FormGroup>
              <Label>ถึงวันที่: </Label><br />
              <DatePicker className="form-control" name="dateEnd"
                locale="th"
                dateFormat="dd MMMM yyyy"
                selected={this.state.endDate}
                onChange={this.handleEndDateChange}
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6" lg="3">
            <br />
            <FormGroup>
              <Button color="success" size="md" onClick={this.onSubmitClick}><i className="fa fa-dot-circle-o"></i> ประมวลผล</Button>
            </FormGroup>
          </Col>
        </Row >
        <Row>
          <Col xs="12" md="12" lg="12">
            <hr />
          </Col>
        </Row>
        {!isLoading ? (
          dashboards.map(patient => {
            const { id, diseasename, statin, statwait, statsick, statincorrect } = patient;
            return (
              <DashboardRow diseasecode={patient} dtstart={this.state.startDate} dtend={this.state.endDate} provcode={this.state.setProvince} />
            );
          })
        ) : (
            <p>Loading...</p>
          )
        }
      </div >
    );
  }
}

export default Dashboard;
