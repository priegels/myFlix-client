import React, { useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

import { Form, Button, Container, Card} from 'react-bootstrap';
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
      alert('Wrong username or password.')
    });
  };

  return (

    <Container fluid className="register-container">
      
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
          <Button className="login-button" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <Link to={`/register`}>
            <Button className="login-register-button" variant="link">
            Register
            </Button>
          </Link>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  );
}