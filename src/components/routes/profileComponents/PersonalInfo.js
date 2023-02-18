import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const PersonalInfo = ({ nextStep, setField, setErrors, errors, formValues }) => {
  const [fullName_auth, setFullName] = useState([]);
  const [username_auth, setUserName] = useState([]);
  const [email_auth, setEmail] = useState([]);

  useEffect(() => {
    fetchUser().then((users) => setFullName(users.attributes.name));
    fetchUser().then((users) => setUserName(users.username));
    fetchUser().then((users) => setEmail(users.attributes.email));
  });

  const fetchUser = async () => {
    return await Auth.currentUserInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = checkErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      nextStep();
    }
  };

  const checkErrors = () => {
    const {
      dob,
      yearsDriving,
      homeStreet,
      homeCity,
      homeCountry,
      homeProvince,
      homePostalCode,
      phoneNumber,
      driverLicense,
    } = formValues;
    const newErrors = {};
    // const regex = RegExp(/^d{10}$);

    // date of birth check
    if (!dob || dob === '') newErrors.dob = 'Must provide date of birth';

    // home address check
    if (!homeStreet || homeStreet === '') newErrors.homeStreet = 'Must provide home street address';
    if (!homeCity || homeCity === '') newErrors.homeCity = 'Must provide city';
    if (!homeCountry || homeCountry === '') newErrors.homeCountry = 'Must provide country';
    else if (homeCountry !== 'Canada') newErrors.homeCountry = 'Must be Canada';
    if (!homeProvince || homeProvince === '') newErrors.homeProvince = 'Must provide province';
    else if (
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        homeProvince
      )
    )
      newErrors.homeProvince = 'Must be a Canadian province';
    if (!homePostalCode || homePostalCode === '')
      newErrors.homePostalCode = 'Must provide postal code';
    else if (!/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(homePostalCode))
      newErrors.homePostalCode = 'Postal code must be in X#X#X# format';
    // phone number check
    if (!phoneNumber || phoneNumber === '') newErrors.phoneNumber = 'Must provide phone number';
    else if (!/^[0-9]{10}$/.test(phoneNumber))
      newErrors.phoneNumber = 'Phone number must be in ########## format';
    // years driving check
    if (!yearsDriving || yearsDriving === '')
      newErrors.yearsDriving = 'Must provide how many years you drove';

    // drivers license check
    if (!driverLicense || driverLicense === '')
      newErrors.driverLicense = "Must provide driver's license number";
    if (!/^[A-Z][0-9]{4}-[0-9]{5}-[0-9]{5}$/.test(driverLicense))
      newErrors.driverLicense = "Driver's license number must in X####-#####-##### format";
    return newErrors;
  };

  return (
    <div>
      <Container style={{ padding: '15px' }}>
        <Form>
          <h3>Personal Information</h3>
          <Form.Group controlId="formFullName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="form[name]"
              defaultValue={fullName_auth || ''}
              placeholder={fullName_auth}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="form[username]"
              defaultValue={username_auth || ''}
              placeholder={username_auth}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="form[email]"
              defaultValue={email_auth || ''}
              placeholder={email_auth}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="form[dob]"
              defaultValue={formValues.dob}
              onChange={(e) => setField('dob', e.target.value)}
              isInvalid={errors.dob}
            />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Form.Group>
          <br />
          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Home Street Address</Form.Label>
              <Form.Control
                type="text"
                name="form[homeStreet]"
                defaultValue={formValues.homeStreet}
                placeholder="1234 Fake St"
                onChange={(e) => setField('homeStreet', e.target.value)}
                isInvalid={errors.homeStreet}
              />
              <Form.Control.Feedback type="invalid">{errors.homeStreet}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="form[homeCity]"
                defaultValue={formValues.homeCity}
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
                name="form[homeProvince]"
                defaultValue={formValues.homeProvince}
                onChange={(e) => setField('homeProvince', e.target.value)}
                isInvalid={errors.homeProvince}
              />
              <Form.Control.Feedback type="invalid">{errors.homeProvince}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="form[homeCountry]"
                defaultValue={formValues.homeCountry}
                onChange={(e) => setField('homeCountry', e.target.value)}
                isInvalid={errors.homeCountry}
              />
              <Form.Control.Feedback type="invalid">{errors.homeCountry}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="A1B2C3"
                name="form[homePostalCode]"
                defaultValue={formValues.homePostalCode}
                onChange={(e) => setField('homePostalCode', e.target.value)}
                isInvalid={errors.homePostalCode}
              />
              <Form.Control.Feedback type="invalid">{errors.homePostalCode}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Business Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 Fake St"
                name="form[businessStreet]"
                defaultValue={formValues.businessStreet || ''}
                onChange={(e) =>
                  e.target.value
                    ? setField('businessStreet', e.target.value)
                    : setField('businessStreet', '')
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="form[businessCity]"
                defaultValue={formValues.businessCity || ''}
                onChange={(e) => setField('businessCity', e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formProvince">
              <Form.Label>Province/State</Form.Label>
              <Form.Control
                type="text"
                name="form[businessProvince]"
                defaultValue={formValues.businessProvince || ''}
                onChange={(e) => setField('businessProvince', e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="form[businessCountry]"
                defaultValue={formValues.businessCountry || ''}
                onChange={(e) => setField('businessCountry', e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="A1B2C3"
                name="form[businessPostalCode]"
                defaultValue={formValues.businessPostalCode || ''}
                onChange={(e) => setField('businessPostalCode', e.target.value)}
              />
            </Form.Group>
          </Row>
          <br />
          <Row>
            <Form.Group as={Col} controlId="formNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="form[phoneNumber]"
                placeholder="4161231234"
                defaultValue={formValues.phoneNumber}
                onChange={(e) => setField('phoneNumber', e.target.value)}
                isInvalid={errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formYearsDriving">
              <Form.Label>Years Driving</Form.Label>
              <Form.Control
                type="number"
                name="form[yearsDriving]"
                placeholder="0"
                min="0"
                defaultValue={formValues.yearsDriving}
                onChange={(e) => setField('yearsDriving', e.target.value)}
                isInvalid={errors.yearsDriving}
              />
              <Form.Control.Feedback type="invalid">{errors.yearsDriving}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Form.Group controlId="formLicenseNumber">
            <Form.Label>Drivers License Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="XXXXX-XXXXX-XXXXX"
              name="form[driverLicense]"
              defaultValue={formValues.driverLicense}
              onChange={(e) => setField('driverLicense', e.target.value)}
              isInvalid={errors.driverLicense}
            />
            <Form.Control.Feedback type="invalid">{errors.driverLicense}</Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group xs={7} controlId="formDisabilities">
            <Form.Label>List any disabilities</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[disabilities]"
              defaultValue={formValues.disabilities || ''}
              onChange={(e) => setField('disabilities', e.target.value)}
            />
            <Form.Text>If none, field can be left blank, otherwise please state all</Form.Text>
          </Form.Group>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Continue to Insurance Policy Information
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PersonalInfo;
