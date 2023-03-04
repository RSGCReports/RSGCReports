import React from 'react';
import { Form, Button } from 'react-bootstrap';
const Witness = ({ index, handleChange, handleRemove }) => {
  return (
    <>
      <Form.Group controlId="formWitnessName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="witnessName" onChange={(e) => handleChange(e, index)} />
        {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group controlId="formWitnessNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="witnessPhoneNumber"
          placeholder="4161231234"
          onChange={(e) => handleChange(e, index)}
        />
        {/* <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback> */}
      </Form.Group>
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
      <hr />
    </>
  );
};

export default Witness;
