import React, { useState } from 'react';
import axios from 'axios';

import {Navbar, Nav, Form, FormControl, Button, Container, Card} from 'react-bootstrap';
import './login-view.scss';
import '../navbar/navbar.scss';
import LogoImage from '../../img/logo.png';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  //handling authentication 
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication, POST request */
    axios.post('http://k-flix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      //(data) instead of (username) for token
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (

    <Container fluid className="register-container">
     
      <Navbar className="navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand className="navbar-logo" href="#home">
            <img src={LogoImage}
            className="navbar-logo d-inline-block align-top"/>
           </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Card className="loginCard" style={{ width: '18rem', color: '#fff' }}>
        <Card.Body>
          <Card.Title className="text-center">안녕하세요! <br /> Welcome to K-Flix.</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please login</Card.Subtitle>
        
          <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              onChange={e => setUsername(e.target.value)}
              />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="text" 
              onChange={e => setPassword(e.target.value)}
              />
          </Form.Group>
            <br />
          <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <Button className="login-register-button" variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  );
}