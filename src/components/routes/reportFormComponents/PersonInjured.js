import React from 'react';
import { Form, Button } from 'react-bootstrap';
const PersonInjured = ({ index, handleChange, handleRemove }) => {
  return (
    <>
      <Form.Group controlId="formPersonInjuredName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="personInjuredName"
          onChange={(e) => handleChange(e, index)}
        />
        {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group controlId="formPersonInjuredDate">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control type="date" name="personInjuredDate" />
        {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group controlId="formPersonInjuredHospital">
        <Form.Label>Hospital</Form.Label>
        <Form.Control
          type="text"
          name="personInjuredHospital"
          onChange={(e) => handleChange(e, index)}
        />
        {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group controlId="formPersonInjuredNatureOfInjuries">
        <Form.Label>Nature of Injuries</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="personInjuredNatureOfInjuries"
          onChange={(e) => handleChange(e, index)}
        />
        {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
      </Form.Group>
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
      <hr />
    </>
  );
};

export default PersonInjured;
