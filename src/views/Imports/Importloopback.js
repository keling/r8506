import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from "reactstrap";

class Importloopback extends Component {
  constructor() {
    super();
    this.state = {
      AuthString:
        "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
      patients: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://203.157.168.91:3000/api/vr506s", {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
        this.setState({
          patients: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
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
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>HN</th>
                      <th>ชื่อ - สกุล</th>
                      <th>วันที่รับบริการ</th>
                      <th>PDX</th>
                      <th><center>นำเข้า</center></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading ? (
                      patients.map(patient => {
                        const { id, hn, pname, fname, lname, vstdate, pdx } = patient;
                        return (
                          <tr>
                            <td>{hn}</td>
                            <td>{pname}{fname} {lname}</td>
                            <td>{vstdate}</td>
                            <td>{pdx}</td>
                            <td><Button block color="warning" size="xs" className="btn-pill">Import</Button></td>
                          </tr>
                        );
                      })
                    ) : (
                      <p>Loading...</p>
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
