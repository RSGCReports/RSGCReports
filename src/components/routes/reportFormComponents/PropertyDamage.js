import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const PropertyDamage = ({ index, handleChange, handleRemove, onClickErrors, errorSetter }) => {
  // fix for initial empty field errors
  useEffect(() => {
    errorSetter({
      [index]: {
        ['propertyDamageOwnerName']: 'Required field',
        ['propertyDamageOwnerPhone']: 'Required field',
        ['propertyDamageOwnerAddress']: 'Required field',
        ['propertyDamageOwnerCity']: 'Required field',
        ['propertyDamageOwnerCountry']: 'Required field',
        ['propertyDamageOwnerProvince']: 'Required field',
        ['propertyDamageOwnerPostalCode']: 'Required field',
        ['propertyDamageOwnerLicenseNumber']: 'Required field',
        ['propertyDamageOwnerIssueProvince']: 'Required field',
        ['propertyDamageYearOfVehicle']: 'Required field',
        ['propertyDamageInsurerName']: 'Required field',
        ['propertyDamageInsurancePolicyNumber']: 'Required field',
        ['propertyDamageDriverName']: 'Required field',
        ['propertyDamageDriverPhone']: 'Required field',
        ['propertyDamageDriverAddress']: 'Required field',
        ['propertyDamageDriverCity']: 'Required field',
        ['propertyDamageDriverCountry']: 'Required field',
        ['propertyDamageDriverProvince']: 'Required field',
        ['propertyDamageDriverPostalCode']: 'Required field',
        ['propertyDamageDriverLicenseNumber']: 'Required field',
        ['propertyDamageDriverIssueProvince']: 'Required field',
      },
    });
  }, []);
  return (
    <>
      <hr />
      <Row>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerName">
          <Form.Label>Owner Name</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerName"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerName : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerName : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerPhone">
          <Form.Label>Owner Phone</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerPhone"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerPhone : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerPhone : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerAddress">
          <Form.Label>Owner Address</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerAddress"
            placeholder="123 Fake St"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerAddress : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerAddress : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerCity">
          <Form.Label>Owner City</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerCity"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerCity : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerCity : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerProvince">
          <Form.Label>Owner Province/State</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerProvince"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerProvince : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerProvince : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerCountry">
          <Form.Label>Owner Country</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerCountry"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerCountry : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerCountry : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageOwnerPostalCode">
          <Form.Label>Owner Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerPostalCode"
            placeholder="X#X#X#"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerPostalCode : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerPostalCode : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="formPropertyDamageOwnerLicenseNumber">
          <Form.Label>Owner License Number</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageOwnerLicenseNumber"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerLicenseNumber : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerLicenseNumber : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPropertyDamageOwnerIssueProvince">
          <Form.Label>Owner License Province of Issue</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="propertyDamageOwnerIssueProvince"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerIssueProvince : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageOwnerIssueProvince : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <hr />
      <Row>
        <Form.Group as={Col} controlId="formPropertyDamageDriverName">
          <Form.Label>Driver Name</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverName"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageDriverName : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverName : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageDriverPhone">
          <Form.Label>Driver Phone</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverPhone"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageDriverPhone : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverPhone : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPropertyDamageDriverAddress">
          <Form.Label>Driver Address</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverAddress"
            placeholder="123 Fake St"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageDriverAddress : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverAddress : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageDriverCity">
          <Form.Label>Driver City</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverCity"
            onChange={(e) => handleChange(e, index)}
            isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageDriverCity : null}
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverCity : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formPropertyDamageDriverProvince">
          <Form.Label>Driver Province/State</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverProvince"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageDriverProvince : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverProvince : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageDriverCountry">
          <Form.Label>Driver Country</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverCountry"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageDriverCountry : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverCountry : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formPropertyDamageDriverPostalCode">
          <Form.Label>Driver Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverPostalCode"
            placeholder="X#X#X#"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageDriverPostalCode : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverPostalCode : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="formPropertyDamageDriverLicenseNumber">
          <Form.Label>Driver License Number</Form.Label>
          <Form.Control
            type="text"
            name="propertyDamageDriverLicenseNumber"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageDriverLicenseNumber : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverLicenseNumber : null}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPropertyDamageDriverIssueProvince">
          <Form.Label>Driver License Province of Issue</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="propertyDamageDriverIssueProvince"
            onChange={(e) => handleChange(e, index)}
            isInvalid={
              onClickErrors[index] ? onClickErrors[index].propertyDamageDriverIssueProvince : null
            }
          />
          <Form.Control.Feedback type="invalid">
            {onClickErrors[index] ? onClickErrors[index].propertyDamageDriverIssueProvince : null}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <hr />
      <Form.Group controlId="formPropertyDamageYearOfVehicle">
        <Form.Label>Vehicle Year</Form.Label>
        <Form.Control
          type="date"
          name="propertyDamageYearOfVehicle"
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageYearOfVehicle : null}
        />
        <Form.Control.Feedback type="invalid">
          {onClickErrors[index] ? onClickErrors[index].propertyDamageYearOfVehicle : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPropertyDamageInsurerName">
        <Form.Label>Insurer Name</Form.Label>
        <Form.Control
          type="text"
          name="propertyDamageInsurerName"
          onChange={(e) => handleChange(e, index)}
          isInvalid={onClickErrors[index] ? onClickErrors[index].propertyDamageInsurerName : null}
        />
        <Form.Control.Feedback type="invalid">
          {onClickErrors[index] ? onClickErrors[index].propertyDamageInsurerName : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPropertyDamageInsurancePolicyNumber">
        <Form.Label>Insurance Policy Number</Form.Label>
        <Form.Control
          type="text"
          name="propertyDamageInsurancePolicyNumber"
          onChange={(e) => handleChange(e, index)}
          isInvalid={
            onClickErrors[index] ? onClickErrors[index].propertyDamageInsurancePolicyNumber : null
          }
        />
        <Form.Control.Feedback type="invalid">
          {onClickErrors[index] ? onClickErrors[index].propertyDamageInsurancePolicyNumber : null}
        </Form.Control.Feedback>
      </Form.Group>
      <br />
      <Button className="btn btn-danger" onClick={(e) => handleRemove(e, index)}>
        Remove
      </Button>
    </>
  );
};

export default PropertyDamage;
