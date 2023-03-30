import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const PersonalInfoModal = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
    // checking for errors, and removing them from error object
    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = (e) => {
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
  };

  const checkErrors = () => {
    const {
      homeCountry,
      homeProvince,
      homePostalCode,
      businessCountry,
      businessProvince,
      businessPostalCode,
      phoneNumber,
      driverLicense,
    } = userInfo;
    const newErrors = {};

    // home validation
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

    // phone number
    if (phoneNumber && phoneNumber !== '' && !/^[0-9]{10}$/.test(phoneNumber))
      newErrors.phoneNumber = 'Phone number must be in ########## format';

    // drivers license
    if (
      driverLicense &&
      driverLicense !== '' &&
      !/^[A-Z][0-9]{4}-[0-9]{5}-[0-9]{5}$/.test(driverLicense)
    )
      newErrors.driverLicense = "Driver's license number must be in X####-#####-##### format";

    return newErrors;
  };

  const newDob = (dob) => {
    const timeIdx = dob.indexOf('T');
    const date = dob.substring(0, timeIdx);
    return date;
  };

  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Personal Information</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formFullName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userInfo[name]"
                defaultValue={props.data.fullname || ''}
                placeholder={props.data.fullname}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userInfo[username]"
                defaultValue={props.data.username || ''}
                placeholder={props.data.username}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="userInfo[email]"
                defaultValue={props.data.email || ''}
                placeholder={props.data.email}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                name="userInfo[dob]"
                defaultValue={props.data.dob}
                placeholder={newDob(props.data.dob)}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                onChange={(e) => setField('dob', e.target.value)}
              />
            </Form.Group>
            <br />
            <Row>
              <Form.Group as={Col} controlId="formNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[phoneNumber]"
                  placeholder={props.data.phoneNumber}
                  defaultValue={props.data.phoneNumber}
                  onChange={(e) => setField('phoneNumber', e.target.value)}
                  isInvalid={errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formYearsDriving">
                <Form.Label>Years Driving</Form.Label>
                <Form.Control
                  type="number"
                  name="userInfo[yearsDriving]"
                  placeholder={props.data.yearsDriving}
                  min="0"
                  defaultValue={props.data.yearsDriving}
                  onChange={(e) => setField('yearsDriving', e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />
            <Form.Group controlId="formLicenseNumber">
              <Form.Label>Drivers License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.data.driverLicense}
                name="userInfo[driverLicense]"
                defaultValue={props.data.driverLicense}
                onChange={(e) => setField('driverLicense', e.target.value)}
                isInvalid={errors.driverLicense}
              />
              <Form.Control.Feedback type="invalid">{errors.driverLicense}</Form.Control.Feedback>
            </Form.Group>
            <br />
            <Row>
              <Form.Group as={Col} controlId="formAddress">
                <Form.Label>Home Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[homeStreet]"
                  defaultValue={props.data.homeStreet}
                  placeholder={props.data.homeStreet}
                  onChange={(e) => setField('homeStreet', e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[homeCity]"
                  defaultValue={props.data.homeCity}
                  placeholder={props.data.homeCity}
                  onChange={(e) => setField('homeCity', e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[homeProvince]"
                  defaultValue={props.data.homeProvince}
                  placeholder={props.data.homeProvince}
                  onChange={(e) => setField('homeProvince', e.target.value)}
                  isInvalid={errors.homeProvince}
                />
                <Form.Control.Feedback type="invalid">{errors.homeProvince}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[homeCountry]"
                  defaultValue={props.data.homeCountry}
                  placeholder={props.data.homeCountry}
                  onChange={(e) => setField('homeCountry', e.target.value)}
                  isInvalid={errors.homeCountry}
                />
                <Form.Control.Feedback type="invalid">{errors.homeCountry}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={props.data.homePostalCode}
                  name="userInfo[homePostalCode]"
                  defaultValue={props.data.homePostalCode}
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
                <Form.Label>Business Street Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={props.data.businessStreet || '123 Fake St'}
                  name="userInfo[businessStreet]"
                  defaultValue={props.data.businessStreet || ''}
                  onChange={(e) => setField('businessStreet', e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[businessCity]"
                  defaultValue={props.data.businessCity || ''}
                  placeholder={props.data.businessCity || ''}
                  onChange={(e) => setField('businessCity', e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="userInfo[businessProvince]"
                  defaultValue={props.data.businessProvince || ''}
                  placeholder={props.data.businessProvince || ''}
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
                  name="userInfo[businessCountry]"
                  defaultValue={props.data.businessCountry || ''}
                  placeholder={props.data.businessCountry || ''}
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
                  placeholder={props.data.businessPostalCode || ''}
                  name="form[businessPostalCode]"
                  defaultValue={props.data.businessPostalCode || ''}
                  onChange={(e) => setField('businessPostalCode', e.target.value)}
                  isInvalid={errors.businessPostalCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.businessPostalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group xs={7} controlId="formDisabilities">
              <Form.Label>List any disabilities</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="userInfo[disabilities]"
                defaultValue={props.data.disabilities || ''}
                onChange={(e) => setField('disabilities', e.target.value)}
              />
              <Form.Text>If none, field can be left blank, otherwise please state all</Form.Text>
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

export default PersonalInfoModal;
