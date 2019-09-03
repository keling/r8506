import React, { Component, lazy, Suspense } from 'react';
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
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

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
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const diseaseName = ['ไข้เลือดออก', 'ไข้เลือดออกช็อค', 'ไข้เดงกี่', 'อุจจาระร่วง', 'อาหารเป็นพิษ', 'พิษสุนัขบ้า', 'โรคซึมเศร้า']
    const items = []
    for (const [index, value] of diseaseName.entries()) {
      items.push(
        <Row>
          <Col xs="12" sm="12" lg="12">
            <h3 id={index}>{value}</h3>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card id="card1" className="text-white bg-warning">
              <CardBody className="pb-0">
                <div><i className="icon-location-pin"></i> รอตรวจสอบ<span className="text-value pull-right">70</span></div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '20px' }}>
                {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card id="card2" className="text-white bg-success">
              <CardBody className="pb-0">
                <div><i className="icon-location-pin"></i> รอ รพ. สรุปผล<span className="text-value pull-right">70</span></div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '20px' }}>
                {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card id="card2" className="text-white bg-info">
              <CardBody className="pb-0">
                <div><i className="icon-location-pin"></i> ผู้ป่วยทั้งหมด<span className="text-value pull-right">70</span></div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '20px' }}>
                {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card id="card2" className="text-white bg-danger">
              <CardBody className="pb-0">
                <div><i className="icon-location-pin"></i> ไม่พบ<span className="text-value pull-right">70</span></div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '20px' }}>
                {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
              </div>
            </Card>
          </Col>

          <hr />
        </Row>
      )
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" lg="12">
              <p>วันที่</p>
            </Col>
          </Row>
          {items}
        </div>
      );
    }
  }
}

export default Dashboard;
