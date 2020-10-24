import React from "react";
import PropTypes from "prop-types";
import usr from '../../userLoguin';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  Form,
  FormInput
} from "shards-react";
import axios from 'axios';
import Lista from './Lista';

class Texto extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      body : props.texto
    }
  }

  traducir = async () => {
    let body = {
        text: this.state.body
    }
    console.log("---------------------")
    console.log(this.state)
    console.log("---------------------")
    let texto = ""
    await axios.post('http://54.163.33.24/publication/translate', body)
        .then(result => {
            texto = result.data.translate
            console.log(result)
        })
        .catch()
    this.setState({body: texto})
}
render(){
  return(
    <div>
    <Button onClick={this.traducir} theme="white">
        <span className="text-light">
            <i className="material-icons">more_vert</i>
        </span>{" "}
        Traducir
    </Button>
 
      <p className="m-0 my-1 mb-2 text-muted">{this.state.body}</p>
    </div>
)};
}

export default Texto;
