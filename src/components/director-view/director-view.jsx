import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {

    constructor(props) {
      super();
       this.state = {
         movie: this.state,
         Director: []/* ,
         Name: this.state,
         Bio: this.state */ 
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
      const Director = movie.Director;
      axios
        .get(`https://k-flix.herokuapp.com/directors/${Director._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then(response => {
        console.log('response', response )
        // Assign the result to the state
        this.setState({
          Director: response.data.Director
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    render() {
      const { Director } = this.state;
      console.log("Director", Director);
  
      return (
        <Container className="mt-5">  
          <Card>
            <Row>
              <Col xs={12}>
                <h4>Director</h4>
              </Col>
            </Row>
  
            <Row>
              <Col>
                <Card.Body>
                  <Row className="director-body ">
                    <Card>
                    {Director.length > 0 &&
                      Director.map((movie) => {
                        if (
                          movie.Director ===
                          Director.find((dir) => dir === Director._id)
                        ) {
                          return (
                            <Card>
                                <Row
                                className="genre-item card-content"
                                style={{ width: "16rem" }}
                                key={Director._id}>
                                </Row>
                                <Row
                                className="genre-item card-content"
                                style={{ width: "16rem" }}
                                key={Director.Bio}>
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

 DirectorView.prototype = {
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string
    }).isRequired
  };