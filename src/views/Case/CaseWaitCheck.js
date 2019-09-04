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

class CaseWaitCheck extends Component {
  constructor() {
    super();
    this.state = {
      AuthString:
        "oIIyHE7tDnjM9zW0iTkiZvYiSSEor8su1E7r2T4XnYX1dx8vlzn2Z8OaExNYEfsQ",
      cases: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://203.157.168.91:3000/api/Cases?filter[limit]=10&filter[skip]=0", {
        headers: { Authorization: this.state.AuthString }
      })
      .then(response => {
console.log(response);        
        this.setState({
          cases: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }
  render() {
    const { isLoading, cases } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Case รอตรวจสอบ
              </CardHeader>
              <CardBody>
                {!isLoading ? (
                  <div>
                    {cases.map((thisCase,index) => {
                      const { idrace,name, vstdate, pdx} = thisCase;
                      return (
                        <div class="alert alert-warning" key={index}>
                          <div style={{ position: 'absolute', zIndex: '90' }}>
{/*                             
                            <Button block color="warning" size="xs">แจ้งเคส</Button>
                            <Button block color="warning" size="xs">บุคคล</Button>
 */}
                          </div>

                          <div>หมายเลขเคส {idrace}</div>
                          <div>โรค {idrace}</div>
                          <div>ICD10 {vstdate}</div>
                          <div>ชื่อผู้ป่วย {name}</div>
                          <div>ที่อยู่ {pdx}</div>
                          <div>วันที่สั่งงาน {pdx}</div>
                          <div><Button block color="warning" size="xs" className="btn-pill">รับทราบเคส</Button></div>
                        </div>
                      );
                      })
                    }
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        
      </React.Fragment>
    );
  }
}

export default CaseWaitCheck;
