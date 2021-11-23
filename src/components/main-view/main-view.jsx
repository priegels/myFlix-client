import React from 'react';
// axios library to import database's API
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

// #0
import { setMovies } from '../../actions/actions';

// not yet included
import MoviesList from '../movies-list/movies-list';

import {Row, Col, Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
// will be imported and used in MoviesList 
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';


import '../navbar/navbar.scss';
import LogoImage from '../../img/logo.png';

class MainView extends React.Component {

  //constructor initializing a state's values before render()
  constructor(){
    super();
// initial state set to null
    this.state = {
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
    this.props.setMovies(response.data);
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  render() {
    
    let { movies } = this.props;
    let { user } = this.state;
    console.log("movies", this.state.movies);
    
    return (
      <Router>

        <Container fluid>
          <Navbar className="navbar-header" expand="lg">
            <Navbar.Brand className="navbar-logo" href="/">
              <img src={LogoImage}
              className="navbar-logo d-inline-block align-top"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="navbar-link" href="/">Home</Nav.Link>
                <Nav.Link className="navbar-link" href="/users/${user}">Profile</Nav.Link>
                <Nav.Link href="#logout">
                  <Button className="navbar-logout" variant="primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> 

        <Row className="main-view">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            //Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies}/>;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />

            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={12}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
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

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director._id === match.params.directorId).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/users/:username" render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view"></div>;

            return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
          }
          }/>

        </Row>

        </Container>

     </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);