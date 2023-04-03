import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const InsurancePolicy = ({ nextStep, prevStep, setField, setErrors, errors, formValues }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = checkErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      nextStep();
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  const checkErrors = () => {
    const {
      insurer,
      insurerName,
      Agent,
      IPhomeStreet,
      IPhomeCity,
      IPhomeCountry,
      IPhomeProvince,
      IPhomePostalCode,
      IPbusinessCountry,
      IPbusinessProvince,
      IPbusinessPostalCode,
      policyNumber,
    } = formValues;
    const newErrors = {};

    // insurer and agent check
    if (!insurer || insurer === '') newErrors.insurer = 'Must provide insurer';
    if (!insurerName || insurerName === '') newErrors.insurerName = 'Must provide insurer name';
    if (!Agent || Agent === '') newErrors.Agent = 'Must provide agent';

    // home address check
    if (!IPhomeStreet || IPhomeStreet === '')
      newErrors.IPhomeStreet = 'Must provide home street address';
    if (!IPhomeCity || IPhomeCity === '') newErrors.IPhomeCity = 'Must provide city';
    if (!IPhomeCountry || IPhomeCountry === '') newErrors.IPhomeCountry = 'Must provide country';
    else if (IPhomeCountry !== 'Canada') newErrors.IPhomeCountry = 'Must be Canada';
    if (!IPhomeProvince || IPhomeProvince === '')
      newErrors.IPhomeProvince = 'Must provide province';
    else if (
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        IPhomeProvince
      )
    )
      newErrors.IPhomeProvince = 'Must be a Canadian province';
    if (!IPhomePostalCode || IPhomePostalCode === '')
      newErrors.IPhomePostalCode = 'Must provide postal code';
    else if (!/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(IPhomePostalCode))
      newErrors.IPhomePostalCode = 'Postal code must be in X#X#X# format';

    // business validation
    if (IPbusinessCountry && IPbusinessCountry !== '' && IPbusinessCountry !== 'Canada')
      newErrors.IPbusinessCountry = 'Must be Canada';
    if (
      IPbusinessProvince &&
      IPbusinessProvince !== '' &&
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        IPbusinessProvince
      )
    )
      newErrors.IPbusinessProvince = 'Must be a Canadian province code (e.g. ON)';
    if (
      IPbusinessPostalCode &&
      IPbusinessPostalCode !== '' &&
      !/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(IPbusinessPostalCode)
    )
      newErrors.IPbusinessPostalCode = 'Postal code must be in X#X#X# format';

    // policy number check
    if (!policyNumber || policyNumber === '') newErrors.policyNumber = 'Must include policy number';

    return newErrors;
  };

  return (
    <div>
      <Container style={{ padding: '15px' }}>
        <Form>
          <h3>Insurance Policy</h3>
          <Form.Group controlId="formInsurer">
            <Form.Label>Insurer</Form.Label>
            <Form.Control
              type="text"
              name="form[insurer]"
              defaultValue={formValues.insurer}
              onChange={(e) => setField('insurer', e.target.value)}
              isInvalid={errors.insurer}
            />
            <Form.Control.Feedback type="invalid">{errors.insurer}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formInsurerName">
            <Form.Label>Name of Insurer</Form.Label>
            <Form.Control
              type="text"
              name="form[insurerName]"
              defaultValue={formValues.insurerName}
              onChange={(e) => setField('insurerName', e.target.value)}
              isInvalid={errors.insurerName}
            />
            <Form.Control.Feedback type="invalid">{errors.insurerName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formInsuranceAgent">
            <Form.Label>Agent</Form.Label>
            <Form.Control
              type="text"
              name="form[Agent]"
              defaultValue={formValues.Agent}
              onChange={(e) => setField('Agent', e.target.value)}
              isInvalid={errors.Agent}
            />
            <Form.Control.Feedback type="invalid">{errors.Agent}</Form.Control.Feedback>
          </Form.Group>
          <br />
          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                name="form[IPhomeStreet]"
                defaultValue={formValues.IPhomeStreet}
                placeholder="123 Fake St"
                onChange={(e) => setField('IPhomeStreet', e.target.value)}
                isInvalid={errors.IPhomeStreet}
              />
              <Form.Control.Feedback type="invalid">{errors.IPhomeStreet}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="form[IPhomeCity]"
                defaultValue={formValues.IPhomeCity}
                onChange={(e) => setField('IPhomeCity', e.target.value)}
                isInvalid={errors.IPhomeCity}
              />
              <Form.Control.Feedback type="invalid">{errors.IPhomeCity}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formProvince">
              <Form.Label>Province/State</Form.Label>
              <Form.Control
                type="text"
                name="form[IPhomeProvince]"
                defaultValue={formValues.IPhomeProvince}
                onChange={(e) => setField('IPhomeProvince', e.target.value)}
                isInvalid={errors.IPhomeProvince}
              />
              <Form.Control.Feedback type="invalid">{errors.IPhomeProvince}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="form[IPhomeCountry]"
                defaultValue={formValues.IPhomeCountry}
                onChange={(e) => setField('IPhomeCountry', e.target.value)}
                isInvalid={errors.IPhomeCountry}
              />
              <Form.Control.Feedback type="invalid">{errors.IPhomeCountry}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="form[IPhomePostalCode]"
                defaultValue={formValues.IPhomePostalCode}
                placeholder="X#X#X#"
                onChange={(e) => setField('IPhomePostalCode', e.target.value)}
                isInvalid={errors.IPhomePostalCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IPhomePostalCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Business Address</Form.Label>
              <Form.Control
                type="text"
                name="form[IPbusinessStreet]"
                defaultValue={formValues.IPbusinessStreet}
                placeholder="123 Fake St"
                onChange={(e) => setField('IPbusinessStreet', e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="form[IPbusinessCity]"
                defaultValue={formValues.IPbusinessCity}
                onChange={(e) => setField('IPbusinessCity', e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formProvince">
              <Form.Label>Province/State</Form.Label>
              <Form.Control
                type="text"
                name="form[IPbusinessProvince]"
                defaultValue={formValues.IPbusinessProvince}
                onChange={(e) => setField('IPbusinessProvince', e.target.value)}
                isInvalid={errors.IPbusinessProvince}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IPbusinessProvince}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="form[IPbusinessCountry]"
                defaultValue={formValues.IPbusinessCountry}
                onChange={(e) => setField('IPbusinessCountry', e.target.value)}
                isInvalid={errors.IPbusinessCountry}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IPbusinessCountry}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="form[IPbusinessPostalCode]"
                defaultValue={formValues.IPbusinessPostalCode}
                placeholder="X#X#X#"
                onChange={(e) => setField('IPbusinessPostalCode', e.target.value)}
                isInvalid={errors.IPbusinessPostalCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IPbusinessPostalCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Form.Group controlId="formPolicyNumber">
            <Form.Label>Policy Number</Form.Label>
            <Form.Control
              type="text"
              name="form[policyNumber]"
              defaultValue={formValues.policyNumber}
              onChange={(e) => setField('policyNumber', e.target.value)}
              isInvalid={errors.policyNumber}
            />
            <Form.Control.Feedback type="invalid">{errors.policyNumber}</Form.Control.Feedback>
          </Form.Group>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="secondary" onClick={goBack}>
              Previous
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Continue to Vehicle Information
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default InsurancePolicy;
