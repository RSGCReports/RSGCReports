import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const PersonInjured = ({ index, handleChange, handleRemove, onClickErrors, errorSetter }) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      [index]: {
        ['personInjuredName']: 'Required field',
        ['personInjuredAddress']: 'Required field',
        ['personInjuredCity']: 'Required field',
        ['personInjuredProvince']: 'Required field',
        ['personInjuredCountry']: 'Required field',
        ['personInjuredPostalCode']: 'Required field',
        ['personInjuredHospital']: 'Required field',
        ['personInjuredNatureOfInjuries']: 'Required field',
      },
    });
  }, []);
  return (
    <>
      <hr />
      <Form.Group controlId="formPersonInjuredName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="personInjuredName"
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredName : null}
        />
        <Form.Control.Feedback type="invalid">
          {onClickErrors[index] ? onClickErrors[index].personInjuredName : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Form.Group as={Col} controlId="formPersonInjuredAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredAddress"
            placeholder="123 Fake St"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredAddress : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].personInjuredAddress : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredCity"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredCity : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].personInjuredCity : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPersonInjuredProvince">
          <Form.Label>Province/State</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredProvince"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredProvince : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].personInjuredProvince : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredCountry"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredCountry : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].personInjuredCountry : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredPostalCode"
            placeholder="X#X#X#"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredPostalCode : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].personInjuredPostalCode : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group controlId="formPersonInjuredHospital">
        <Form.Label>Hospital</Form.Label>
        <Form.Control
          type="text"
          name="personInjuredHospital"
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredHospital : null}
        />
        <Form.Control.Feedback type="invalid">
          {onClickErrors[index] ? onClickErrors[index].personInjuredHospital : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPersonInjuredNatureOfInjuries">
        <Form.Label>Nature of Injuries</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="personInjuredNatureOfInjuries"
          onChange={(e) => handleChange(e, index)}
          isInvalid={
            onClickErrors[index] ? onClickErrors[index].personInjuredNatureOfInjuries : null
          }
        />
        <Form.Control.Feedback type="invalid">
          {onClickErrors[index] ? onClickErrors[index].personInjuredNatureOfInjuries : null}
        </Form.Control.Feedback>
      </Form.Group>
      <br />
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
    </>
  );
};

export default PersonInjured;
