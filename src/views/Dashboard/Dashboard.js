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

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

registerLocale('th', th);
//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      AuthString:
        "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
      dashboards: [],
      setProvince: { value: '0', label: 'ทุกจังหวัด' },
      isLoading: true,
      startDate: new Date(),
      endDate: new Date()
    };
    // console.log(this.state.setProvince);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://203.157.168.91:3000/api/Reportdashboards", {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          dashboards: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  _onChange(valueProv) {
    // console.log(valueProv);
    this.setState({ setProvince: valueProv });
  }

  handleChange = dateStart => {
    this.setState({
      startDate: dateStart
    });
  }

  handleChange = dateEnd => {
    this.setState({
      endDate: dateEnd
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    var optionProvince = [
      { value: '0', label: 'ทุกจังหวัด' },
      { value: '38', label: 'บึงกาฬ' },
      { value: '39', label: 'หนองบัวลำภู' },
      { value: '41', label: 'อุดรธานี' },
      { value: '42', label: 'เลย' },
      { value: '43', label: 'หนองคาย' },
      { value: '47', label: 'สกลนคร' },
      { value: '48', label: 'นครพนม' }
    ];
    // const diseaseName = ['ไข้เลือดออก', 'ไข้เลือดออกช็อค', 'ไข้เดงกี่', 'อุจจาระร่วง', 'อาหารเป็นพิษ', 'พิษสุนัขบ้า', 'โรคซึมเศร้า']
    // const items = []
    const { isLoading, dashboards } = this.state;
    return (
      // for (const [index, value] of diseaseName.entries()) {
      //   items.push(
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
                onChange={this._onChange.bind(this)}
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6" lg="3">
            <FormGroup>
              <Label>จากวันที่: </Label><br />
              <DatePicker className="form-control" id="dateStart"
                locale="th"
                format="YYYY-mm-dd"
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6" lg="3">
            <FormGroup>
              <Label>ถึงวันที่: </Label><br />
              <DatePicker className="form-control" id="dateEnd"
                locale="th"
                format="YYYY-mm-dd"
                selected={this.state.endDate}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row >
        {!isLoading ? (
          dashboards.map(patient => {
            const { id, diseasename, statin, statwait, statsick, statincorrect } = patient;
            return (
              <Row>
                <Col xs="12" sm="12" lg="12">
                  {/* <h3 id={index}>{value}</h3> */}
                  <h5 id="d1">{diseasename}</h5>
                </Col>
                <Col xs="6" sm="6" lg="3">
                  <Card id="card1" className="text-white bg-warning">
                    <CardBody className="pb-0">
                      <div><i className="icon-location-pin"></i> รอตรวจสอบ<span className="text-value pull-right">{statin}</span></div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                      {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                    </div>
                  </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                  <Card id="card2" className="text-white bg-success">
                    <CardBody className="pb-0">
                      <div><i className="icon-location-pin"></i> รอ รพ. สรุปผล<span className="text-value pull-right">{statwait}</span></div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                      {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                    </div>
                  </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                  <Card id="card2" className="text-white bg-info">
                    <CardBody className="pb-0">
                      <div><i className="icon-location-pin"></i> ผู้ป่วยทั้งหมด<span className="text-value pull-right">{statsick}</span></div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                      {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                    </div>
                  </Card>
                </Col>

                <Col xs="6" sm="6" lg="3">
                  <Card id="card2" className="text-white bg-danger">
                    <CardBody className="pb-0">
                      <div><i className="icon-location-pin"></i> ไม่พบ<span className="text-value pull-right">{statincorrect}</span></div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                      {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
                    </div>
                  </Card>
                </Col>
              </Row>

              // <tr>
              //   <td>{hn}</td>
              //   <td>{pname}{fname} {lname}</td>
              //   <td>{vstdate}</td>
              //   <td>{pdx}</td>
              //   <td><Button block color="warning" size="xs" className="btn-pill">Import</Button></td>
              // </tr>
            );
          })
        ) : (
            <p>Loading...</p>
          )
        }
      </div >
    );
    // return (
    //   <div className="animated fadeIn">
    //     <Row>
    //       <Col xs="12" sm="12" lg="12">
    //         <div >
    //           <p>วันที่</p>
    //         </div>
    //       </Col>
    //     </Row>
    //     {items}
    //     {items}
    //   </div>
    // );
    //}
  }
}

export default Dashboard;
