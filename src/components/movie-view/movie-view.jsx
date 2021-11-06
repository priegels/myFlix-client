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
              <div>
                <Button className="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}


 /*     <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>     
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

        </div>
    );
  }
}

*/

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseDate: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};