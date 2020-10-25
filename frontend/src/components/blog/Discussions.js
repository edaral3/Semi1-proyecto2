import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  Form,
  FormInput
} from "shards-react";
import axios from 'axios';
import Lista from './Lista';


var data = JSON.parse(localStorage.getItem('usuario'));
var data2 = JSON.parse(localStorage.getItem('usuarios'));
class Discussions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: "",
      publicaciones: []
    }
  }

  actualizarSearch = (e) => {
    this.state.search = e.target.value
  }

  filtrar = async () => {
    let lista = []
    this.state.search = this.state.search == "" ? "All" : this.state.search
    await axios.get('http://54.163.33.24/publication/get/' + data._id + '/' + this.state.search)
      .then(result => {
        //result.data.publications
        result.data.publications.forEach(publicacion => {
          let item = {
            date: `${publicacion.date_iso.split("T")[0]} ${publicacion.date_iso.split("T")[1]}`,
            author: {
              image: require("../../images/avatars/3.jpg"),
              name: "John Doe",
            },
            url: publicacion.image,
            body: publicacion.description,
            etiquetas: publicacion.labels,
            user: "usuario"
          }
          data2.forEach(usr => {
            if (usr._id == publicacion.idUser) {
              item.user = usr.body
            }
            if (publicacion.idUser == data._id) {
              item.user = data.fullname
            }
          })
          lista.push(item)
        })
      })
      .catch()

    console.log(data)
    this.setState({ publicaciones: lista })
  }

  render() {
    return (

      <Card small className="blog-comments">

        <CardHeader className="border-bottom">
          <h6 className="m-0">Publicaciones</h6>
          <FormInput
            onChange={this.actualizarSearch.bind(this)}
          />
          <Button onClick={this.filtrar} theme="white">
            <span className="text-light">
            </span>{" "}
                  Filtrar
      </Button>
        </CardHeader>

        <Lista items={this.state.publicaciones} />


        <CardFooter className="border-top">
          <Row>
            <Col className="text-center view-report">
            </Col>
          </Row>
        </CardFooter>
      </Card>
    )
  };
}

export default Discussions;
