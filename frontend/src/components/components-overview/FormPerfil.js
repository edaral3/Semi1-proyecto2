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

var usuario = "";
var nombre = "";
var contrasena = "";
var state = true;
var imagen = "";

const CompleteFormExample = () => {
const webcamRef = React.useRef(null);
  
const registrar = () => {
  let body ={
    usuario: usuario,
    nombre: nombre,
    contrasena1: contrasena,
    imagen: imagen 
  }
  
  console.log("------------------")
  console.log(usr.usuario)
  console.log("------------------")
  /*axios.post('https://ysem0cgt12.execute-api.us-east-2.amazonaws.com/Version-2/chat-bot', body)
      .then(result => {
      })
      .catch()  */

}
 
const capture = React.useCallback(
  () => {
    const imageSrc = webcamRef.current.getScreenshot();
    imagen = imageSrc
  },
  [webcamRef]
);

const actualizarNombre = (e)=>{
  nombre = e.target.value
}
const actualizarUsario = (e)=>{
  usuario = e.target.value
}
const actualizarContra1 = (e)=>{
  contrasena = e.target.value
}
const obtenerCheck = () => {
  state = !state
}

    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
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
                      placeholder="Nombre"
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Usuario</label>
                    <FormInput
                      onChange={actualizarUsario.bind(this)}
                      id="user"
                      type="user"
                      placeholder="User"
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePassword">Contraseña</label>
                    <FormInput
                      onChange={actualizarContra1.bind(this)}
                      id="fePassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                  <Col md="6">
                <br></br>
                    <FormCheckbox toggle small 
                        defaultChecked = {state}
                        onClick={obtenerCheck}>
                      Modo Bot
                    </FormCheckbox>
                  </Col>
                </Row>
                <br></br>
                <Row form>

                </Row>

              </Form>
            </Col>
          </Row>
          <Col md="6">
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1200}
              videoConstraints={videoConstraints}
            />
            <br></br>
          </Col>
          <Row>
          </Row>
          <Row>
            <Col></Col>
            <Col><Button onClick={capture}>Tomar Foto</Button>  </Col>

          </Row>
          <br></br>
          <Row>

            <Col></Col>
            <Col>
              <Button
                onClick={registrar}
                type="submit">
                Actualiizar
                  </Button>
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
