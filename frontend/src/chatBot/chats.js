import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
} from "shards-react";
import ChatCasos from "./chatCasos";
import ChatGraficaCasos from "./chatGraficaCasos";
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const Chats = () => (
  <div>
      <Container fluid className="px-0">
    </Container>
    <Container fluid className="main-content-container px-4">

    <Row>
        <Col lg="5" className="mb-6">
            <Card small>
              
            <Toolbar>
              <Typography type="title" color="inherit">
                <ChatCasos/>           
                </Typography>
              </Toolbar>
            </Card>
        </Col>
        <Col lg="5" className="mb-6">
            <Card small>
              
            <Toolbar>
              <Typography type="title" color="inherit">
                <ChatGraficaCasos/>           
                </Typography>
              </Toolbar>
            </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Chats;
