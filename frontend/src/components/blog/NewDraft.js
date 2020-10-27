import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";
import axios from 'axios';
import ruta from "../../ruta"

var base64 = "";
var estado = "";

function doClick() {
  let file = document.getElementById("input").files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    base64 = reader.result
  };
}

var data = JSON.parse(localStorage.getItem('usuario')); 
const actualizarEstado = (e) => {
  estado = e.target.value
}
const publicar = () => {
  let body = {
    description : estado,
    _id : data._id, //corresponde al id del usuario que realizo la publicacion
    sourceBase64 :base64
  }
  console.log(body)
  axios.post(ruta.ruta + '/publication/create', body)
      .then(result => {
        console.log(result)
      })
      .catch()  
}

const NewDraft = ({ title }) => (
  <Card small className="h-100">
    {/* Card Header */}
    <CardHeader className="border-bottom">
      <h6 className="m-0">Nueva publicacioin</h6>
    </CardHeader>

    <CardBody className="d-flex flex-column">
      <Form className="quick-post-form">
   
        {/* Body */}
        <FormGroup>
          <FormTextarea onChange={actualizarEstado.bind(this)} placeholder="En que estas pensando?" />
        </FormGroup>

        {/* Create Draft */}
        <FormGroup className="mb-0">
          
        <input type="file" id="input" onChange={doClick}></input>
          <br></br>
        </FormGroup>
          <br></br>
      </Form>
    </CardBody>
          <Button onClick={publicar} theme="accent" type="submit">
            Publicar
          </Button>
  </Card>
);

NewDraft.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

NewDraft.defaultProps = {
  title: "New Draft"
};

export default NewDraft;
