import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import platform from "platform";

export default function ScoopOptions(props) {
  const { name, imagePath, updateItemCount } = props;

  function handleChange(event) {
    updateItemCount(name, event.target.value, "scoops");
  }

  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={{
        textAlign: "center",
      }}
    >
      <img style={{ width: "75%" }} src={imagePath} alt={`${name} scoop`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs={6} style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Form.Control onChange={handleChange} type="number" defaultValue={0} />
      </Form.Group>
    </Col>
  );
}
