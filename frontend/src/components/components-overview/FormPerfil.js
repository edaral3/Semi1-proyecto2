import React from "react";
import Webcam from "react-webcam";
import usr from '../../userLoguin';
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

var usuario = usr.usuario.username;
var nombre = usr.usuario.fullname;
var contrasena = usr.pass;
var state = usr.usuario.modeBot;
var imagen = usr.usuario.profileImage;

const CompleteFormExample = () => {
  const webcamRef = React.useRef(null);


  const cargarDatos = () => {
    let body ={
      user: usr.usuario.username,
      pass: usr.pass
    }
    axios.post('http://54.163.33.24/user/login', body)
      .then(result => {
        usr.usuario = result.data.user
      })
      .catch()  
  }

  const registrar = () => {
    if(usuario == undefined || usuario == ""){
      usuario =  usr.usuario.username
    }else{
      usr.usuario.username = usuario
    }
    if(nombre == undefined || nombre == ""){
      nombre =  usr.usuario.fullname
    }else{
      usr.usuario.fullname = nombre
    }
    if(contrasena == undefined || contrasena == ""){
      contrasena =  usr.pass
    }else{
      usr.pass = contrasena
    }
    if(state == undefined){
      state =  usr.usuario.modeBot
    }
    let body = {
        user : usuario,
        name : nombre,
        pass : contrasena,
        modeBot : state,
        sourceBase64 : imagen
    }
    axios.put('http://54.163.33.24/user/update/' + usr.usuario._id, body)
      .then(result => {
      })
      .catch()

  }

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      imagen = imageSrc
    },
    [webcamRef]
  );

  const actualizarNombre = (e) => {
    nombre = e.target.value
  }
  const actualizarUsario = (e) => {
    usuario = e.target.value
  }
  const actualizarContra1 = (e) => {
    contrasena = e.target.value
  }
  const obtenerCheck = () => {
    state = !state
  }

  return (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col><Button onClick={cargarDatos}>Cargar Datos</Button>  </Col>

        </Row>
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmailAddress">Nombre Completo</label>
                  <FormInput
                    onChange={actualizarNombre.bind(this)}
                    id="feEmailAddress"
                    type="user"
                    placeholder={usr.usuario.fullname}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmailAddress">Usuario</label>
                  <FormInput
                    onChange={actualizarUsario.bind(this)}
                    id="user"
                    type="user"
                    placeholder={usr.usuario.username}
                  />
                </Col>
                <Col md="6">
                  <label htmlFor="fePassword">Contraseña</label>
                  <FormInput
                    onChange={actualizarContra1.bind(this)}
                    id="fePassword"
                    type="password"
                    placeholder={usr.pass}
                  />
                </Col>
                <Col md="6">
                  <br></br>
                  <FormCheckbox toggle small
                    defaultChecked={state}
                    onClick={obtenerCheck}>
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
            <img src={usr.usuario.profileImage} width="500" height="300" />
          </Col>
          <Col md="6">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <br></br>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={registrar}
              type="submit">
              Actualizar
                  </Button></Col>
          <Col><Button onClick={capture}>Tomar Foto</Button>  </Col>

        </Row>
        <br></br>
        <Row>

          <Col></Col>
          <Col>
            <br></br>
          </Col>
        </Row>
        <Row>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
}
export default CompleteFormExample;
