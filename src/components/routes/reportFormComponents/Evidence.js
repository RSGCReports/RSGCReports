import React from 'react';
import { Form, Button } from 'react-bootstrap';
const Evidence = ({ index, handleChange, handleRemove }) => {
  return (
    <>
      <Form.Group controlId="formEvidenceName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="evidenceName" onChange={(e) => handleChange(e, index)} />
        {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
      </Form.Group>
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
      <hr />
    </>
  );
};

export default Evidence;
