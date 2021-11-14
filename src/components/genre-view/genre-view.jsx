import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';
import './genre-view.scss';
import axios from 'axios';

export class GenreView extends React.Component {

  constructor(props) {
    super();
      this.state = {
        movie: this.state,
        genre: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getGenre(accessToken);
    }
  }

  getGenre(token) {
    const movie = this.state;
    const genre = movie.Genre;
    axios.get(`https://k-flix.herokuapp.com/genres/`, {
      headers: { Authorization: `Bearer $(token)` },
    })
    .then(response => {
      console.log('response', response)
      this.setState({
        genre: response.data.Genre
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Container fluid className="genre-view-container">
      <Row>
        <Col>
          <div className="genre-view">
            <div className="genre-name">
              <span className="genre">Genre: </span>
              <span className="value">{genre} </span>
            </div>
            <div className="genre-description">
              <span className="genre">Description: </span>
              <span className="value">{genre.Description} </span>
            </div>
          </div>
        </Col>
      </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
};