import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/admin/menu-list" className="nav-link">
              Menu List
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/admin/projects" className="nav-link">
              Projects
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={'https://image.flaticon.com/icons/svg/145/145843.svg'}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
