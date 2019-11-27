import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      AuthString:
        "Cj6Pxm7pSEBIzksNInPgZfJX2sXsnSJCVEwukFI9dtfruDgU6tfs7bEIhbsA6HhE",
      users: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://203.157.168.91:3000/api/Userr8506s", {
        headers: { Authorization: this.state.AuthString },
        params: {
          filter: {
            limit: "10"
          }
        }
      })
      .then(response => {
        this.setState({
          users: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  }

  render() {
    //const userList = usersData.filter((user) => user.id < 10)
    const { isLoading, users } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">เจ้าหน้าที่</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Active</th>
                      <th scope="col"><center>#</center></th>
                    </tr>
                  </thead>
                  <tbody>
                  {!isLoading ? (
                    users.map(user => {
                      const {
                        iduser,
                        username,
                        name,
                        idrole,
                        active
                      } = user;
                      return (
                        <tr key={iduser}>
                          <td>{username}</td>
                          <td>{name}</td>
                          <td>{idrole}</td>
                          <td>{active}</td>
                          <td>
                            <Button
                              block
                              color="warning"
                              size="xs"
                              className="btn-pill"
                            >
                              Edit
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
      </div>
    )
  }
}

export default Users;
