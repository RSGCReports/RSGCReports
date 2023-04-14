import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const VehicleInfo = ({ nextStep, prevStep, setField, setErrors, errors, formValues }) => {
  // const [checkedReg, setCheckedReg] = useState(false);
  // const [checkedAct, setCheckedAct] = useState(false);

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
      registeredOwner,
      actualOwner,
      regStreet,
      regCity,
      regCountry,
      regProvince,
      regPostalCode,
      actStreet,
      actCity,
      actCountry,
      actProvince,
      actPostalCode,
      licensePlateNo,
      province,
      make,
      year,
      model,
      type,
      VIN,
    } = formValues;
    const newErrors = {};

    // name check
    if (!registeredOwner || registeredOwner === '')
      newErrors.registeredOwner = 'Must provide registered owners name';
    if (!actualOwner || actualOwner === '')
      newErrors.actualOwner = 'Must provide actual owners name';

    // registered owners address check
    // if (!checkedReg) {
    if (!regStreet || regStreet === '') newErrors.regStreet = 'Must provide street address';
    if (!regCity || regCity === '') newErrors.regCity = 'Must provide city';
    if (!regCountry || regCountry === '') newErrors.regCountry = 'Must provide country';
    else if (regCountry !== 'Canada') newErrors.regCountry = 'Must be Canada';
    if (!regProvince || regProvince === '') newErrors.regProvince = 'Must provide province';
    else if (
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        regProvince
      )
    )
      newErrors.regProvince = 'Must be a Canadian province code (e.g. ON)';
    if (!regPostalCode || regPostalCode === '')
      newErrors.regPostalCode = 'Must provide postal code';
    else if (!/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(regPostalCode))
      newErrors.regPostalCode = 'Postal code must be in X#X#X# format';
    // }
    // actual owners address check
    // if (!checkedAct) {
    if (!actStreet || actStreet === '') newErrors.actStreet = 'Must provide street address';
    if (!actCity || actCity === '') newErrors.actCity = 'Must provide city';
    if (!actCountry || actCountry === '') newErrors.actCountry = 'Must provide country';
    else if (actCountry !== 'Canada') newErrors.actCountry = 'Must be Canada';
    if (!actProvince || actProvince === '') newErrors.actProvince = 'Must provide province';
    else if (
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        actProvince
      )
    )
      newErrors.actProvince = 'Must be a Canadian province code (e.g. ON)';
    if (!actPostalCode || actPostalCode === '')
      newErrors.actPostalCode = 'Must provide postal code';
    else if (!/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(actPostalCode))
      newErrors.actPostalCode = 'Postal code must be in X#X#X# format';
    // }
    // license plate check
    if (!licensePlateNo || licensePlateNo === '')
      newErrors.licensePlateNo = 'Must provide license plate number';

    // vehicle details check
    if (!province || province === '')
      newErrors.province = 'Must provide the province of where the vehicle was bought';
    else if (
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        province
      )
    )
      newErrors.province = 'Must be a Canadian province';
    if (!make || make === '') newErrors.make = 'Must provide make of vehicle';
    if (!year || year === '') newErrors.year = 'Must provide year of vehicle';
    if (!model || model === '') newErrors.model = 'Must provide model of vehicle';
    if (!type || type === '') newErrors.type = 'Must provide type of vehicle';
    if (!VIN || VIN === '') newErrors.VIN = 'Must provide vehicle identification number';
    else if (VIN.length != 17)
      newErrors.VIN = 'Vehicle identification number must be 17 characters';

    return newErrors;
  };

  return (
    <div>
      <Container style={{ padding: '15px' }}>
        <Form>
          <h3>Vehicle Information</h3>
          <br />
          <h6>Registered Owner{"'"}s Information</h6>
          <Form.Group controlId="formRegOwner">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="form[registeredOwner]"
              defaultValue={formValues.registeredOwner}
              onChange={(e) => setField('registeredOwner', e.target.value)}
              isInvalid={errors.registeredOwner}
            />
            <Form.Control.Feedback type="invalid">{errors.registeredOwner}</Form.Control.Feedback>
          </Form.Group>
          <br />
          {/* <Form.Check
            type="checkbox"
            id="default-checkbox"
            label="Check this ONLY if Registered Owners Address is the same as Home Address"
            checked={checkedReg}
            onChange={() => setCheckedReg(true)}
          /> */}
          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="form[regStreet]"
                defaultValue={formValues.regStreet}
                placeholder="123 Fake St"
                onChange={(e) => setField('regStreet', e.target.value)}
                isInvalid={errors.regStreet}
              />
              <Form.Control.Feedback type="invalid">{errors.regStreet}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="form[regCity]"
                defaultValue={formValues.regCity}
                // placeholder={checkedReg ? formValues.homeCity : ''}
                onChange={(e) => setField('regCity', e.target.value)}
                isInvalid={errors.regCity}
              />
              <Form.Control.Feedback type="invalid">{errors.regCity}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formProvince">
              <Form.Label>Province/State</Form.Label>
              <Form.Control
                type="text"
                name="form[regProvince]"
                defaultValue={formValues.regProvince}
                // placeholder={checkedReg ? formValues.homeProvince : ''}
                onChange={(e) => setField('regProvince', e.target.value)}
                isInvalid={errors.regProvince}
              />
              <Form.Control.Feedback type="invalid">{errors.regProvince}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="form[regCountry]"
                defaultValue={formValues.regCountry}
                // placeholder={checkedReg ? formValues.homeCountry : ''}
                onChange={(e) => setField('regCountry', e.target.value)}
                isInvalid={errors.regCountry}
              />
              <Form.Control.Feedback type="invalid">{errors.regCountry}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="form[regPostalCode]"
                defaultValue={formValues.regPostalCode}
                placeholder="X#X#X#"
                onChange={(e) => setField('regPostalCode', e.target.value)}
                isInvalid={errors.regPostalCode}
              />
              <Form.Control.Feedback type="invalid">{errors.regPostalCode}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <h6>Actual Owner{"'"}s Information</h6>
          {/* <Form.Check
            type="checkbox"
            id="default-checkbox"
            label="Check this ONLY if Actual Owners information is the same as Registered Owner"
            checked={checkedAct}
            onChange={() => setCheckedAct(true)}
          /> */}
          <Form.Group as={Col} controlId="formActOwner">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="form[actualOwner]"
              defaultValue={formValues.actualOwner}
              placeholder="John Doe"
              onChange={(e) => setField('actualOwner', e.target.value)}
              isInvalid={errors.actualOwner}
            />
            <Form.Control.Feedback type="invalid">{errors.actualOwner}</Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                name="form[actStreet]"
                defaultValue={formValues.actStreet}
                placeholder="123 Fake St"
                onChange={(e) => setField('actStreet', e.target.value)}
                isInvalid={errors.actStreet}
              />
              <Form.Control.Feedback type="invalid">{errors.actStreet}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="form[actCity]"
                defaultValue={formValues.actCity}
                // placeholder={checkedAct ? formValues.homeCity : ''}
                onChange={(e) => setField('actCity', e.target.value)}
                isInvalid={errors.actCity}
              />
              <Form.Control.Feedback type="invalid">{errors.actCity}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formProvince">
              <Form.Label>Province/State</Form.Label>
              <Form.Control
                type="text"
                name="form[actProvince]"
                defaultValue={formValues.actProvince}
                // placeholder={checkedAct ? formValues.homeProvince : ''}
                onChange={(e) => setField('actProvince', e.target.value)}
                isInvalid={errors.actProvince}
              />
              <Form.Control.Feedback type="invalid">{errors.actProvince}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="form[actCountry]"
                defaultValue={formValues.actCountry}
                // placeholder={checkedAct ? formValues.homeCountry : ''}
                onChange={(e) => setField('actCountry', e.target.value)}
                isInvalid={errors.actCountry}
              />
              <Form.Control.Feedback type="invalid">{errors.actCountry}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="form[actPostalCode]"
                defaultValue={formValues.actPostalCode}
                placeholder="X#X#X#"
                onChange={(e) => setField('actPostalCode', e.target.value)}
                isInvalid={errors.actPostalCode}
              />
              <Form.Control.Feedback type="invalid">{errors.actPostalCode}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <h6>Vehicle</h6>
          <Row>
            <Form.Group as={Col} controlId="formPlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                placeholder="ABCD1234"
                name="form[licensePlateNo]"
                defaultValue={formValues.licensePlateNo}
                onChange={(e) => setField('licensePlateNo', e.target.value)}
                isInvalid={errors.licensePlateNo}
              />
              <Form.Control.Feedback type="invalid">{errors.licensePlateNo}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                name="form[province]"
                defaultValue={formValues.province}
                onChange={(e) => setField('province', e.target.value)}
                isInvalid={errors.province}
              />
              <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formMake">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                name="form[make]"
                defaultValue={formValues.make}
                onChange={(e) => setField('make', e.target.value)}
                isInvalid={errors.make}
              />
              <Form.Control.Feedback type="invalid">{errors.make}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="form[year]"
                defaultValue={formValues.year}
                onChange={(e) => setField('year', e.target.value)}
                isInvalid={errors.year}
              />
              <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="form[model]"
                defaultValue={formValues.model}
                onChange={(e) => setField('model', e.target.value)}
                isInvalid={errors.model}
              />
              <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="form[type]"
                defaultValue={formValues.type}
                onChange={(e) => setField('type', e.target.value)}
                isInvalid={errors.type}
              />
              <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group controlId="formVin">
            <Form.Label>Vehicle Identification Number</Form.Label>
            <Form.Control
              type="text"
              name="form[VIN]"
              defaultValue={formValues.VIN}
              onChange={(e) => setField('VIN', e.target.value)}
              isInvalid={errors.VIN}
            />
            <Form.Control.Feedback type="invalid">{errors.VIN}</Form.Control.Feedback>
          </Form.Group>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="secondary" onClick={goBack}>
              Previous
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default VehicleInfo;
