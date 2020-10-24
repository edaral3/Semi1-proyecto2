import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
} from "shards-react";

import CompleteFormExample from "../components/components-overview/CompleteFormExample";

const SignUp = () => (
  <div>
    <Container fluid className="px-0">
    </Container>
    <Container fluid className="main-content-container px-4">

      <Row>
        <Col lg="8" className="mb-4">

          {/* Complete Form Example */}
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Crear Usuario</h6>
            </CardHeader>
            <CompleteFormExample />
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SignUp;
