import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
const ReportGeneral = ({ setField, setErrors, errors, formValues }) => {
  // const [personsInjured, setPersonsInjured] = useState([]);
  // const [policeInvestigation, setPoliceInvestigation] = useState([]);
  // const [witnesses, setWitnesses] = useState([]);
  // const [evidences, setEvidences] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = checkErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Hello');
    }
  };

  const checkErrors = () => {
    const { date } = formValues;
    const newErrors = {};
    if (!date || date === '') newErrors.date = 'Must provide date of birth';
    //else if (Date(date) > Date.now()) newErrors.date = 'Date must be current date or before';

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
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" name="form[time]" defaultValue={formValues.time} />
          </Form.Group>
          <Form.Group controlId="formDayLight">
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
          <Form.Group controlId="formDamageDescription">
            <Form.Label>Damage Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[damagecondtions]"
              defaultValue={formValues.damageCondtions}
            />
          </Form.Group>
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
          <Form.Group controlId="formPersonInjured">
            <Form.Label>Persons Injured</Form.Label>
            <br />
            <Button>Add</Button>
          </Form.Group>
          <Form.Group controlId="formPoliceInvestigation">
            <Form.Label>Police Investigation</Form.Label>
            <br />
            <Button>Add</Button>
          </Form.Group>
          <Form.Group controlId="formWitness">
            <Form.Label>Witnesses</Form.Label>
            <br />
            <Button>Add</Button>
          </Form.Group>
          <Form.Group controlId="formEvidence">
            <Form.Label>Evidence</Form.Label>
            <br />
            <Button>Add</Button>
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
