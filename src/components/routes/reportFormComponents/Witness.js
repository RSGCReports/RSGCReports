import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const Witness = ({ index, handleChange, handleRemove, onClickErrors, errorSetter }) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      [index]: {
        ['witnessName']: 'Required field',
        ['witnessPhoneNumber']: 'Required field',
        ['witnessAddress']: 'Required field',
        ['witnessCity']: 'Required field',
        ['witnessProvince']: 'Required field',
        ['witnessCountry']: 'Required field',
        ['witnessPostalCode']: 'Required field',
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
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessName : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessName : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formWitnessNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="witnessPhoneNumber"
            placeholder="4161231234"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessPhoneNumber : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessPhoneNumber : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formWitnessAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="witnessAddress"
            placeholder="123 Fake St"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessAddress : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessAddress : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formWitnessCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="witnessCity"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessCity : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessCity : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formWitnessProvince">
          <Form.Label>Province/State</Form.Label>
          <Form.Control
            type="text"
            name="witnessProvince"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessProvince : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessProvince : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formWitnessCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="witnessCountry"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessCountry : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessCountry : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formWitnessPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="witnessPostalCode"
            placeholder="X#X#X#"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].witnessPostalCode : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].witnessPostalCode : null}
          </Form.Control.Feedback>
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
