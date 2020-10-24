import React from 'react'
import Item from './item'
import Texto from './texto'

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

const traducir = async (cadedna, e) => {
    let body = {
        text: cadedna.body
    }

    let texto = ""
    await axios.post('http://54.163.33.24/publication/translate', body)
        .then(result => {
            texto = result.data.translate
            console.log(result)
        })
        .catch()
    cadedna.body = texto;
    console.log(cadedna.body)
}

function List(props) {
    return (
        <CardBody className="p-0">
            {props.items.map((item) => (
                <div className="blog-comments__item d-flex p-3">
                    {/* Avatar */}
                    <div className="blog-comments__avatar mr-3">
                        <img src={require("../../images/avatars/1.jpg")} />
                    </div>

                    {/* Content */}
                    <div className="blog-comments__content">
                        {/* Content :: Title */}
                        <div className="blog-comments__meta text-mutes">
                            <a className="text-secondary" >
                                nombre
              </a>{" "}

                        </div>
                        <img src={item.url} width="1000" height="600" />
                        {/* Content :: Body */}
                        <Texto texto={item.body}/>
                        <Item tags={item.etiquetas} />
                        <br></br>
                        <span className="text-mutes">--- {item.date}</span>
                        {/* Content :: Actions */}
                        <div className="blog-comments__actions">
                            <br></br>
                            <ButtonGroup size="sm">
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            ))}
        </CardBody>

    );
}

export default List;