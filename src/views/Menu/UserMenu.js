import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DropdownItem, DropdownMenu } from 'reactstrap';

class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(e, path_route) {
        this.props.history.push(path_route);
    }

    logout(e) {
        // e.preventDefault();
        localStorage.removeItem('usertoken')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <DropdownMenu right>
                    <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                    <DropdownItem onClick={e => this.routeChange(e, '/profile')}><i className="fa fa-user"></i> Profile</DropdownItem>
                    <DropdownItem onClick={e => this.logout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </DropdownMenu>
            </div>
        );
    }
}

export default withRouter(UserMenu);