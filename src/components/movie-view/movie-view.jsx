import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";



import { Container, Row, Col, Button } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row className="mt-5 pt-5">
          <Col>
            <Row>
              <Col className="movie-poster value"><img src={movie.ImagePath} /></Col>
            </Row>
            <Row className="movie-title">
              <Col className="value pb-5" style={{fontSize:"40px"}}>{movie.Title}</Col>
            </Row>
            <Row className="movie-description">
              <Col className="label pt-2"md={2}>Description: </Col>
            </Row>
            <Row className="movie-description">
              <Col className="value">{movie.Description}</Col>
            </Row>
            <Row className="movie-release-date">
              <Col className="label pt-2"md={2}>Release Date: </Col>
              <Col className="value">{movie.ReleaseDate}</Col>
            </Row>
            <Row className="movie-genre">
              <Col className="label" md={2}>Genre: </Col>
              <Col className="value">
              <Link to={`/genres/${movie.Genre}`}>
                <Button variant="link">{movie.Genre}</Button>
              </Link>
              </Col>
            </Row>

            <Row className="movie-director">
              <Col className="label"md={2}>Director: </Col>
              <Col className="value">
              <Link to={`/directors/${movie.Director}`}>
                <Button variant="link">Director</Button>
              </Link>
              </Col>
            </Row>
            <Button className="mt-3" variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
       </div>
       
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