import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col,CardImg } from "reactstrap";

const contentDash1 = props => {
  return (
    <Row>
      <Col sm="4">
        <Card body>
          <CardImg top width="50%" src="" alt="Titulo imagen" />
          <CardTitle>Total Profit</CardTitle>
          <CardText>Info about the card</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
      <Col sm="4">
        <Card body>
          <CardImg top width="50%" src="" alt="Titulo imagen" />
          <CardTitle>Sales</CardTitle>
          <CardText>Info about the card</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
      <Col sm="4">
        <Card body>
          <CardImg top width="50%" src="" alt="Titulo imagen" />
          <CardTitle>Sales</CardTitle>
          <CardText>Info about the card</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
      <hr />
    </Row>
  );
};

export default contentDash1;
