import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../hooks/useLocalStorage';

/* Renders navbar */
function NavBar({ setUser, user }) {
    const [, updateToken] = useLocalStorage();
    const isAdmin = user.isAdmin;
    const navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Stellar Travel</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/missions/new">
                            <Nav.Link>Book!</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Planning" id="collasible-nav-dropdown">
                            <LinkContainer to="/planets">
                                <NavDropdown.Item>Destinations</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/astronauts">
                                <NavDropdown.Item >Astronauts</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/spacecraft">
                                <NavDropdown.Item>Spacecraft</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/launchsites">
                                <NavDropdown.Item>Launchsites</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        {isAdmin &&
                            <NavDropdown title="Admin" id="collasible-nav-dropdown">
                                <LinkContainer to="/users">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/users/new">
                                    <NavDropdown.Item>Add User</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/missions">
                                    <NavDropdown.Item>Missions</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                    </Nav>
                    <Nav>
                        {!user.id &&
                            <LinkContainer to="/auth/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                        }
                        {!user.id &&
                            <LinkContainer to="/auth/login">
                                <Nav.Link >Login</Nav.Link>
                            </LinkContainer>
                        }
                        {user.id &&
                            <LinkContainer to="/">
                                <Nav.Link onClick={(e) => {
                                    e.preventDefault();
                                    updateToken();
                                    setUser({});
                                    navigate('/');
                                    window.flash('You\'ve been logged out.', 'success');
                                }}
                                >Logout
                                </Nav.Link>
                            </LinkContainer>
                        }
                        {user?.id &&
                            <NavDropdown title="Profile" id="collasible-nav-dropdown">
                                <LinkContainer to={`/users/${user.id}`}>
                                    <NavDropdown.Item>My Details</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/missions/my">
                                    <NavDropdown.Item>My Missions</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;