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


import ToggleButtons from "./ToggleButtons";
import { FormCheckbox } from "shards-react";




var estad = false
class FormPerfil extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      estado: false,
      img: "https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg"
    };
  }

  obtenerCheck = () => {
    this.state.estado = !this.state.estado
  }

render() {
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
                      id="feEmailAddress"
                      type="user"
                      placeholder="Nombre"
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Usuario</label>
                    <FormInput
                      id="user"
                      type="user"
                      placeholder="User"
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePassword">Contraseña</label>
                    <FormInput
                      id="fePassword"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePassword">Repetir Contraseña</label>
                    <FormInput
                      id="fePassword2"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                </Row>
                <br></br>
          <FormCheckbox toggle small 
              onClick={this.obtenerCheck}>
            Modo Bot
          </FormCheckbox>
                <br></br>
                <Row form>
                  <Col md="6">
                    <img src={this.state.img} />      
                          
                    <br></br>   
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>
                    <Button type="submit">Guardar Datos</Button>
                  </Col>
                </Row>    
                <br></br> 
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
}
}
export default FormPerfil;
