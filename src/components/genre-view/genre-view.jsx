import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor(props) {
      super();
       this.state = {
         movie: this.state,
         Genre: []/* ,
         Name: this.state,
         Description: this.state */ 
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
      const Genre = movie.Genre;
      axios
        .get(`https://k-flix.herokuapp.com/genres/${Genre._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then(response => {
        console.log('response', response )
        // Assign the result to the state
        this.setState({
          Genre: response.data.Genre
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    render() {
      const { Genre } = this.state;
  
      return (
        <Container className="mt-5">  
          <Card>
            <Row>
              <Col xs={12}>
                <h4>Genre</h4>
              </Col>
            </Row>
  
            <Row>
              <Col>
                <Card.Body>
                  <Row className="genre-body ">
                    <Card>
                    {Genre.length > 0 &&
                      Genre.map((movie) => {
                        if (
                          movie.Genre ===
                          Genre.find((gen) => gen === Genre._id)
                        ) {
                          return (
                            <Card>
                                <Row
                                className="genre-item card-content"
                                style={{ width: "16rem" }}
                                key={Genre._id}>
                                </Row>
                                <Row
                                className="genre-item card-content"
                                style={{ width: "16rem" }}
                                key={Genre.Description}>
                                </Row>
                              </Card>
                          )}}
                      )
                      }   
                    </Card>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      );
    }
  }

 GenreView.prototype = {
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired
  };