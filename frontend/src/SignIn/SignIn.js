import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
} from "shards-react";

import LogIn from "../components/components-overview/FormLogIn";

const Login = () => (
  <div>
    <Container fluid className="px-0">
    </Container>
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col lg="8" className="mb-4">
          {/* Complete Form Example */}
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Inicias sesion</h6>
            </CardHeader>
            <LogIn />
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Login;
