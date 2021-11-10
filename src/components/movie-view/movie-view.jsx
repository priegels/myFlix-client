import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="movie-view-container">
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-title">
                <span className="title">Title: </span>
                <span className="value">{movie.Title} </span>
              </div>
              <div className="movie-release-date">
                <span className="release-date">Release Date: </span>
                <span className="value">{movie.ReleaseDate} </span>
              </div>
              <div className="movie-description">
                <span className="description">Description: </span>
                <span className="value">{movie.Description} </span>
              </div>
              <div className="movie-genre">
                <span className="genre">Genre: </span>
                <span className="value">{movie.Genre} </span>
              </div>
              <div className="genre-description">
                <span className="genre">Description: </span>
                <span className="value">{movie.Genre.Description} </span>
              </div>
              <div className="movie-director">
                <span className="director">Director: </span>
                <span className="value">{movie.Director.Name} </span>
              </div>
              <div className="director-bio">
                <span className="director">Bio: </span>
                <span className="value">{movie.Director.Bio} </span>
              </div>
              <div className="movie-view-button-div">
                <Button className="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseDate: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};