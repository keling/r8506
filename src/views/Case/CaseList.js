import React, { Component, PropTypes } from 'react';
import { Badge, Button, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { ACCESS_TOKEN, URL_API } from '../Settings/Config';
import axios from 'axios';

class CaseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cases: [],
            isLoading: true
        }
        // this.getCase = this.getCase.bind(this);
    }

    componentDidMount() {
        const token = localStorage.usertoken
        if (token) {
            this.getCase()
        } else {
            this.props.history.push('/login');
        }
    }

    getCase() {
        axios
        .get(`${URL_API}/Cases`, {
            headers: { Authorization: ACCESS_TOKEN },
            params: {
                filter: {
                    // where: { cimportDate: { between: ["2019-11-20", "2019-12-13"] } },
                    order: "idcase DESC",
                    limit: 15
                }
            }
        })
        .then(res => {
            this.setState({
                cases: res.data,
                isLoading: false
            });
        })
        .catch(error => {
            console.log("error " + error);
        });
    }

    editCase(idcase) {
        // console.log(idcase)
        this.props.history.push({
            pathname: '/imports/importform',
            state: {
                idcase: idcase
            }
        });
    }

    render() {
        let i = 1;
        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        <i className="icon-list"></i> รายการ Case
                    </div>
                    <div className="card-body">
                    <Table hover bordered striped responsive size="sm" id="scrolltable">
                        <thead>
                        <tr>
                            <th width="150"><center>#</center></th>
                            <th><center>ลำดับ</center></th>
                            <th><center>สถานะ</center></th>
                            <th>หน่วยงานที่รับผิดชอบ</th>
                            <th>ชื่อโรค</th>
                            <th><center>หมายเลขเคส</center></th> 
                            <th>ชื่อผู้ป่วย</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!this.state.isLoading ? (
                            this.state.cases.map(c => {
                                return(
                                <tr key={c.idcase}>
                                    <td><center><Button color="warning" size="sm" className="btn-pill" onClick={() => this.editCase(c.idcase)}>แก้ไข</Button>&nbsp;<Button color="success" size="sm" className="btn-pill">ทีม</Button>&nbsp;<Button color="info" size="sm" className="btn-pill">ประวัติ</Button></center></td>
                                    <td><center>{i++}</center></td>
                                    <td><center><Badge color="success">Active</Badge></center></td>
                                    <td></td>
                                    <td></td>
                                    <td><center>{c.idcase}</center></td>
                                    <td>{c.name}</td>
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
                        <nav>
                        <Pagination>
                            <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                            <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

CaseList.propTypes = {

};

export default CaseList;