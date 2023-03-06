import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
const Witness = ({ index, handleChange, handleRemove, onClickErrors, errorSetter, witness }) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      [index]: { ['witnessName']: 'Required field', ['witnessPhoneNumber']: 'Required field' },
    });
  }, []);
  return (
    <>
      <Form.Group controlId="formWitnessName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="witnessName"
          value={witness.witnessName}
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].witnessName : null}
        />
        {onClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index].witnessName}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formWitnessNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="witnessPhoneNumber"
          value={witness.witnessPhoneNumber}
          defaultValue={witness.witnessPhoneNumber}
          placeholder="4161231234"
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].witnessPhoneNumber : null}
        />
        {onClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index].witnessPhoneNumber}
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

export default Witness;
