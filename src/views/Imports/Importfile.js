import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col, FormGroup, Input, Button, Label } from 'reactstrap'

class Importfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      fname: ''
    }

    //this.onresult = this.onresult.bind(this)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-folder-alt"></i> Import File
          </div>
          <div className="card-body">
            <Row>
              <Col xs="12">
                <FormGroup row>
                  <Col md="3">
                    <Label>ประเภทไฟล์ที่นำเข้าสู่ระบบ</Label>
                  </Col>
                  <Col md="9">
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio1" name="radios" value="option1" checked />
                        <Label check className="form-check-label" htmlFor="radio1">R506</Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id="radio2" name="radios" value="option2" />
                        <Label check className="form-check-label" htmlFor="radio2">HOSxP</Label>
                      </FormGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">เลือกไฟล์</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="file-input" />
                    </Col>
                  </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="card-footer">
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> ส่งไฟล์</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Importfile;
