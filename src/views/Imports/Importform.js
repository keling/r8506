import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Alert, Row, Col, FormGroup, Input, Button, Label } from 'reactstrap'

class Importform extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        <i className="icon-note"></i> Import Form
                    </div>
                    <div className="card-body">
                        <FormGroup row>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="e0">E0</Label>
                                    <Input type="text" id="e0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">PE0</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="e1">E1</Label>
                                    <Input type="text" id="e1" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="pe1">PE1</Label>
                                    <Input type="text" id="pe1" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="success">
                            <i className="fa fa-address-book fa-lg"></i> <strong>ข้อมูลส่วนตัวผู้ป่วย</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ชื่อผู้ป่วย</Label>
                                    <Input type="text" id="e0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ชื่อผู้ปกครอง</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">เพศ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="1">ชาย</option>
                                        <option value="2">หญิง</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe1">อายุ (ปี)</Label>
                                    <Input type="text" id="pe1" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">อายุ (เดือน)</Label>
                                    <Input type="text" id="e0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">อายุ (วัน)</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">สภาพสมรส</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="1">ไม่ระบุ</option>
                                        <option value="2">โสด</option>
                                        <option value="2">สมรส</option>
                                        <option value="2">อย่าร้าง</option>
                                        <option value="2">หม้าย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe1">สัญชาติ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ประเภทต่างด้าว</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">อาชีพ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="sex">ที่อยู่</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">หมู่บ้าน</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ตำบล</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">อำเภอ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">จังหวัด</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">เขตเทศบาล/อบต</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ชั้นเรียน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">โรงเรียน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">หมายเลขบัตรประชาชน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="danger">
                            <i className="fa fa-plus-circle fa-lg"></i> <strong>ข้อมูลเกี่ยวกับโรค</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ชื่อโรค</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">รหัส HN</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="sex">ประเภทสถานที่รักษา</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ประเภทผู้ป่วย</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="e0">จังหวัดที่สถานที่รักษาตั้งอยู่</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="pe0">ชื่อสถานที่รักษา* (HSERV)</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ผลการรักษา</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">ความทันเวลา</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="e0">ชนิดของเชื้อ</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">โรคแทรกซ้อน</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="e0">จังหวัดที่หน่วยงานที่บันทึกข้อมูลตั้งอยู่</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="6">
                                <FormGroup>
                                    <Label htmlFor="pe0">หน่วยงานที่บันทึกข้อมูล* (OFFICEID)</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">วันที่เริ่มป่วย</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่พบผู้ป่วย</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">วันตาย</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่เขียนรายงาน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่รับรายงาน</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="success">
                            <i className="fa fa-user-circle-o fa-lg"></i> <strong>ข้อมูลเจ้าของเคส</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="e0">ชื่อผู้นำข้อมูลเข้าสู่ระบบ</Label>
                                    <Input type="text" id="pe0" placeholder="" disabled />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="pe0">จังหวัดที่ตั้งของหน่วยงานเจ้าของเคส</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                                <FormGroup>
                                    <Label htmlFor="e0">หน่วยงานเจ้าของเคส *</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <Alert color="danger">
                            <i className="fa fa-clipboard fa-lg"></i> <strong>สรุปผลการตรวจสอบ</strong>
                        </Alert>
                        <FormGroup row>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">สถานะของเคส</Label>
                                    <Input type="select" name="sex" id="sex" bsSize="md">
                                        <option value="0">กรุณาเลือก</option>
                                        <option value="0">ไม่ระบุ</option>
                                        <option value="1">ไทย</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="pe0">รหัส ICD10</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="2">
                                <FormGroup>
                                    <Label htmlFor="e0">วันที่รับ R506 เข้าสู่ระบบ *</Label>
                                    <Input type="text" id="pe0" placeholder="" disabled />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่เปลี่ยนสถานะของเคส *</Label>
                                    <Input type="text" id="pe0" placeholder="" disabled />
                                </FormGroup>
                            </Col>
                            <Col xs="12" md="3">
                                <FormGroup>
                                    <Label htmlFor="pe0">วันที่ได้รับผลการยินยันจากแพทย์</Label>
                                    <Input type="text" id="pe0" placeholder="" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </div>
                    <div className="card-footer">
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> บันทึก</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Importform;
