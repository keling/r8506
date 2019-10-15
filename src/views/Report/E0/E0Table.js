import React, { Component } from "react";
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
    Progress,
    Row,
    Table,
    FormGroup,
    Label,
    Input

} from 'reactstrap';
import {
    ACCESS_TOKEN,
    URL_API
} from './E0Settings';

export default class E0Tables extends Component {
    constructor(props) {
        super(props)

        this.state = {
            params: {}
        };
    }

    render() {
        return (
            this.props.params.map(datax => (
                <tr>
                    <th scope="row">1</th>
                    <td>hhhhhh</td>
                    <td>nnnhhh</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
            ))
        );
    }
}
