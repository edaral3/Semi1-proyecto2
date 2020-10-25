import React, { Component } from 'react';
import {
  Row
} from "shards-react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

var data = JSON.parse(localStorage.getItem('usuario'));

class ChatApp extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      mensaje: '',
      mensajes: [],
      count: 0
    };
  }

  pais = "";
  fechas = [];
  contador = 0;
  handleSubmit(e) {
    e.preventDefault();
    let id = this.state.count
    if (id == undefined) {
      id = 0
    }
    var idMensaje = JSON.parse(localStorage.getItem('chat'));
    if (idMensaje == null) {
      idMensaje = "error"
    }
    const nuevoMensaje = {
      id: id,
      texto: data.username + "->  " + this.state.mensaje,
      user: data.username,
      idmsj: idMensaje.idMensaje
    }
    window.firebase.database().ref(`messages2/${nuevoMensaje.id}`)
    .set(nuevoMensaje);

    this.setState({ mensaje: '' })
  }

  actualizarMensaje(e) {
    this.setState({ mensaje: e.target.value })
  }


  componentDidMount() {
    var idMensaje = JSON.parse(localStorage.getItem('chat'));
    if (idMensaje == null) {
      idMensaje = "error"
    }
    window.firebase.database().ref(`messages2/`).on('value', snap => {
      const currentMessages = snap.val();
      if (currentMessages !== null) {
        let list = []
        currentMessages.forEach(element => {
          if (element.idmsj == idMensaje.idMensaje) {
            list.push(element)
          }
        });
        
        this.setState({
          mensajes: list, count:currentMessages.length
        })
      }
    })
  }

  render() {
    var mensajes = this.state.mensajes
    var mensajesLista = mensajes.map(mensaje => {
      return <li>{mensaje.texto}</li>
    });

    return (
      <div className="App">
        <br></br>
            ChatBot Casos
        <ul>
          {mensajesLista}
        </ul>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            type="text"
            onChange={this.actualizarMensaje.bind(this)}
          />
          <Button>
            Enviar
              </Button>
        </form>

        {/* First Row of Posts */}
        <Row>
        </Row>
        <br></br>
      </div>
    )
  }

}

export default ChatApp;