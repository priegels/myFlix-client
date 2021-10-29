import React from 'react';

export class MainView extends React.Component {

  //constructor initializing a state's values before render()
  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
      ]
    }
  }

  /* old version written out
  render() {
    const movies = this.state.movies;
    if (movies.length === 0){
      return <div className="main-view">The list is empty!</div>
    } else {
      return (
        <div className="main-view">
          {movies.map((movie) => {
            return <div>{movie.Title}</div>;
          })}
        </div>
      );
    }
  }
} */


//condensed version featuring object destruction
  render() {
    const { movies } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
      </div>
    );
  }
}
