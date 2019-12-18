import React, { Component } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Table
} from "reactstrap";

class Importloopback extends Component {
  constructor() {
    super();
    this.state = {
      AuthStringGet:
        "NcIpTazU9hyXrwYhvYvrJkkQS6gpddFHhj7vIbhtdXEJd7iUrABTAJQ6NzqAg7Xy",
      patients: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://110.164.182.42:3000/api/R8506s", {
        headers: { Authorization: this.state.AuthStringGet },
        params: {
          filter: {
            where: { daterecord: { between: ["2019-11-20", "2019-11-21"] } },
            limit: "20"
          }
        }
      })
      .then(response => {
        // console.log(response.data);
        this.setState({
          patients: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }

  importData(patient) {
    /*axios({
      method: "post",
      url: "http://203.157.168.91:3000/api/Cases",
      headers: { Authorization: this.state.AuthString },
      data: {
        idcase: "",
        e0: "0",
        e1: "0",
        pe0: "0",
        pe1: "0",
        name: patient.name,
        hn: patient.hn,
        icd10: patient.icd10
      }
    });*/
    console.log(patient.name);
  }

  importAllData() {
    this.state.patients.map(patient => {
      console.log(patient.name);
    });
  }

  render() {
    const { isLoading, patients } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Data From Loopback
                <div className="card-header-actions">
                  <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                    <Button
                      active
                      block
                      color="success"
                      className="btn-pill"
                      aria-pressed="true"
                      onClick={e => this.importAllData()}
                    >
                      นำเข้าทั้งหมด
                    </Button>
                  </Col>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>HN</th>
                      <th>ชื่อ - สกุล</th>
                      <th>วันที่รับบริการ</th>
                      <th>PDX</th>
                      <th>
                        <center>นำเข้า</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading ? (
                      patients.map(patient => {
                        const { id, hn, name, daterecord, icd10 } = patient;
                        return (
                          <tr key={id}>
                            <td>{hn}</td>
                            <td>{name}</td>
                            <td>{daterecord}</td>
                            <td>{icd10}</td>
                            <td>
                              <Button
                                block
                                color="warning"
                                size="xs"
                                className="btn-pill"
                                onClick={e => this.importData(patient)}
                              >
                                Import
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>Loading...</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Importloopback;
