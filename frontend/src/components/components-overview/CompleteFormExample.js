import React from "react";
import Webcam from "react-webcam";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";

import { Link } from 'react-router-dom';

const videoConstraints = {
  width: 500,
  height: 300,
  facingMode: "user"
};
 
const CompleteFormExample = () => {
const webcamRef = React.useRef(null);
  
 
const capture = React.useCallback(
  () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    console.log("------------------------------------------------------------------------------------")
  },
  [webcamRef]
);
 

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
            <Row form>
              <Col md="6">
                <Webcam
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={650}
                  videoConstraints={videoConstraints}
                />
                <br></br>
                <button onClick={capture}>Tomar Foto</button>      
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <Button type="submit">Registrar Usuario</Button>
              </Col>
            </Row>    
            <br></br>
            <Link to="/Login" className="link">Iniciar Sesion</Link>  
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
    );
}
export default CompleteFormExample;
