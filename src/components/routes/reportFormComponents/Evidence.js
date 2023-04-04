import React from 'react';
import { Form, Button } from 'react-bootstrap';
const Evidence = ({ index, handleChange, handleRemove }) => {
  return (
    <>
      <hr />
      <Form.Group controlId="formEvidenceName">
        <Form.Label>Picture Evidence</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg, .webp, .gif"
          name="evidenceName"
          onChange={(e) => handleChange(e, index)}
        />
      </Form.Group>
      <br />
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
    </>
  );
};

export default Evidence;
