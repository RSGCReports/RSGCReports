import React from 'react';
import { Form, Button } from 'react-bootstrap';
const Evidence = ({ index, handleChange, handleRemove, evidenceOnClickErrors, evidence }) => {
  return (
    <>
      <Form.Group controlId="formEvidenceName">
        <Form.Label>Name {index}</Form.Label>
        <Form.Control
          type="text"
          name="evidenceName"
          value={evidence.evidenceName}
          onChange={(e) => handleChange(e, index)}
          isInvalid={
            evidenceOnClickErrors[index] ? evidenceOnClickErrors[index].evidenceName : null
          }
        />
        {evidenceOnClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {evidenceOnClickErrors[index].evidenceName}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
      <hr />
    </>
  );
};

export default Evidence;
