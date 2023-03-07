import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
const Evidence = ({ index, handleChange, handleRemove, onClickErrors, errorSetter, evidence }) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({ [index]: { ['evidenceName']: 'Required field' } });
  }, []);
  return (
    <>
      <Form.Group controlId="formEvidenceName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="evidenceName"
          value={evidence.evidenceName}
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].evidenceName : null}
        />
        {onClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index].evidenceName}
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
