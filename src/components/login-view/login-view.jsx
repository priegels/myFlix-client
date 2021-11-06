import React, { useState } from 'react';
import {Navbar, Nav, Form, FormControl, Button, Container, Card} from 'react-bootstrap';
import './login-view.scss';
import '../navbar/navbar.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onLoggedIn(username);
  };

  return (

    <Container fluid className="registerContainer">
     
      <Navbar className="navbarColor" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">K-Flix</Navbar.Brand>
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
      
      <Card className="loginCard" style={{ width: '18rem' }}>
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
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  );
}