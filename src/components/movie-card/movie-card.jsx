import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Card, Button, Row, Col, Container} from 'react-bootstrap';

import './movie-card.scss';
import '../navbar/navbar.scss'

export class MovieCard extends React.Component {

  render() {

    const { movie, onMovieClick } = this.props;

      return (
        <Container fluid className="movie-card-container">
          <Row>
            <Col>
            <Card className="movie-card" backgroundColor={'Dark'}>
              <Card.Img className="movie-card-image" variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button className="movie-card-button" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
              </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  }

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
