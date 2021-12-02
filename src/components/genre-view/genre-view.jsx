import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Container fluid>
        <Row className="genre-name">
          <Col style={{fontSize:"40px"}}>{genre.Name}</Col>
        </Row>

        <Row className="genre-props">
          <Col>
            <Row className="genre-description">
              <Col>Description: </Col>
            </Row>
            <Row className="genre-description-content">
              <Col className="value" md={12}>{genre.Description}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Button className="genre-back-button" onClick={() => { onBackClick(null); }}>Back</Button>
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
  })
};