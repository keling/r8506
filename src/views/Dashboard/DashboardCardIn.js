import React, { Component, lazy, Suspense } from 'react';
import Select from 'react-select';
import axios from "axios";
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

export default class DashboardCardIn extends Component {
    constructor(props) {
        super(props);

        // binding events

        // set current state
        this.state = {
            AuthString:
                "cMhqtcyDfiwnnG9s3ZVfDkxoEcf34tnap4FZzd0zZErAcFo1tRhokPuRkO864DR5",
            dashboardCardIn: {}
        }
    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        console.log(this.props);
        let params = {
            where: {
                chservProvince: "41",
                disease: this.props.diseasecode.id,
                cstatus: {
                    between: [1, 2]
                },
                datedefine: {
                    between: ["2019-01-01", "2019-05-31"]
                }
            }
        }
        let getCount = await axios
            .get("http://203.157.168.91:3000/api/Cases/count", {
                headers: { Authorization: this.state.AuthString },
                params
            })
        console.log(getCount);
        // this.setState({
        //     isLoading: false
        // });

        // console.log(getDisease);
        if (getCount.status != 200) {
            return;
        }

        this.setState({
            dashboardCardIn: getCount.data
        })
    }

    render() {
        return (
            <Card id="card1" className="text-white bg-warning">
                <CardBody className="pb-0">
                    <div>
                        <i className="icon-location-pin"></i> รอตรวจสอบ
                        <span className="text-value pull-right">
                            {this.state.dashboardCardIn.count}
                        </span>
                    </div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '10px' }}>
                </div>
            </Card>
        )
    }
}
