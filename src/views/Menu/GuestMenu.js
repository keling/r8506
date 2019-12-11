import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DropdownItem, DropdownMenu } from 'reactstrap';

class GuestMenu extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }
    
    routeChange(e, path_rout) {
        this.props.history.push(path_rout);
    }

    render() {
        return (
            <div>
                <DropdownMenu right>
                    <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                    <DropdownItem onClick={e => this.routeChange(e, '/login')}><i className="fa fa-lock"></i> Login</DropdownItem>
                </DropdownMenu>
            </div>
        );
    }
}

export default withRouter(GuestMenu);