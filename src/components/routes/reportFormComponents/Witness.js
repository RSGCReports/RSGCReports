import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const Witness = ({
  index,
  handleChange,
  handleRemove,
  onClickErrors,
  errors,
  errorSetter,
  witness,
}) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      ...errors,
      ...{
        [index]: { ['witnessName']: 'Required field', ['witnessPhoneNumber']: 'Required field' },
      },
    });
  }, []);
  return (
    <>
      <hr />
      <Row>
        <Form.Group as={Col} controlId="formWitnessName">
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
        <Form.Group as={Col} controlId="formWitnessNumber">
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
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPersonInjuredAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredAddress"
            placeholder="123 Fake St"
            onChange={(e) => handleChange(e, index)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredCity"
            onChange={(e) => handleChange(e, index)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPersonInjuredProvince">
          <Form.Label>Province/State</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredProvince"
            onChange={(e) => handleChange(e, index)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredCountry"
            onChange={(e) => handleChange(e, index)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredPostalCode"
            placeholder="X#X#X#"
            onChange={(e) => handleChange(e, index)}
          />
        </Form.Group>
      </Row>
      <br />
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
    </>
  );
};

export default Witness;
