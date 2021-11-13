import React from 'react';
// axios library to import database's API
import axios from 'axios';

import {Row, Col, Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import '../navbar/navbar.scss'
import LogoImage from '../../img/logo.png'

export class MainView extends React.Component {

  //constructor initializing a state's values before render()
  constructor(){
    super();
// initial state set to null
    this.state = {
      movies: [],
      selectedMovie: null,
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

/* When a movie is clicked, this function is invoked and updates the state of the
'selectedMovie' property to that movie*/

//custom component method 
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

// When a user successfully registers

  onRegistration(register) {
    this.setState({
      register,
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

//condensed version featuring object destruction
  render() {
    
    const { movies, selectedMovie, user, register } = this.state;

/* if there is no user, the LoginView is rendered. If there is a user
logged in, the user details are passed as a prop to the LoginView */

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

// Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        
      <Navbar className="navbar navbarColor" expand="lg">
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

        {/*If the state of selectedMovie is not null, that selected Movie will be returned,
        otherwise all movies will be returned*/}
        {selectedMovie 
          ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            </Row>
          )
          : (
            <Row className="justify-content-md-center">
            {movies.map(movie => (
              <Col md={3}>
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              </Col>
            ))}
          </Row>
          )
        }
      </div>
    );
  }

}

