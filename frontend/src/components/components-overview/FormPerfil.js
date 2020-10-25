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

if(data != null){
  usuario = data.username;
  nombre = data.fullname;
  state = data.modeBot;
  imagen = data.profileImage;  
}

const CompleteFormExample = () => {
  const webcamRef = React.useRef(null);

  const registrar = () => {
    if(usuario == undefined || usuario == ""){
      usuario =  data.username
    }else{
      data.username = usuario
    }
    if(nombre == undefined || nombre == ""){
      nombre =  data.fullname
    }else{
      data.fullname = nombre
    }
    if(state == undefined){
      state =  data.modeBot
    }else{
      data.modeBot = state
    }
    let body = {
        user : usuario,
        name : nombre,
        modeBot : state,
        sourceBase64 : imagen
    }
    console.log(data)
    localStorage.setItem('usuario', JSON.stringify(data))
    axios.put('http://54.163.33.24/user/update/' + data._id, body)
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

  }
  const obtenerCheck = () => {
    state = !state
  }

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
                    onChange={actualizarNombre.bind(this)}
                    id="feEmailAddress"
                    type="user"
                    placeholder={data.fullname}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feEmailAddress">Usuario</label>
                  <FormInput
                    onChange={actualizarUsario.bind(this)}
                    id="user"
                    type="user"
                    placeholder={data.username}
                  />
                </Col>
                <Col md="6">
                  <label htmlFor="fePassword">Contraseña</label>
                  <FormInput
                    onChange={actualizarContra1.bind(this)}
                    id="fePassword"
                    type="password"
                    placeholder="******"
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
            <img src={data.profileImage} width="500" height="300" />
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
