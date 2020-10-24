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
import axios from 'axios';

const videoConstraints = {
  width: 500,
  height: 300,
  facingMode: "user"
};

var usuario = "";
var nombre = "";
var contrasena1 = "";
var contrasena2 = "";
var imagen = "";
var error = "";

const CompleteFormExample = () => {
const webcamRef = React.useRef(null);
  
const registrar = () => {
  if(usuario==""||nombre==""||
  contrasena1==""||contrasena2==""){
    error = "Los datos estan incompletos"
    return
  }
  if(contrasena1 != contrasena2){
    error = "Las contraseñas no coinciden"
    return
  }
  let body ={
    user: usuario,
    name: nombre,
    pass: contrasena1,
    sourceBase64: imagen 
  }
  console.log(body)
  axios.post('http://54.163.33.24/user/signin', body)
      .then(result => {
        console.log(result)
      })
      .catch()  
      error = "Usuario registrado"
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
  contrasena1 = e.target.value
}
const actualizarContra2 = (e)=>{
  contrasena2 = e.target.value
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
                    <label htmlFor="fePassword">Repetir Contraseña</label>
                    <FormInput
                      onChange={actualizarContra2.bind(this)}
                      id="fePassword2"
                      type="password"
                      placeholder="Password"
                    />
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
                Registrar
                  </Button>
              <br></br>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/Login" className="link">Iniciar Sesion</Link>
            </Col>
          </Row> <Row>
            <Col></Col>
            <Col>      
              {error}
              <br></br>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
}
export default CompleteFormExample;
