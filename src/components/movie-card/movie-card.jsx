import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom"; 

import {Card, Button, Row, Col, Container} from 'react-bootstrap';
import './movie-card.scss';
import '../navbar/navbar.scss'

export class MovieCard extends React.Component {

  render() {

    const { movie } = this.props;

      return (
        <Container fluid className="movie-card-container">
          <Row>
            <Col>
            <Card className="movie-card" backgroundColor={'Dark'}>
              <Card.Img className="movie-card-image" variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="movie-card-button" variant="link">Open</Button>
                </Link>
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
