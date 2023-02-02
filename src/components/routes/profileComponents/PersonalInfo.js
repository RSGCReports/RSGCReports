import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const PersonalInfo = () => {
  const [fullName, setFullName] = useState([]);
  const [username, setUserName] = useState([]);
  const [email, setEmail] = useState([]);
  const [dob, setDob] = useState(new Date());

  useEffect(() => {
    fetchUser().then((users) => setFullName(users.attributes.name));
    fetchUser().then((users) => setUserName(users.username));
    fetchUser().then((users) => setEmail(users.attributes.email));
  });

  const fetchUser = async () => {
    return await Auth.currentUserInfo();
  };

  return (
    <div>
      <Container>
        <Form>
          <h3>Personal Information</h3>
          {/* <Row> */}
          <Form.Group as={Col} controlId="formFullName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={fullName} disabled />
          </Form.Group>
          <Form.Group as={Col} controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder={username} disabled />
          </Form.Group>
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder={email} disabled />
          </Form.Group>
          <Form.Group as={Col} controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </Form.Group>
          {/* </Row> */}
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="1234 Fake St" />
          </Form.Group>
          {/* <Row> */}
          <Form.Group as={Col} controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group as={Col} controlId="formProvince">
            <Form.Label>Province</Form.Label>
            <Form.Select defaultValue="Province">
              <option>List of provinces...</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formPostal">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" />
            <Form.Text>
              No dashes {'"'}-{'"'} and/or spaces
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="4161231234" />
            <Form.Text>
              Numbers only, no dashes {'"'}-{'"'}, spaces, and/or brackets {'"'}
              {'()'}
              {'"'}
            </Form.Text>
          </Form.Group>
          {/* </Row> */}
          {/* <Row> */}
          <Form.Group as={Col} controlId="formLicenseNumber">
            <Form.Label>Drivers License Number</Form.Label>
            <Form.Control type="text" placeholder="XXXXX-XXXXX-XXXXX" />
            <Form.Text>
              No dashes {'"'}-{'"'} and or spaces
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formYearsDriving">
            <Form.Label>Number of Years Driving</Form.Label>
            <Form.Control type="number" placeholder="0" min="0" />
          </Form.Group>
          <Form.Group as={Col} xs={7} controlId="formDisabilities">
            <Form.Label>List any disabilities</Form.Label>
            <Form.Control type="text" />
            <Form.Text>If none, field can be left blank, otherwise please state all</Form.Text>
          </Form.Group>
          {/* </Row> */}
          <br />
          <Button varient="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default PersonalInfo;
