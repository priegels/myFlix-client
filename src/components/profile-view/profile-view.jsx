import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  //profile

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://k-flix.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies 
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // edit profile

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://k-flix.herokuapp.com/users/${username}`,
    {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday
      });
      localStorage.setItem('user', this.state.Username);
      const data = response.data;
      console.log(data);
      console.log(this.state.Username);
      alert("Profile has been updated.");
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // Delete FavMovie 

  onRemoveFavorite() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://k-flix.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log(response);
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Delete user

  onDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://k-flix.herokuapp.com/users(${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log(response);
      alert('Profile has been deleted.');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.open('/', '_self');
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {

    const { onBackClick, movies, user } = this.props;

    const FavoriteMovies = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id)
    });

    return (
      <Container className="profile-view">

        <Container className="d-flex flex-row justify-content-end align-items-baseline">
          <div className="mr-2">
            <p>Signed in as <span> <Link to={`users/${user}`}>{this.state.Username}</Link> </span> </p>
          </div>
          <Button variant ="danger" onClick={() => { this.onLoggedOut() }}>Log out</Button>
          <Button className="back-profile-button" variant="danger" onClick={() => { onBackClick() }}>Back</Button>
        </Container>

        <Row>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <h4>My Profile</h4>
                <h6> Username </h6>
                  <p>{this.state.Username}</p>
                <h6> Email </h6>
                  <p>{this.state.Email}</p>
                <h6>Birthday</h6>
                  <p>{this.state.Birthday}</p>           
                <Button variant="danger" onClick={() => this.onDeleteUser()}>Delete Profile</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h4>Edit Profile</h4>
                <Form className="form-user" onSubmit={(e) => this.editUser(e)}>
                  <Form.Group>
                    Username
                    <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
                  </Form.Group>
                  <Form.Group>
                    Password
                    <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />
                  </Form.Group>
                  <Form.Group>
                    Email
                    <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group>
                    Username
                    <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} required />
                  </Form.Group>
                  <Button variant="success" type="submit" >Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
          <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {FavoriteMovies.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie._id}>
              <MovieCard movie={movie} />
              <Button className="unfavorite-movie-button" variant="danger" onClick={() => { this.onRemoveFavorite(movie._id) }} >Remove Favorite</Button>
            </Col>
            ))
          }
        </Row>

      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};