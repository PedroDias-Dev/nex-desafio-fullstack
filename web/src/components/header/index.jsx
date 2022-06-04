import React from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap';

import jwt_decode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Toaster />
      <Container>
          <Navbar.Brand href="#home">Nex</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              {
                localStorage.getItem('token') !== null && jwt_decode(localStorage.getItem('token')).role === 'admin' ? 
                <div style={{ display : 'flex'}}>
                  <Nav.Link href="/products">Products</Nav.Link>
                  <Nav.Link onClick={
                    () => {
                      toast('You have logged off.')

                      setTimeout(localStorage.removeItem('token'), 2000);
                    }
                  } href="/login">Logout</Nav.Link>
                </div>
                :
                <div style={{ display : 'flex'}}>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </div>
              }
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
