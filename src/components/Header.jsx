import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Button } from 'reactstrap';
import { connect } from "react-redux";

import {logoutUser} from "../Action/index"


class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }


    render () {
        if (!this.props.a) {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <Link to="/">simpleMerce</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">All Product</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/Register" >
                                        <Button color="primary">Register</Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/Login" >
                                        <Button color="secondary">Login</Button>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                )
        } else {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <Link to="/">simpleMerce</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">All Product</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Options
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/ManageProducts">Manage Products</NavLink>
                                            </NavItem>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Hai {this.props.a}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/Login" onClick={this.props.logoutUser} >Log Out</NavLink>
                                            </NavItem>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                )
        }
    }
}

// function utk mengambil data di redux state
const mapStateToProps = b => {
    return {
        a : b.auth.username
    }
}


export default connect(mapStateToProps,{logoutUser})(Header)