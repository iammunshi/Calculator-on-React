import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


class Home extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.home = this.home.bind(this);

        this.profile = this.profile.bind(this);
        this.addAd = this.addAd.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.logout = this.logout.bind(this);
        // this.state = {
        //     isRegister: false,
        //     isLogin: false,
        //     changePassword: false,
        //     addItem: false
        // }
        this.state = {
            isOpen: false,
            // isRegister: this.props.flags.isRegister,
            // isLogin: this.props.flags.isLogin,
            // changePassword: this.props.flags.changePassword,
            // addItem: this.props.flags.addItem,
            user: this.props.user
        };
        console.log("user", this.props.flags.user)
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    register() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.register();
    }
    login() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.login();
    }
    home() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.home();
    }
    profile() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.profile();
    }
    addAd() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.addAd();
    }
    changePassword() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.changePassword();
    }
    logout() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.logout();
    }
    
    static getDerivedStateFromProps(props, state) {
        // Update state so the next render will show the fallback UI.
        return { user: props.user };
    }
    render() {
        const {
            // isRegister, 
            // isLogin, 
            user,
            // changePassword, addItem
        } = this.state;
        console.log("userHeader", user)
        //console.log('log', isLogin)
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand onClick={this.home}>Expertizo-Bech dey</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.profile}>Profile</NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.addAd}>Add Ad</NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.changePassword}>Change Password</NavLink>
                                </NavItem>
                            }
                            {user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.logout}>Logout</NavLink>
                                </NavItem>
                            }
                            {
                                !user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.home}>Home</NavLink>
                                </NavItem>
                            }
                            {
                                !user &&
                                <NavItem>
                                    <NavLink href="#" onClick={this.login}>Login</NavLink>
                                </NavItem>
                            }


                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                  </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                  </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Home;