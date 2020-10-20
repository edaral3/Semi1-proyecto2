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

import { Link, withRouter  } from 'react-router-dom';
let route = "/Login";
const CompleteFormExample = () => {
  

  let iniciarSesion = () => {
    route = "/"
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
