import React, { Component } from 'react';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ChatApp extends Component {
  constructor(prop){
    super(prop);
    this.state = {
      mensaje: '',
      mensajes: [
        {id: 0, texto: "+ ¿Pais?"}
      ]
    };
  }

  pais = "";
  fechas = [];
  contador = 0;
  handleSubmit(e) {
    e.preventDefault();
    const list = this.state.mensajes;
    const nuevoMensaje = {
      id: this.state.mensajes.length,
      texto: "# " + this.state.mensaje
    }
    list.push(nuevoMensaje)

    
    if(this.contador == 0){
      this.pais = this.state.mensaje
      this.contador++
      const nuevoMensaje2 = {
        id: this.state.mensajes.length,
        texto: "+ ¿Fecha? (año/mes/dia)"
      }
      list.push(nuevoMensaje2)
    }
    else if(this.contador == 1){
      this.fechas = this.state.mensaje
      this.contador++
      const nuevoMensaje3 = {
        id: this.state.mensajes.length,
        texto: "+ Tipo de casos (confirmados, recuperados, muertes o todos)"
      }
      list.push(nuevoMensaje3)
    }
    else if(this.contador == 2){
      let body = JSON.parse(`{"pais": "${this.pais}", "fecha": ["${this.fechas}"]}`)  
      
      axios.post('https://ysem0cgt12.execute-api.us-east-2.amazonaws.com/Version-2/chat-bot', body)
      .then(result => {
        console.log(result.data)
        let datos = result.data.datos
        let msj = "- El pais, la fecha o el tipo son incorrectos"
        switch(this.state.mensaje.toLowerCase()){
          case 'confirmados':
            if(datos[0].confirmados.length != 0){
              msj = "* " + datos[0].confirmados[0]+" casos confirmados."
            }
            break
          case 'recuperados':
            if(datos[2].recuperados.length != 0){
              msj = "* " + datos[2].recuperados[0]+" personas recuperadas."
            }
            break
          case 'muertes':
            if(datos[1].muertos.length != 0){
              msj = datos[1].muertos[0]+" personas fallecidas."
            }
            break
          case 'todos':
            if(datos[0].confirmados.length != 0){
              msj = "* " + datos[0].confirmados[0]+" casos confirmados, "+
              datos[2].recuperados[0] + " personas recuperadas, "+
              datos[1].muertos[0] + " personas muertas."
            }
            break
        }

        console.log(datos[0].confirmados.length )
        
        const nuevoMensaje4 = {
          id: this.state.mensajes.length,
          texto: msj
        }
        list.push(nuevoMensaje4)
        
      const nuevoMensaje1 = {
        id: this.state.mensajes.length,
        texto: "+ ¿Pais?"
      }
      list.push(nuevoMensaje1)
      this.setState({mensajes: list})
      })
      .catch()  

      this.contador = 0
    }
 

    this.setState({mensajes: list})
  }

  actualizarMensaje(e){
    this.setState({mensaje: e.target.value})
  }

  render(){
    const mensajes = this.state.mensajes
    const mensajesLista = mensajes.map(mensaje => {
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
        <br></br>
      </div>
    )
  }

}

export default ChatApp;