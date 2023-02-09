import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const PersonalInfo = () => {
  const [form, setForm] = useState({});
  const [fullName_auth, setFullName] = useState([]);
  const [username_auth, setUserName] = useState([]);
  const [email_auth, setEmail] = useState([]);
  const [bearerToken, setToken] = useState([]);
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      username: username_auth,
      fullname: fullName_auth,
      email: email_auth,
      [field]: value,
    });
    // checking for errors, and removing them from error object
    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  useEffect(() => {
    fetchUser().then((users) => setFullName(users.attributes.name));
    fetchUser().then((users) => setUserName(users.username));
    fetchUser().then((users) => setEmail(users.attributes.email));
    fetchSession().then((users) => setToken(users.accessToken.jwtToken));
  });

  const fetchUser = async () => {
    return await Auth.currentAuthenticatedUser();
  };
  const fetchSession = async () => {
    return await Auth.currentSession();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = checkErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(form);
      const token = 'Bearer ' + bearerToken;
      console.log(token);
      // alert('Posted...');
      try {
        let res = await fetch('http://localhost:8080/api', {
          method: 'POST',
          body: JSON.stringify({
            username: form.username,
            fullname: form.fullname,
            email: form.email,
            dob: form.dob,
            disabilities: form.disabilities,
            yearsDriving: form.yearsDriving,
            homeAddress: form.homeAddress,
            businessAddress: form.businessAddress,
            phoneNumber: form.phoneNumber,
          }),
          headers: { 'Content-Type': 'application/json', Authorization: token },
        });
        if (res.status === 200) {
          setForm({});
          setErrors({});
          console.log('POST Success!!');
        } else {
          console.log('Some Error occurred...');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const checkErrors = () => {
    const { dob, yearsDriving, homeAddress, phoneNumber } = form;
    const newErrors = {};
    // const regex = RegExp(/^d{10}$);

    // date of birth check
    if (!dob || dob === '') newErrors.dob = 'Must provide date of birth';

    // home address check
    if (!homeAddress || homeAddress === '') newErrors.homeAddress = 'Must provide home address';

    // phone number check
    if (!phoneNumber || phoneNumber === '') newErrors.phoneNumber = 'Must provide phone number';

    // years driving check
    if (!yearsDriving || yearsDriving === '')
      newErrors.yearsDriving = 'Must provide how many years you drove';

    return newErrors;
  };

  return (
    <div>
      <Container>
        <Form>
          <h3>Personal Information</h3>
          <Form.Group controlId="formFullName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="form[name]"
              value={fullName_auth}
              placeholder={fullName_auth}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="form[username]"
              value={username_auth}
              placeholder={username_auth}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="form[email]"
              value={email_auth}
              placeholder={email_auth}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="form[dob]"
              onChange={(e) => setField('dob', e.target.value)}
              isInvalid={errors.dob}
            />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Home Address</Form.Label>
            <Form.Control
              type="text"
              name="form[homeAddress]"
              placeholder="1234 Fake St, City, Province, Canada, A1B2C3"
              onChange={(e) => setField('homeAddress', e.target.value)}
              isInvalid={errors.homeAddress}
            />
            <Form.Control.Feedback type="invalid">{errors.homeAddress}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Business Address Address</Form.Label>
            <Form.Control
              type="text"
              name="form[businessAddress]"
              defaultValue={''}
              placeholder="1234 Fake St"
              onChange={(e) => setField('businessAddress', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="form[phoneNumber]"
              placeholder="4161231234"
              onChange={(e) => setField('phoneNumber', e.target.value)}
              isInvalid={errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group controlId="formLicenseNumber">
            <Form.Label>Drivers License Number</Form.Label>
            <Form.Control type="text" placeholder="XXXXX-XXXXX-XXXXX" />
            <Form.Text>
              No dashes {'"'}-{'"'} and or spaces
            </Form.Text>
          </Form.Group> */}
          <Form.Group controlId="formYearsDriving">
            <Form.Label>Number of Years Driving</Form.Label>
            <Form.Control
              type="number"
              name="form[yearsDriving]"
              placeholder="0"
              min="0"
              onChange={(e) => setField('yearsDriving', e.target.value)}
              isInvalid={errors.yearsDriving}
            />
            <Form.Control.Feedback type="invalid">{errors.yearsDriving}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group xs={7} controlId="formDisabilities">
            <Form.Label>List any disabilities</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[disabilities]"
              defaultValue={''}
              onChange={(e) => setField('disabilities', e.target.value)}
            />
            <Form.Text>If none, field can be left blank, otherwise please state all</Form.Text>
          </Form.Group>
          <br />
          <Button varient="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default PersonalInfo;
