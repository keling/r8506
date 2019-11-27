import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/logo-mini.png'
import jwt_decode from 'jwt-decode';
import UserMenu from '../../views/Menu/UserMenu'
import GuestMenu from '../../views/Menu/GuestMenu'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor() {
    super()
    this.state = {
      iduser: '',
      menuItem: ''
    }
    this.routeChange = this.routeChange.bind(this);
    this.checkAuthen = this.checkAuthen.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken
    if (token) {
      const decoded = jwt_decode(token)
      this.setState({
        iduser: decoded.iduser
      })
      this.checkAuthen(decoded.iduser)
    } else {
      this.checkAuthen('')
    }
  }

  routeChange(e, path_rout) {
    this.props.history.push(path_rout);
  }

  checkAuthen(id) {
    if (id != '') {
      this.setState({
        menuItem: <UserMenu/>
      })
    } else {
      this.setState({
        menuItem: <GuestMenu/>
      })
    }
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'R8-506' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'R8-506' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/user.png'} className="img-avatar" alt="" />
            </DropdownToggle>
            {this.state.menuItem}
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
