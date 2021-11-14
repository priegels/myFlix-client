import React from 'react';
// axios library to import database's API
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";

import {Row, Col, Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';

import '../navbar/navbar.scss'
import LogoImage from '../../img/logo.png'

export class MainView extends React.Component {

  //constructor initializing a state's values before render()
  constructor(){
    super();
// initial state set to null
    this.state = {
      movies: [],
      user: null
    };
  }

// persisting login data
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

/* getMovies, GET request with Axios to 'movies' endpoint of API */
getMovies(token) {
  axios.get('http://k-flix.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

/* When a user successfully logs in, this function updates the 'user' property in state
to that particular user, storing login data in LocalStorage */

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

//Logging out deletes token and user from localStorage and clears user state
onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

  render() {
    
    const { movies, user } = this.state;

    return (

      <Router>

        <Container fluid>
          <Navbar className="navbar navbarColor" expand="lg">
            <Navbar.Brand className="navbar-logo" href="#home">
              <img src={LogoImage}
              className="navbar-logo d-inline-block align-top"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#profile">Profile</Nav.Link>
                <Nav.Link href="#logout">
                  <button onClick={() => { this.onLoggedOut() }}>Logout</button>
                </Nav.Link>
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
          </Navbar> 
        </Container>

        <div>
          <Container>
            <Row className="justify-content-md-center">

                <Route exact path="/" render={() => {

                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  //Before movies have loaded
                  if (movies.length === 0) return (<div className="main-view" />);
                  return movies.map(m => (
                    <Col sm={6} md={4} lg={3} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                  ))
                }} />

                <Route path="/register" render={() => {
                  if (user) return <Redirect to="/" />
                  return <Col>
                    <RegistrationView />
                  </Col>
                }} />

                <Route path="/users/:username" render={({ history }) => {
                  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

                  if (movies.length === 0) return <div className="main-view"></div>;

                  return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                }}/>

                <Route path="/movies/:movieId" render={({ match, history }) => {
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  if (movies.length === 0) return (<div className="main-view" />);
                  return <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  </Col>
                }} />

                <Route path="directors/:name" render={({ match, history }) => {

                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>
                }
                } />

                <Route path="/genres/:name" render={({ match, history }) => {

                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                    <GenreView genre={movies.find(m => m.Genre._id === match.params.genreId).Genre} onBackClick={() => history.goBack()} />
                  </Col>
                }
                } /> 

            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

