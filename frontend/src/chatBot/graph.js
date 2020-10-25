import React from 'react'
import { Line } from "react-chartjs-2";
import axios from 'axios';

class Graph extends React.Component{
        
  constructor(props){
    super(props);

    const data = {
        display: true,
        labels: props.data[3],
        datasets: [
          {
            label: "Confirmados",
            data: props.data[0],
            fill: true,
            backgroundColor: "rgba(255,153,15,0.2)",
            borderColor: "rgba(255,153,15,1)"
          },
          {
            label: "Recuperados",
            data: props.data[1],
            fill: true,
            backgroundColor: "rgba(59,172,59,0.2)",
            borderColor: "rgba(59,172,59,1)"
          },
          {
            label: "Muertes",
            data: props.data[2],
            fill: true,
            backgroundColor: "rgba(128,128,128,0.2)",
            borderColor: "rgba(128,128,128,1)"
          }
        ]
      };

    this.state = {
      titulo: "Publicaciones",
      lista: [],
      data: data,
      cont:0
    };
  }
        render(){
            return(
                <div className="div2">
                  <Line data={this.state.data} />
                </div>
            );
        }
    }

export default Graph;