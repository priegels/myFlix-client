import React from 'react';
// axios library to import database's API
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

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
      user: null
    };
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

  render() {
    
    const { movies, user } = this.state;

/* if there is no user, the LoginView is rendered. If there is a user
logged in, the user details are passed as a prop to the LoginView */

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>    
    if (movies.length === 0) return <div className="main-view" />;
      
    return (
      <Router>
        <div className="main-view">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            //Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => { 
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } /> 

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </div>


     </Router>
    );
  }
}