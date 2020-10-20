import React, { Component } from 'react';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Line } from "react-chartjs-2";

class chatGraficaCasos extends Component {
  constructor(){
    super();
    const data = {
      labels: [],
      datasets: [
        {
          label: "Confirmados",
          data: [],
          fill: true,
          backgroundColor: "rgba(255,153,15,0.2)",
          borderColor: "rgba(255,153,15,1)"
        },
        {
          label: "Recuperados",
          data: [],
          fill: true,
          backgroundColor: "rgba(59,172,59,0.2)",
          borderColor: "rgba(59,172,59,1)"
        },
        {
          label: "Muertes",
          data: [],
          fill: true,
          backgroundColor: "rgba(128,128,128,0.2)",
          borderColor: "rgba(128,128,128,1)"
        }
      ]
    };
    this.state = {
      data: data,
      mensaje: '',
      mensajes: [
        {id: 0, texto: "+ ¿Pais?"}
      ]
    };
  }

  pais = "";
  fechas = [];
  contador = 0;
  data = [];
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
        texto: "+ ¿Rando de Fechas? (año/mes/dia a año/mes/dia)"
      }
      list.push(nuevoMensaje2)
    }
    else if(this.contador == 1){
      this.fechas = [];
      try {
        this.fechas.push(this.state.mensaje.split("a")[0].trim());
        this.fechas.push(this.state.mensaje.split("a")[1].trim());
        
      } catch (error) {
        this.fechas.push("error");
      }
      let body = {pais: this.pais, fecha: this.fechas} 
      axios.post('https://ysem0cgt12.execute-api.us-east-2.amazonaws.com/Version-2/chat-bot', body)
      .then(result => {
        console.log(result.data)
        let datos = result.data.datos
        let msj = "- El pais, la fecha o el tipo son incorrectos"
        if(datos[0].confirmados.length != 0){
          let dataGraph = this.state.data
          dataGraph.datasets[0].data = [];
          dataGraph.datasets[1].data = [];
          dataGraph.datasets[2].data = [];
          dataGraph.labels = [];
          for(let i = 0; i < datos[0].confirmados.length; i++){
            dataGraph.datasets[0].data.push(parseInt(datos[0].confirmados[i]))
            dataGraph.datasets[1].data.push(parseInt(datos[2].recuperados[i]))
            dataGraph.datasets[2].data.push(parseInt(datos[1].muertos[i]))
            dataGraph.labels.push(datos[3].fechas[i])
          }

          
          this.setState({data: dataGraph})

          console.log(this.state.data)
          msj = "* Grafica generada"
        }

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
            ChatBot Grafica de Casos
            <ul>
              {mensajesLista}
            </ul>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <TextField 
                type="text"
                onChange={this.actualizarMensaje.bind(this)}
              />
              <Button>
                Envir
              </Button>
                    
            </form>
                <div className="div2">
                  <Line data={this.state.data} />
                </div>
        <br></br>
      </div>
    )
  }

}

export default chatGraficaCasos;
