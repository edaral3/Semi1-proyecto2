import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
} from "shards-react";
import FormPerfil from "../components/components-overview/FormPerfil";

const Perfil = () => (
  <div>
    <Container fluid className="px-0">
    </Container>
    <Container fluid className="main-content-container px-4">

      <Row>
        <Col lg="8" className="mb-4">

          {/* Complete Form Example */}
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Guardar</h6>
            </CardHeader>
            <FormPerfil />
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Perfil;
