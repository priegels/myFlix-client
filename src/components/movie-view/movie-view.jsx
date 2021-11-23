import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";



import { Container, Row, Col, Button } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
        <Container fluid>
            <Row>
              <Col className="movie-poster value"><img className="movie-poster-img" src={movie.ImagePath} /></Col>
            </Row>
            <Row className="movie-title">
              <Col style={{fontSize:"40px"}}>{movie.Title}</Col>
            </Row>
            <Row className="movie-props">
              <Col>
            <Row className="movie-description">
              <Col>Description: </Col>
            </Row>
            <Row className="movie-description-text">
              <Col className="value" md={12}>{movie.Description}</Col>
            </Row>
            <Row className="movie-release-date">
              <Col>Release Date: </Col>
            </Row>
            <Row>
              <Col className="movie-release-date value" md={12}>{movie.ReleaseDate}</Col>
            </Row>
            <Row className="movie-genre">
              <Col className="label">Genre: </Col>
              <Col className="value" md={12}>
              <Link to={`/genres/${movie.Genre}`}>
                <Button className="props-button" variant="link">{movie.Genre}</Button>
              </Link>
              </Col>
            </Row>

            <Row className="movie-director">
              <Col className="label">Director: </Col>
              <Col className="value" md={12}>
              <Link to={`/directors/${movie.Director}`}>
                <Button className="props-button" variant="link">Director</Button>
              </Link>
              </Col>
            </Row>
            </Col>
            </Row>
            <Row>
            <Button className="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
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