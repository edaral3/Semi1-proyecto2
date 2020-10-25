import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
} from "shards-react";

import axios from 'axios';

var data = JSON.parse(localStorage.getItem('usuario')); 
class Agregar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    agregarAmigo = async () => {
        let body = {
            currentUser: data._id,
            userFriend: this.props.post._id
        }
        console.log(body)
        await axios.post('http://54.163.33.24/user/addFriend', body)
            .then(result => {
                console.log(result.data)
            })
            .catch()
    }

    render() {
        var {
            PostsListOne,
        } = this.state;

        return (
            <Col lg="3" md="6" sm="12" className="mb-4">
                <Card small className="card-post card-post--1">
                    <div
                        className="card-post__image"
                        style={{ backgroundImage: `url(${this.props.post.backgroundImage})` }}
                    >
                    </div>
                    <CardBody>
                        <h5 className="card-title">
                            <a href="#" className="text-fiord-blue">
                                {this.props.post.title}
                            </a>
                        </h5>
                        <p className="card-text d-inline-block mb-3">{this.props.post.body}</p>
                        <div className="my-auto ml-auto">
                            <Button onClick={this.agregarAmigo} size="sm" theme="white">
                                <i className="far fa fa-user-plus mr-1" /> Agregar
                    </Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Agregar;
