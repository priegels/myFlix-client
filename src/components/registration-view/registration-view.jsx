import React, { useState } from 'react';
import {Form, Button, Container, Navbar, Nav, FormControl, Card} from 'react-bootstrap';
import './registration-view.scss';
import '../navbar/navbar.scss';

import LogoImage from '../../img/logo.png';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, Birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onRegistration(username);
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
      
      <Card className="register-card" style={{ width: '18rem', color: "#fff" }}>
        <Card.Body>
          <Card.Title className="text-center">안녕하세요! <br /> Welcome to K-Flix.</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please register</Card.Subtitle>
        
          <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter a username" 
              />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="text" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength="8" 
              placeholder="Enter a password (min. 8 characters)"
              />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="Enter a valid email address"
              />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday:</Form.Label> 
            <Form.Control
              type="date"
              value={Birthday}
              onChange={e => setBirthday(e.target.value)}
              required
              />
          </Form.Group>
            <br />
          <Button className="register-button" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  );
}