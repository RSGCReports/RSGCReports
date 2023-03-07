import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
const PersonInjured = ({
  index,
  handleChange,
  handleRemove,
  onClickErrors,
  errorSetter,
  personInjured,
}) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      [index]: {
        ['personInjuredName']: 'Required field',
        ['personInjuredDate']: 'Required field',
        ['personInjuredHospital']: 'Required field',
        ['personInjuredNatureOfInjuries']: 'Required field',
      },
    });
  }, []);
  return (
    <>
      <Form.Group controlId="formPersonInjuredName">
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
      <Form.Group controlId="formPersonInjuredDate">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="personInjuredDate"
          value={personInjured.personInjuredDate}
          defaultValue={personInjured.personInjuredDate}
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredDate : null}
        />
        {onClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index].personInjuredDate}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formPersonInjuredHospital">
        <Form.Label>Hospital</Form.Label>
        <Form.Control
          type="text"
          name="personInjuredHospital"
          value={personInjured.personInjuredHospital}
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].personInjuredHospital : null}
        />
        {onClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index].personInjuredHospital}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formPersonInjuredNatureOfInjuries">
        <Form.Label>Nature of Injuries</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="personInjuredNatureOfInjuries"
          value={personInjured.personInjuredNatureOfInjuries}
          onChange={(e) => handleChange(e, index)}
          isInvalid={
            onClickErrors[index] ? onClickErrors[index].personInjuredNatureOfInjuries : null
          }
        />
        {onClickErrors[index] ? (
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index].personInjuredNatureOfInjuries}
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

export default PersonInjured;
