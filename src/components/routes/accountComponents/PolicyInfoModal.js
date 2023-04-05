import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const PolicyInfoModal = (props) => {
  const [newPolicy, setNewPolicy] = useState({});
  const [errors, setErrors] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));

  const setField = (field, value) => {
    setNewPolicy({
      ...newPolicy,
      [field]: value,
    });
    // checking for errors, and removing them from error object
    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = async (e) => {
    console.log('inside submit');
    e.preventDefault();
    const newErrors = checkErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      console.log('success, no errors');
      props.onHide();
    }

    console.log(newPolicy);
    try {
      console.log(newPolicy);
      let res = await fetch('http://localhost:8080/api/postPolicy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(newPolicy),
      });
      if (res.status >= 200 && res.status <= 299) {
        // maybe empty out fields and errors here with set state
        console.log('POST Success!!');
      } else {
        console.log('Some Error occurred...');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const postPolicy = async () => {
  //   try {
  //     let res = await fetch('http://localhost:8080/api/postPolicy', {
  //       method: 'POST',
  //       headers: { Authorization: token },
  //       body: newPolicy,
  //     });
  //     if (res.status >= 200 && res.status <= 299) {
  //       // maybe empty out fields and errors here with set state
  //       console.log('POST Success!!');
  //     } else {
  //       console.log('Some Error occurred...');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const checkErrors = () => {
    const {
      insurer,
      insurerName,
      Agent,
      homeStreet,
      homeCity,
      homeCountry,
      homeProvince,
      homePostalCode,
      businessCountry,
      businessProvince,
      businessPostalCode,
      policyNumber,
    } = newPolicy;
    const newErrors = {};

    if (props.adding === true) {
      // insurer and agent check
      if (!insurer || insurer === '') newErrors.insurer = 'Must provide insurer';
      if (!insurerName || insurerName === '') newErrors.insurerName = 'Must provide insurer name';
      if (!Agent || Agent === '') newErrors.Agent = 'Must provide agent';

      // home address check
      if (!homeStreet || homeStreet === '')
        newErrors.homeStreet = 'Must provide home street address';
      if (!homeCity || homeCity === '') newErrors.homeCity = 'Must provide city';
      if (!homeCountry || homeCountry === '') newErrors.homeCountry = 'Must provide country';
      if (!homeProvince || homeProvince === '') newErrors.homeProvince = 'Must provide province';
      if (!homePostalCode || homePostalCode === '')
        newErrors.homePostalCode = 'Must provide postal code';

      // policy number check
      if (!policyNumber || policyNumber === '')
        newErrors.policyNumber = 'Must include policy number';
    }

    if (homeCountry && homeCountry !== '' && homeCountry !== 'Canada')
      newErrors.homeCountry = 'Must be Canada';
    if (
      homeProvince &&
      homeProvince !== '' &&
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        homeProvince
      )
    )
      newErrors.homeProvince = 'Must be a Canadian province code (e.g. ON)';
    if (
      homePostalCode &&
      homePostalCode !== '' &&
      !/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(homePostalCode)
    )
      newErrors.homePostalCode = 'Postal code must be in X#X#X# format';

    // business validation
    if (businessCountry && businessCountry !== '' && businessCountry !== 'Canada')
      newErrors.businessCountry = 'Must be Canada';
    if (
      businessProvince &&
      businessProvince !== '' &&
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        businessProvince
      )
    )
      newErrors.businessProvince = 'Must be a Canadian province code (e.g. ON)';
    if (
      businessPostalCode &&
      businessPostalCode !== '' &&
      !/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(businessPostalCode)
    )
      newErrors.businessPostalCode = 'Postal code must be in X#X#X# format';

    return newErrors;
  };

  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {!props.adding ? 'Edit Insurance Policy' : 'Add New Insurance Policy'}
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formInsurer">
              <Form.Label>Insurer</Form.Label>
              <Form.Control
                type="text"
                name="newPolicy[insurer]"
                defaultValue={!props.adding ? props.data.insurer : newPolicy.insurer}
                onChange={(e) => setField('insurer', e.target.value)}
                isInvalid={errors.insurer}
              />
              <Form.Control.Feedback type="invalid">{errors.insurer}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formInsurerName">
              <Form.Label>Name of Insurer</Form.Label>
              <Form.Control
                type="text"
                name="newPolicy[insurerName]"
                defaultValue={!props.adding ? props.data.insurerName : newPolicy.insurerName}
                onChange={(e) => setField('insurerName', e.target.value)}
                isInvalid={errors.insurerName}
              />
              <Form.Control.Feedback type="invalid">{errors.insurerName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formInsuranceAgent">
              <Form.Label>Agent</Form.Label>
              <Form.Control
                type="text"
                name="newPolicy[Agent]"
                defaultValue={!props.adding ? props.data.Agent : newPolicy.Agent}
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
                  name="newPolicy[homeStreet]"
                  defaultValue={!props.adding ? props.data.homeStreet : newPolicy.homeStreet}
                  placeholder={!props.adding ? props.data.homeStreet : '123 Fake St'}
                  onChange={(e) => setField('homeStreet', e.target.value)}
                  isInvalid={errors.homeStreet}
                />
                <Form.Control.Feedback type="invalid">{errors.homeStreet}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[homeCity]"
                  defaultValue={!props.adding ? props.data.homeCity : newPolicy.homeCity}
                  placeholder={!props.adding ? props.data.homeCity : ''}
                  onChange={(e) => setField('homeCity', e.target.value)}
                  isInvalid={errors.homeCity}
                />
                <Form.Control.Feedback type="invalid">{errors.homeCity}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[homeProvince]"
                  defaultValue={!props.adding ? props.data.homeProvince : newPolicy.homeProvince}
                  placeholder={!props.adding ? props.data.homeProvince : ''}
                  onChange={(e) => setField('homeProvince', e.target.value)}
                  isInvalid={errors.homeProvince}
                />
                <Form.Control.Feedback type="invalid">{errors.homeProvince}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[homeCountry]"
                  defaultValue={!props.adding ? props.data.homeCountry : newPolicy.homeCountry}
                  placeholder={!props.adding ? props.data.homeCountry : ''}
                  onChange={(e) => setField('homeCountry', e.target.value)}
                  isInvalid={errors.homeCountry}
                />
                <Form.Control.Feedback type="invalid">{errors.homeCountry}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[homePostalCode]"
                  defaultValue={
                    !props.adding ? props.data.homePostalCode : newPolicy.homePostalCode
                  }
                  placeholder={!props.adding ? props.data.homePostalCode : 'X#X#X#'}
                  onChange={(e) => setField('homePostalCode', e.target.value)}
                  isInvalid={errors.homePostalCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homePostalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="formAddress">
                <Form.Label>Business Address</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[businessStreet]"
                  defaultValue={
                    !props.adding ? props.data.businessStreet : newPolicy.businessStreet
                  }
                  placeholder={!props.adding ? props.data.businessStreet : '123 Fake St'}
                  onChange={(e) => setField('businessStreet', e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[businessCity]"
                  defaultValue={!props.adding ? props.data.businessCity : newPolicy.businessCity}
                  placeholder={!props.adding ? props.data.businessCity : ''}
                  onChange={(e) => setField('businessCity', e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[businessProvince]"
                  defaultValue={
                    !props.adding ? props.data.businessProvince : newPolicy.businessProvince
                  }
                  placeholder={!props.adding ? props.data.businessProvince : ''}
                  onChange={(e) => setField('businessProvince', e.target.value)}
                  isInvalid={errors.businessProvince}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.businessProvince}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[businessCountry]"
                  defaultValue={
                    !props.adding ? props.data.businessCountry : newPolicy.businessCountry
                  }
                  placeholder={!props.adding ? props.data.businessCountry : ''}
                  onChange={(e) => setField('businessCountry', e.target.value)}
                  isInvalid={errors.businessCountry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.businessCountry}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="newPolicy[businessPostalCode]"
                  defaultValue={
                    !props.adding ? props.data.businessPostalCode : newPolicy.businessPostalCode
                  }
                  placeholder={!props.adding ? props.data.businessProvince : 'X#X#X#'}
                  onChange={(e) => setField('businessPostalCode', e.target.value)}
                  isInvalid={errors.businessPostalCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.businessPostalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <Form.Group controlId="formPolicyNumber">
              <Form.Label>Policy Number</Form.Label>
              <Form.Control
                type="text"
                name="newPolicy[policyNumber]"
                defaultValue={!props.adding ? props.data.policyNumber : newPolicy.policyNumber}
                placeholder={!props.adding ? props.data.policyNumber : ''}
                onChange={(e) => setField('policyNumber', e.target.value)}
                isInvalid={errors.policyNumber}
              />
              <Form.Control.Feedback type="invalid">{errors.policyNumber}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save and Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PolicyInfoModal;
