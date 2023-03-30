import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import PersonInjured from './PersonInjured';
import Witness from './Witness';
import Evidence from './Evidence';
import PropertyDamage from './PropertyDamage';

const ReportGeneral = ({ setField, setErrors, errors, formValues }) => {
  const [personsInjured, setPersonsInjured] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [evidences, setEvidences] = useState([]);
  const [propertyDamages, setPropertyDamages] = useState([]);
  const [personInjuredErrors, setPersonInjuredErrors] = useState({});
  const [personInjuredOnClickErrors, setPersonInjuredOnClickErrors] = useState({});
  const [witnessErrors, setWitnessErrors] = useState({});
  const [witnessOnClickErrors, setWitnessOnClickErrors] = useState({});
  const [evidenceErrors, setEvidenceErrors] = useState({});
  const [evidenceOnClickErrors, setEvidenceOnClickErrors] = useState({});
  const [propertyDamageErrors, setPropertyDamageErrors] = useState({});
  const [propertyDamageOnClickErrors, setPropertyDamageOnClickErrors] = useState({});
  const [bearerToken, setToken] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState([]);

  useEffect(() => {
    fetchUser().then((users) => setToken(users.signInUserSession.idToken.jwtToken));

    fetch('http://localhost:8080/api/userInfo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVehicleInfo([data.userInfo.vehicles[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchUser = async () => {
    return await Auth.currentAuthenticatedUser();
  };

  const addPersonInjured = (e) => {
    e.preventDefault();
    setPersonsInjured([
      ...personsInjured,
      {
        personInjuredName: '',
      },
    ]);
  };

  const addWitness = (e) => {
    e.preventDefault();
    setWitnesses([
      ...witnesses,
      {
        witnessName: '',
      },
    ]);
  };

  const addEvidence = (e) => {
    e.preventDefault();
    setEvidences([
      ...evidences,
      {
        evidenceName: '',
      },
    ]);
  };

  const addPropertyDamage = (e) => {
    e.preventDefault();
    setPropertyDamages([
      ...propertyDamages,
      {
        propertyDamageOwnerName: '',
      },
    ]);
    console.log(propertyDamages);
  };

  const checkPersonInjuredError = (e, index) => {
    e.preventDefault();
    let error = {};

    /* if (e.target.name === 'personInjuredAddress') {
      if (e.target.value) {
        if (!personsInjured[index].personInjuredCity)
          error[index].personInjuredCity = 'Incomplete address';
        if (!personsInjured[index].personInjuredProvince)
          error[index].personInjuredProvince = 'Incomplete address';
        if (!personsInjured[index].personInjuredCountry)
          error[index].personInjuredCountry = 'Incomplete address';
        if (!personsInjured[index].personInjuredPostalCode)
          error[index].personInjuredPostalCode = 'Incomplete address';
      }
    } else if (e.target.name === 'personInjuredCity') {
      if (e.target.value) {
        if (!personsInjured[index].personInjuredAddress)
          error[index].personInjuredAddress = 'Incomplete address';
        if (!personsInjured[index].personInjuredProvince)
          error[index].personInjuredProvince = 'Incomplete address';
        if (!personsInjured[index].personInjuredCountry)
          error[index].personInjuredCountry = 'Incomplete address';
        if (!personsInjured[index].personInjuredPostalCode)
          error[index].personInjuredPostalCode = 'Incomplete address';
      }
    } else if (e.target.name === 'personInjuredProvince') {
      if (e.target.value) {
        if (!personsInjured[index].personInjuredAddress)
          error[index].personInjuredAddress = 'Incomplete address';
        if (!personsInjured[index].personInjuredCity)
          error[index].personInjuredCity = 'Incomplete address';
        if (!personsInjured[index].personInjuredCountry)
          error[index].personInjuredCountry = 'Incomplete address';
        if (!personsInjured[index].personInjuredPostalCode)
          error[index].personInjuredPostalCode = 'Incomplete address';
      }
    } else if (e.target.name === 'personInjuredCountry') {
      if (e.target.value) {
        if (!personsInjured[index].personInjuredAddress)
          error[index].personInjuredAddress = 'Incomplete address';
        if (!personsInjured[index].personInjuredCity)
          error[index].personInjuredCity = 'Incomplete address';
        if (!personsInjured[index].personInjuredProvince)
          error[index].personInjuredProvince = 'Incomplete address';
        if (!personsInjured[index].personInjuredPostalCode)
          error[index].personInjuredPostalCode = 'Incomplete address';
      }
    } else if (e.target.name === 'personInjuredPostalCode') {
      if (e.target.value) {
        if (!personsInjured[index].personInjuredAddress)
          error[index].personInjuredAddress = 'Incomplete address';
        if (!personsInjured[index].personInjuredCity)
          error[index].personInjuredCity = 'Incomplete address';
        if (!personsInjured[index].personInjuredCountry)
          error[index].personInjuredCountry = 'Incomplete address';
        if (!personsInjured[index].personInjuredProvince)
          error[index].personInjuredProvince = 'Incomplete address';
      }
    } else */
    if (!e.target.value) {
      error[index][e.target.name] = 'Required field';
      setPersonInjuredErrors({ ...personInjuredErrors, ...error });
    } else {
      delete personInjuredErrors[index][e.target.name];
    }
  };

  const checkWitnessError = (e, index) => {
    e.preventDefault();
    let error = {};
    if (!e.target.value) {
      error[index][e.target.name] = 'Required field';
      setWitnessErrors({ ...witnessErrors, ...error });
    } else {
      delete witnessErrors[index][e.target.name];
    }
  };

  const checkEvidenceError = (e, index) => {
    e.preventDefault();
    let error = {};
    if (!e.target.value) {
      error[index][e.target.name] = 'Required field';
      setEvidenceErrors({ ...evidenceErrors, ...error });
    } else {
      delete evidenceErrors[index][e.target.name];
    }
  };

  const checkPropertyDamageError = (e, index) => {
    e.preventDefault();
    let error = {};
    if (!e.target.value) {
      error[index][e.target.name] = 'Required field';
      setPropertyDamageErrors({ ...propertyDamageErrors, ...error });
    } else {
      delete propertyDamageErrors[index][e.target.name];
    }
  };

  const removePersonInjured = (e, index) => {
    e.preventDefault();
    setPersonsInjured(personsInjured.filter((personInjured, idx) => idx != index));
    setPersonInjuredErrors({});
    setPersonInjuredOnClickErrors({});
  };

  const removeWitness = (e, index) => {
    e.preventDefault();
    setWitnesses(witnesses.filter((witness, idx) => idx != index));
    setWitnessErrors({});
    setWitnessOnClickErrors({});
  };

  const removeEvidence = (e, index) => {
    e.preventDefault();
    setEvidences(evidences.filter((evidence, idx) => idx !== index));
    setEvidenceErrors({});
    setEvidenceOnClickErrors({});
  };

  const removePropertyDamage = (e, index) => {
    e.preventDefault();
    setPropertyDamages(propertyDamages.filter((propertyDamage, idx) => idx !== index));
    setPropertyDamageErrors({});
    setPropertyDamageOnClickErrors({});
  };

  const handlePersonInjuredChange = (e, index) => {
    e.preventDefault();
    setPersonsInjured([
      ...personsInjured.slice(0, index),
      { ...personsInjured[index], [e.target.name]: e.target.value },
      ...personsInjured.slice(index + 1),
    ]);
    checkPersonInjuredError(e, index);
  };

  const handleWitnessChange = (e, index) => {
    e.preventDefault();
    setWitnesses([
      ...witnesses.slice(0, index),
      { ...witnesses[index], [e.target.name]: e.target.value },
      ...witnesses.slice(index + 1),
    ]);
    checkWitnessError(e, index);
  };

  const handleEvidenceChange = (e, index) => {
    e.preventDefault();
    setEvidences([
      ...evidences.slice(0, index),
      { ...evidences[index], [e.target.name]: e.target.value },
      ...evidences.slice(index + 1),
    ]);
    checkEvidenceError(e, index);
  };

  const handlePropertyDamageChange = (e, index) => {
    e.preventDefault();
    setPropertyDamages([
      ...propertyDamages.slice(0, index),
      { ...propertyDamages[index], [e.target.name]: e.target.value },
      ...propertyDamages.slice(index + 1),
    ]);
    checkPropertyDamageError(e, index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = checkErrors();
    if (personInjuredErrors) setPersonInjuredOnClickErrors(personInjuredErrors);
    if (witnessErrors) setWitnessOnClickErrors(witnessErrors);
    if (evidenceErrors) setEvidenceOnClickErrors(evidenceErrors);
    if (propertyDamageErrors) setPropertyDamageOnClickErrors(propertyDamageErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
    const report = { formValues, personsInjured, witnesses, evidences, propertyDamages };
    console.log(report);
    const token = 'Bearer ' + bearerToken;
    try {
      let res = await fetch('http://localhost:8080/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          report,
        }),
      });
      if (res.status >= 200 && res.status <= 299) {
        console.log('POST Success!!');
      } else {
        console.log('Some Error occurred...');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkErrors = () => {
    const { date, time } = formValues;
    const newErrors = {};
    if (!date || date === '') newErrors.date = 'Must provide a date';
    //else if (Date(date) > Date.now()) newErrors.date = 'Date must be current date or before';
    if (!time || time === '') newErrors.time = 'Must provide a time';

    // if (evidences.every((evidence) => !evidence.name || evidence.name === ''))
    //   newErrors.time = 'Must provide a time';

    return newErrors;
  };

  return (
    <div>
      <Container style={{ padding: '15px' }}>
        <Form>
          <Row>
            <Form.Group as={Col} controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="form[date]"
                defaultValue={formValues.date}
                onChange={(e) => setField('date', e.target.value)}
                isInvalid={errors.date}
              />
              <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="form[time]"
                defaultValue={formValues.time}
                onChange={(e) => setField('time', e.target.value)}
                isInvalid={errors.time}
              />
              <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group controlId="formDayLight">
            <Form.Label>Light Conditions</Form.Label>
            <br />
            <Form.Check
              type="radio"
              name="form[daylight]"
              id="inline-radio-1"
              value="dark"
              label="Dark"
              onChange={(e) => setField('daylight', e.target.value)}
              inline
            />
            <Form.Check
              type="radio"
              name="form[daylight]"
              id="inline-radio-2"
              value="daylight"
              label="Daylight"
              onChange={(e) => setField('daylight', e.target.value)}
              inline
            />
            <Form.Check
              type="radio"
              name="form[daylight]"
              id="inline-radio-3"
              value="dusk"
              label="Dusk"
              onChange={(e) => setField('daylight', e.target.value)}
              inline
            />
          </Form.Group>
          <Form.Group controlId="formRoadConditions">
            <Form.Label>Road Conditions</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[roadconditions]"
              defaultValue={formValues.roadConditions}
              onChange={(e) => setField('roadconditions', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formWeatherConditions">
            <Form.Label>Weather Conditions</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[weatherconditions]"
              defaultValue={formValues.weatherConditions}
              onChange={(e) => setField('weatherconditions', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="form[location]"
              defaultValue={formValues.location}
              onChange={(e) => setField('location', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formVehicle">
            <Form.Label>Vehicle</Form.Label>
            <Form.Select aria-label="Default select example">
              {vehicleInfo.map((vehicle, idx) => (
                <option key={idx} value={vehicle.licensePlateNo}></option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formAccidentDescription">
            <Form.Label>Accident Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[accidentcondtions]"
              defaultValue={formValues.accidentCondtions}
              onChange={(e) => setField('accidentcondtions', e.target.value)}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="formSpeed">
              <Form.Label>Speed</Form.Label>
              <Form.Control
                type="number"
                name="form[speed]"
                defaultValue={formValues.speed}
                onChange={(e) => setField('speed', e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formDirection">
              <Form.Label>Direction</Form.Label>
              <Form.Control
                type="text"
                name="form[direction]"
                defaultValue={formValues.direction}
                onChange={(e) => setField('direction', e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="formPurposeForUsage">
            <Form.Label>Purpose for Usage</Form.Label>
            <Form.Control
              type="text"
              name="form[purposeforusage]"
              defaultValue={formValues.purposeForUsage}
              onChange={(e) => setField('purposeforusage', e.target.value)}
            />
          </Form.Group>
          <Form.Label>Damage Description</Form.Label>
          <Form.Group controlId="formSeverity">
            <Form.Check
              type="radio"
              name="form[severity]"
              id="inline-radio-1"
              value="minor"
              label="Minor"
              onChange={(e) => setField('severity', e.target.value)}
              inline
            />
            <Form.Check
              type="radio"
              name="form[severity]"
              id="inline-radio-2"
              value="medium"
              label="Medium"
              onChange={(e) => setField('severity', e.target.value)}
              inline
            />
            <Form.Check
              type="radio"
              name="form[severity]"
              id="inline-radio-3"
              value="major"
              label="Major"
              onChange={(e) => setField('severity', e.target.value)}
              inline
            />
          </Form.Group>
          <Form.Group controlId="formDamageDescription">
            <Form.Control
              as="textarea"
              type="text"
              name="form[damagecondtions]"
              defaultValue={formValues.damageCondtions}
              onChange={(e) => setField('damagecondtions', e.target.value)}
            />
          </Form.Group>
          <hr />
          <Form.Group controlId="formPersonInjured">
            <Form.Label>Persons Injured</Form.Label>
            <br />
            <Button onClick={(e) => addPersonInjured(e)}>Add</Button>
            {personsInjured.map((personInjured, idx) => (
              <PersonInjured
                key={idx}
                index={idx}
                handleChange={handlePersonInjuredChange}
                handleRemove={removePersonInjured}
                onClickErrors={personInjuredOnClickErrors}
                errorSetter={setPersonInjuredErrors}
              />
            ))}
          </Form.Group>
          <hr />
          <Form.Group controlId="formWitness">
            <Form.Label>Witnesses</Form.Label>
            <br />
            <Button onClick={(e) => addWitness(e)}>Add</Button>
            {witnesses.map((witness, idx) => (
              <Witness
                key={idx}
                index={idx}
                handleChange={handleWitnessChange}
                handleRemove={removeWitness}
                onClickErrors={witnessOnClickErrors}
                errorSetter={setWitnessErrors}
              />
            ))}
          </Form.Group>
          <hr />
          <Form.Group controlId="formEvidence">
            <Form.Label>Evidence</Form.Label>
            <br />
            <Button onClick={(e) => addEvidence(e)}>Add</Button>
            {evidences.map((evidence, idx) => (
              <Evidence
                key={idx}
                index={idx}
                handleChange={handleEvidenceChange}
                handleRemove={removeEvidence}
                onClickErrors={evidenceOnClickErrors}
                errorSetter={setEvidenceErrors}
              />
            ))}
          </Form.Group>
          <hr />
          <Form.Group controlId="formPropertyDamage">
            <Form.Label>Property Damages</Form.Label>
            <br />
            <Button onClick={(e) => addPropertyDamage(e)}>Add</Button>
            {propertyDamages.map((propertyDamage, idx) => (
              <PropertyDamage
                key={idx}
                index={idx}
                handleChange={handlePropertyDamageChange}
                handleRemove={removePropertyDamage}
                onClickErrors={propertyDamageOnClickErrors}
                errorSetter={setPropertyDamageErrors}
              />
            ))}
          </Form.Group>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create Report
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ReportGeneral;
