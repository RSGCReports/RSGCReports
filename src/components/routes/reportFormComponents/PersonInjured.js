import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const PersonInjured = ({
  index,
  handleChange,
  handleRemove,
  onClickErrors,
  errors,
  errorSetter,
  personInjured,
}) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      ...errors,
      ...{
        [index]: {
          ['personInjuredName']: 'Required field',
          ['personInjuredDate']: 'Required field',
          ['personInjuredHospital']: 'Required field',
          ['personInjuredNatureOfInjuries']: 'Required field',
        },
      },
    });
  }, []);
  return (
    <>
      <hr />
      <Row>
        <Form.Group as={Col} controlId="formPersonInjuredName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="personInjuredName"
            value={personInjured.personInjuredName}
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredName : null}
          />
          {onClickErrors[index] ? (
            <Form.Control.Feedback type="invalid">
              {onClickErrors[index].personInjuredName}
            </Form.Control.Feedback>
          ) : null}
        </Form.Group>
        <Form.Group as={Col} controlId="formPersonInjuredDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="personInjuredDate"
            value={personInjured.personInjuredDate}
            defaultValue={personInjured.personInjuredDate}
            onChange={(e) => handleChange(e, index)}
          />
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
      <Form.Group controlId="formPersonInjuredHospital">
        <Form.Label>Hospital</Form.Label>
        <Form.Control
          type="text"
          name="personInjuredHospital"
          value={personInjured.personInjuredHospital}
          onChange={(e) => handleChange(e, index)}
        />
      </Form.Group>
      <Form.Group controlId="formPersonInjuredNatureOfInjuries">
        <Form.Label>Nature of Injuries</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="personInjuredNatureOfInjuries"
          value={personInjured.personInjuredNatureOfInjuries}
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

export default PersonInjured;
