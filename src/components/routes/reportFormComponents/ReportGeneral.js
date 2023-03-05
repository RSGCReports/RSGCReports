import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import PersonInjured from './PersonInjured';
import Witness from './Witness';
import Evidence from './Evidence';

const ReportGeneral = ({ setField, setErrors, errors, formValues }) => {
  const [personsInjured, setPersonsInjured] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [evidences, setEvidences] = useState([]);
  const [evidenceErrors, setEvidenceErrors] = useState({});
  const [evidenceOnClickErrors, setEvidenceOnClickErrors] = useState({});
  const addPersonInjured = (e) => {
    e.preventDefault();
    setPersonsInjured([
      ...personsInjured,
      {
        personInjuredName: '',
        personInjuredDob: '',
        personInjuredHospital: '',
        personInjuredNatureOfInjuries: '',
      },
    ]);
  };
  const addWitness = (e) => {
    e.preventDefault();
    setWitnesses([
      ...witnesses,
      {
        witnessName: '',
        witnessPhone: '',
      },
    ]);
  };
  const checkEvidenceError = (e, index) => {
    e.preventDefault();
    let error = {};
    //logic to check against I guess
    if (!e.target.value || e.target.value === '') {
      error = { [index]: { [e.target.name]: 'Required field' } };
      setEvidenceErrors({ ...evidenceErrors, ...error });
    } else {
      delete evidenceErrors[index];
    }
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
  const removePersonInjured = (e, index) => {
    e.preventDefault();
    setPersonsInjured(personsInjured.filter((personInjured, idx) => idx != index));
  };
  const removeWitness = (e, index) => {
    e.preventDefault();
    setWitnesses(witnesses.filter((witness, idx) => idx != index));
  };
  const removeEvidence = (e, index) => {
    e.preventDefault();
    setEvidences(evidences.filter((evidence, idx) => idx != index));
  };

  const handlePersonInjuredChange = (e, index) => {
    e.preventDefault();
    setPersonsInjured([
      ...personsInjured.slice(0, index),
      { ...personsInjured[index], [e.target.name]: e.target.value },
      ...personsInjured.slice(index + 1),
    ]);
    console.log(evidences[index]);
  };
  const handleWitnessChange = (e, index) => {
    e.preventDefault();
    setWitnesses([
      ...witnesses.slice(0, index),
      { ...witnesses[index], [e.target.name]: e.target.value },
      ...witnesses.slice(index + 1),
    ]);
    console.log(evidences[index]);
  };
  const handleEvidenceChange = (e, index) => {
    e.preventDefault();
    setEvidences([
      ...evidences.slice(0, index),
      { ...evidences[index], [e.target.name]: e.target.value },
      ...evidences.slice(index + 1),
    ]);
    // console.log(evidences[index]);
    //call this on change to accumulate evidence errors
    checkEvidenceError(e, index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = checkErrors();
    if (evidenceErrors) setEvidenceOnClickErrors(evidenceErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
    console.log(evidenceOnClickErrors);
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
          <Form.Group controlId="formDate">
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
          <Form.Group controlId="formTime">
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
          <Form.Group controlId="formDayLight">
            <Form.Label>Light Conditions</Form.Label>
            <br />
            <Form.Check
              type="radio"
              name="daylight"
              id="inline-radio-1"
              value="0"
              label="Dark"
              inline
            />
            <Form.Check
              type="radio"
              name="daylight"
              id="inline-radio-2"
              value="1"
              label="Daylight"
              inline
            />
            <Form.Check
              type="radio"
              name="daylight"
              id="inline-radio-3"
              value="2"
              label="Dusk"
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
            />
          </Form.Group>
          <Form.Group controlId="formWeatherConditions">
            <Form.Label>Weather Conditions</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[weatherconditions]"
              defaultValue={formValues.weatherConditions}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="form[location]" defaultValue={formValues.location} />
          </Form.Group>
          <Form.Group controlId="formAccidentDescription">
            <Form.Label>Accident Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[accidentcondtions]"
              defaultValue={formValues.accidentCondtions}
            />
          </Form.Group>
          <Form.Group controlId="formSpeed">
            <Form.Label>Speed</Form.Label>
            <Form.Control type="number" name="form[speed]" defaultValue={formValues.speed} />
          </Form.Group>
          <Form.Group controlId="formDirection">
            <Form.Label>Direction</Form.Label>
            <Form.Control type="text" name="form[direction]" defaultValue={formValues.direction} />
          </Form.Group>
          <Form.Group controlId="formPurposeForUsage">
            <Form.Label>Purpose for Usage</Form.Label>
            <Form.Control
              type="text"
              name="form[purposeforusage]"
              defaultValue={formValues.purposeForUsage}
            />
          </Form.Group>
          <Form.Label>Damage Description</Form.Label>
          <Form.Group controlId="formSeverity">
            <Form.Check
              type="radio"
              name="daylight"
              id="inline-radio-1"
              value="0"
              label="Minor"
              inline
            />
            <Form.Check
              type="radio"
              name="daylight"
              id="inline-radio-2"
              value="1"
              label="Medium"
              inline
            />
            <Form.Check
              type="radio"
              name="daylight"
              id="inline-radio-3"
              value="2"
              label="Major"
              inline
            />
          </Form.Group>
          <Form.Group controlId="formDamageDescription">
            <Form.Control
              as="textarea"
              type="text"
              name="form[damagecondtions]"
              defaultValue={formValues.damageCondtions}
            />
          </Form.Group>

          <Form.Group controlId="formPersonInjured">
            <Form.Label>Persons Injured</Form.Label>
            {personsInjured.map((personInjured, idx) => (
              <PersonInjured
                key={idx}
                index={idx}
                handleChange={handlePersonInjuredChange}
                handleRemove={removePersonInjured}
              />
            ))}
            <br />
            <Button onClick={(e) => addPersonInjured(e)}>Add</Button>
          </Form.Group>
          <Form.Group controlId="formWitness">
            <Form.Label>Witnesses</Form.Label>
            {witnesses.map((witness, idx) => (
              <Witness
                key={idx}
                index={idx}
                handleChange={handleWitnessChange}
                handleRemove={removeWitness}
              />
            ))}
            <br />
            <Button onClick={(e) => addWitness(e)}>Add</Button>
          </Form.Group>
          <Form.Group controlId="formEvidence">
            <Form.Label>Evidence</Form.Label>
            {evidences.map((evidence, idx) => (
              <Evidence
                key={idx}
                index={idx}
                handleChange={handleEvidenceChange}
                handleRemove={removeEvidence}
                evidenceOnClickErrors={evidenceOnClickErrors}
              />
            ))}
            <br />
            <Button onClick={(e) => addEvidence(e)}>Add</Button>
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
