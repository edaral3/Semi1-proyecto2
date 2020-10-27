import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
} from "shards-react";
import Button from '@material-ui/core/Button';
import ChatCasos from "./chatCasos";
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Agregar from './Agregar'
import axios from 'axios';
import ruta from "../ruta"

var data = JSON.parse(localStorage.getItem('usuario'));
var listaUsers = []



class Chats extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      mensaje: '',
      mensajes: [],
      PostsListOne: [],
    };
  }

  obtenerUsuarios = async () => {
    let list = []
    await axios.get(ruta + '/user/getFriends/' + data._id)
      .then(result => {
        result.data.users.forEach((user) => {
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
    this.setState({ PostsListOne: list })
  }
  render() {
    return (
      <div>

        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <Card small>
              <Toolbar>
                <Typography type="title" color="inherit">
                  <ChatCasos />
                </Typography>
              </Toolbar>
            </Card>
          </Row>

          <Row>
            <Button onClick={this.obtenerUsuarios} size="sm" theme="white">
              <i className="far fa-address-book mr-1" /> Mostrar Usuarios
          </Button>
          </Row>
          <br></br>
          {/* First Row of Posts */}
          <Row>
            {this.state.PostsListOne.map((post) => (
              <Agregar post={post} />
            ))}
          </Row>
        </Container>

      </div>
    );
  }
}

export default Chats;
