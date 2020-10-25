import React from "react";
import Webcam from "react-webcam";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

import { Link } from 'react-router-dom';
import { FormCheckbox } from "shards-react";
import axios from 'axios';

const videoConstraints = {
  width: 500,
  height: 300,
  facingMode: "user"
};

var data = JSON.parse(localStorage.getItem('usuario'));

var usuario = "";
var nombre = "";
var state = "";
var imagen = "";
var contrasena = "";
var usuarioActualizado = ""

if (data != null) {
  usuario = data.username;
  nombre = data.fullname;
  state = data.modeBot;
  imagen = "";
}

class CompleteFormExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: data,
      usuarioActualizado: ""
    };
  }
  registrar = async() => {
    if (usuario == undefined || usuario == "") {
      usuario = data.username
    }
    if (nombre == undefined || nombre == "") {
      nombre = data.fullname
    }
    if (state == undefined) {
      state = data.modeBot
    }
    let body = {
      user: usuario,
      name: nombre,
      modeBot: this.state.modeBot,
      sourceBase64: imagen,
      pass: contrasena
    }
    console.log(body)
    await axios.put('http://54.163.33.24/user/update/' + data._id, body)
      .then(result => {
        console.log(result.data)
      })
      .catch()

    body = {
      user: usuario,
      pass: contrasena
    }
    await axios.post('http://54.163.33.24/user/login', body)
      .then(result => {
        if (result.data.message != "Usuario o contraseña no valido") {
          localStorage.setItem('usuario', JSON.stringify(result.data.user))
        }
      })
      .catch()
      data = JSON.parse(localStorage.getItem('usuario'));
      usuarioActualizado = "Usuario Actualizado"
      console.log(data)
      this.setState({data:data,usuarioActualizado:usuarioActualizado})
  }

  doClick() {
    let file = document.getElementById("input").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      imagen = reader.result
    };
  }

  actualizarNombre = (e) => {
    nombre = e.target.value
  }
  actualizarUsario = (e) => {
    usuario = e.target.value
  }
  actualizarContra1 = (e) => {
    contrasena = e.target.value
  }
  obtenerCheck = () => {
    this.state.modeBot = !this.state.modeBot
  }

  render(){
  return (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
        </Row>
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmailAddress">Nombre Completo</label>
                  <FormInput
                    onChange={this.actualizarNombre.bind(this)}
                    id="feEmailAddress"
                    type="user"
                    placeholder={this.state.data.fullname}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmailAddress">Usuario</label>
                  <FormInput
                    onChange={this.actualizarUsario.bind(this)}
                    id="user"
                    type="user"
                    placeholder={this.state.data.username}
                  />
                </Col>
                <Col md="6">
                  <label htmlFor="fePassword">Contraseña</label>
                  <FormInput
                    onChange={this.actualizarContra1.bind(this)}
                    id="fePassword"
                    type="password"
                    placeholder="******"
                  />
                </Col>
                <Col md="6">
                  <br></br>
                  <FormCheckbox toggle small
                    defaultChecked={this.state.data.modeBot}
                    onClick={this.obtenerCheck}>
                    Modo Bot
                    </FormCheckbox>
                </Col>
              </Row>
              <br></br>

            </Form>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <img src={this.state.data.profileImage} width="500" height="300" />
          </Col>
          <Col md="6">
            <input type="file" id="input" onChange={this.doClick}></input>
            <br></br>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={this.registrar}
              type="submit">
              Actualizar
                  </Button></Col>
        </Row>
        <br></br>
        <Row>

          <Col>{this.state.usuarioActualizado} </Col>
          <Col>
            <br></br>
          </Col>
        </Row>
        <Row>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
}}
export default CompleteFormExample;
