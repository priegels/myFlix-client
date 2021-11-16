import React, { useState } from 'react';
import axios from 'axios';

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
    axios.post('https://k-flix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: Birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); //'_self' is necessary to open the page in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (

    <Container fluid className="register-container">
      
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