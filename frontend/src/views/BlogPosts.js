import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import axios from 'axios';
import Agregar from './Agregar'
import ruta from "../ruta"

var data = JSON.parse(localStorage.getItem('usuario')); 
class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [
      ],
    };
  }

  obtenerUsuarios = async () => {
    let list = []
    await axios.get(ruta.ruta+'/user/getNotFriends/' + data._id)
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
      this.setState({PostsListOne:list})
  }

  render() {
    var {
      PostsListOne,
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="2" title="Blog Posts" subtitle="Components" className="text-sm-left" />

          <Button onClick={this.obtenerUsuarios} size="sm" theme="white">
            <i className="far fa-address-book mr-1" /> Mostrar Usuarios
          </Button>
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post) => (
            <Agregar post={post}/>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
