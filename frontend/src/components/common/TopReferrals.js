import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  Button,
  FormSelect
} from "shards-react";
import axios from 'axios';

import ruta from "../../ruta"

var data = JSON.parse(localStorage.getItem('usuario'))

class TopReferrals extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      friends: [],
    }
  }
  
  
  obtenerUsuarios = async () => {
    let list = []
  
    await axios.get(ruta + '/user/getFriends/' + data._id)
      .then(result => {
        result.data.users.forEach((user)=>{
          let item = {
            backgroundImage: user.profileImage,
            title: user.username,
            body: user.fullname,
            _id: user._id
          }
          list.push(item)
        })
      })
      .catch()
      
      localStorage.setItem('usuarios', JSON.stringify(list))
      this.setState({friends:list})
  }

  render() {
    return (
      <Card small>
        <CardHeader className="border-bottom">
          <Row>
            <Col>
              <h6 className="m-0">Mis Amigos</h6>
            </Col>
            <Col>
              <Button onClick={this.obtenerUsuarios}>
                Mostrar
        </Button>
            </Col>
          </Row>

          <div className="block-handle" />
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup small flush className="list-group-small">
            {this.state.friends.map((item) => (
              <ListGroupItem className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">{item.body}</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  {item.title}
                </span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>

        <CardFooter className="border-top">
          <Row>
            {/* Time Span */}
            

            {/* View Full Report */}
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
            </Col>
          </Row>
        </CardFooter>
      </Card>
    )
  };
}
export default TopReferrals;
