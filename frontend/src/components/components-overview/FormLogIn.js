import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

import usr from '../../userLoguin';
import { Link, withRouter  } from 'react-router-dom';
import axios from 'axios';
  
const login = () => {
  let body ={
    usuario: user,
    contrasena: pass
  }
  console.log(body)
  /*axios.post('https://ysem0cgt12.execute-api.us-east-2.amazonaws.com/Version-2/chat-bot', body)
      .then(result => {
      })
      .catch()  */
    
      route = "/"
      usr.usuario = "user1"
    }
let route = "/Login";

const user = "";
const pass = "";

const actualizarUsuario = (e)=>{
  user = e.target.value
}
const actualizarContra = (e)=>{
  pass = e.target.value
}

const CompleteFormExample = () => {
  let iniciarSesion = () => {
    route = "/"
    usr.usuario = "user1"
  }  
  
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Usuario</label>
                    <FormInput                    
                      onChange={actualizarUsuario.bind(this)}
                      id="user"
                      type="user"
                      placeholder="User"
                    />
                  </Col>
                </Row>
                <br></br>
                <Row form>
                <Col md="6">
                    <label htmlFor="fePassword">Contraseña</label>
                    <FormInput
                      onChange={actualizarContra.bind(this)}
                      id="fePassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>
                  <Link to={route} onClick={iniciarSesion} className="link">Iniciar Sesion</Link>  
                  </Col>                    
                </Row>
                <br></br>
                <Row>                  
                <Col md="6">
                  <Link to="/SignUp" type="submit" className="link">Crear Cuenta</Link>
                </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
}
export default CompleteFormExample;
