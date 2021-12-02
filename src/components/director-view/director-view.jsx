import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {

    const { director, onBackClick } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col className="director-image value"><img className="director-img" src={director.ImagePath} /></Col>
        </Row>
        <Row className="director-name">
          <Col style={{fontSize:"40px"}}>{director.Name}</Col>
        </Row>

        <Row className="director-props">
          <Col>
            <Row className="director-bio">
              <Col>Bio: </Col>
            </Row>
            <Row className="director-bio-content">
              <Col className="value" md={12}>{director.Bio}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="buttons">
          <Button className="director-back-button" onClick={() => { onBackClick(null); }}>Back</Button>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      ImagePath: PropTypes.string
    }).isRequired,
  })
};