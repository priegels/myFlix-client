import React from 'react';
// axios library to import database's API
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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

// adding ajax code to componentDidMount()  
  componentDidMount(){
    axios.get('http://k-flix.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
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
to that particular user */

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

//condensed version featuring object destruction
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

/* if there is no user, the LoginView is rendered. If there is a user
logged in, the user details are passed as a prop to the LoginView */

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

// Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of selectedMovie is not null, that selected Movie will be returned,
        otherwise all movies will be returned*/}
        {selectedMovie 
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}

