import React from 'react'
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

function Item(props) {
    return (
        <ButtonGroup size="sm">
            {props.tags.map((tag) => (
                <Button theme="white">
                    <span className="text-light">
                        <i className="material-icons">check</i>
                    </span>{" "}
                    {tag}
                </Button>
            ))}
        </ButtonGroup>
    );
}


export default Item;