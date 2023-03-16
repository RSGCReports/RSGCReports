import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const Confirmation = ({ prevStep, setForm, setErrors, formValues }) => {
  const [fullName_auth, setFullName] = useState([]);
  const [username_auth, setUserName] = useState([]);
  const [email_auth, setEmail] = useState([]);
  const [bearerToken, setToken] = useState([]);

  useEffect(() => {
    fetchUser().then((users) => setFullName(users.attributes.name));
    fetchUser().then((users) => setUserName(users.username));
    fetchUser().then((users) => setEmail(users.attributes.email));
    fetchUser().then((users) => setToken(users.signInUserSession.idToken.jwtToken));
  }, []);

  const fetchUser = async () => {
    return await Auth.currentAuthenticatedUser();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues) {
      const completeProfile = {
        user: {
          fullname: fullName_auth,
          username: username_auth,
          email: email_auth,
          dob: formValues.dob,
          disabilities: formValues.disabilities,
          yearsDriving: formValues.yearsDriving,
          homeStreet: formValues.homeStreet,
          homeCity: formValues.homeCity,
          homeCountry: formValues.homeCountry,
          homeProvince: formValues.homeProvince,
          homePostalCode: formValues.homePostalCode,
          businessStreet: formValues.businessStreet,
          businessCity: formValues.businessCity,
          businessCountry: formValues.businessCountry,
          businessProvince: formValues.businessProvince,
          businessPostalCode: formValues.businessPostalCode,
          phoneNumber: formValues.phoneNumber,
          driverLicense: formValues.driverLicense,
        },
        insurancePolicy: {
          insurer: formValues.insurer,
          insurerName: formValues.insurerName,
          Agent: formValues.Agent,
          homeStreet: formValues.IPhomeStreet,
          homeCity: formValues.IPhomeCity,
          homeCountry: formValues.IPhomeCountry,
          homeProvince: formValues.IPhomeProvince,
          homePostalCode: formValues.IPhomePostalCode,
          businessStreet: formValues.IPbusinessStreet,
          businessCity: formValues.IPbusinessCity,
          businessCountry: formValues.IPbusinessCountry,
          businessProvince: formValues.IPbusinessProvince,
          businessPostalCode: formValues.IPbusinessPostalCode,
          policyNumber: formValues.policyNumber,
        },
        vehicleInfo: {
          licensePlateNo: formValues.licensePlateNo,
          registeredOwner: formValues.registeredOwner,
          actualOwner: formValues.actualOwner,
          RegisteredOwnerStreet: formValues.regStreet,
          RegisteredOwnerCity: formValues.regCity,
          RegisteredOwnerCountry: formValues.regCountry,
          RegisteredOwnerProvince: formValues.regProvince,
          RegisteredOwnerPostalCode: formValues.regPostalCode,
          ActualOwnerStreet: formValues.actStreet,
          ActualOwnerCity: formValues.actCity,
          ActualOwnerCountry: formValues.actCountry,
          ActualOwnerProvince: formValues.actProvince,
          ActualOwnerPostalCode: formValues.actPostalCode,
          province: formValues.province,
          make: formValues.make,
          year: formValues.year,
          model: formValues.model,
          type: formValues.type,
          VIN: formValues.VIN,
        },
      };
      console.log(completeProfile);
      const token = 'Bearer ' + bearerToken;
      try {
        let res = await fetch('http://localhost:8080/api/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify({
            completeProfile,
          }),
        });

        if (res.status >= 200 && res.status <= 299) {
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

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Container style={{ padding: '15px' }}>
      <h2>CONFIRM</h2>
      <h6>Please confirm all of the fields below before submitting:</h6>
      <h3>Personal Information</h3>
      <div>
        <p>
          <strong>Full Name: </strong>
          {fullName_auth}
        </p>
        <p>
          <strong>Username: </strong>
          {username_auth}
        </p>
        <p>
          <strong>Email: </strong>
          {email_auth}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {formValues.dob}
        </p>
        <p>
          <strong>Home Address: </strong>
          {formValues.homeStreet +
            ', ' +
            formValues.homeCity +
            ', ' +
            formValues.homeProvince +
            ', ' +
            formValues.homeCountry +
            ', ' +
            formValues.homePostalCode}
        </p>
        <p>
          <strong>Business Address: </strong>
          {formValues.businessStreet
            ? formValues.businessStreet +
              ', ' +
              formValues.businessCity +
              ', ' +
              formValues.businessProvince +
              ', ' +
              formValues.businessCountry +
              ', ' +
              formValues.businessPostalCode
            : 'Not Stated'}
        </p>
        <p>
          <strong>Phone Number: </strong>
          {formValues.phoneNumber}
        </p>
        <p>
          <strong>Years of Driving: </strong>
          {formValues.yearsDriving}
        </p>
        <p>
          <strong>Drivers License: </strong>
          {formValues.driverLicense}
        </p>
        <p>
          <strong>Disabilities: </strong>
          {formValues.disabilities ? formValues.disabilities : 'Not Stated'}
        </p>
      </div>
      <br />

      <h3>Insurance Policy</h3>
      <div>
        <p>
          <strong>Insurer: </strong>
          {formValues.insurer}
        </p>
        <p>
          <strong>Insurer Name: </strong>
          {formValues.insurerName}
        </p>
        <p>
          <strong>Agent: </strong>
          {formValues.Agent}
        </p>
        <p>
          <strong>Home Address: </strong>
          {formValues.IPhomeStreet +
            ', ' +
            formValues.IPhomeCity +
            ', ' +
            formValues.IPhomeProvince +
            ', ' +
            formValues.IPhomeCountry +
            ', ' +
            formValues.IPhomePostalCode}
        </p>
        <p>
          <strong>Business Address: </strong>
          {formValues.IPbusinessStreet
            ? formValues.IPbusinessStreet +
              ', ' +
              formValues.IPbusinessCity +
              ', ' +
              formValues.IPbusinessProvince +
              ', ' +
              formValues.IPbusinessCountry +
              ', ' +
              formValues.IPbusinessPostalCode
            : 'Not Stated'}
        </p>
        <p>
          <strong>Policy Number: </strong>
          {formValues.policyNumber}
        </p>
      </div>
      <br />

      <h3>Vehicle Information</h3>
      <div>
        <p>
          <strong>Registered Owner{"'"}s Name: </strong>
          {formValues.registeredOwner}
        </p>
        <p>
          <strong>Registered Owner{"'"}s Address: </strong>
          {formValues.regStreet +
            ', ' +
            formValues.regCity +
            ', ' +
            formValues.regProvince +
            ', ' +
            formValues.regCountry +
            ', ' +
            formValues.regPostalCode}
        </p>
        <p>
          <strong>Actual Owner{"'"}s Name: </strong>
          {formValues.actualOwner}
        </p>
        <p>
          <strong>Actual Owner{"'"}s Address: </strong>
          {formValues.actStreet +
            ', ' +
            formValues.actCity +
            ', ' +
            formValues.actProvince +
            ', ' +
            formValues.actCountry +
            ', ' +
            formValues.actPostalCode}
        </p>
        <p>
          <strong>License Plate Number: </strong>
          {formValues.licensePlateNo}
        </p>
        <p>
          <strong>Province: </strong>
          {formValues.province}
        </p>
        <p>
          <strong>Make: </strong>
          {formValues.make}
        </p>
        <p>
          <strong>Year: </strong>
          {formValues.year}
        </p>
        <p>
          <strong>Model: </strong>
          {formValues.model}
        </p>
        <p>
          <strong>Type: </strong>
          {formValues.type}
        </p>
        <p>
          <strong>Vehicle Identification Number: </strong>
          {formValues.VIN}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="secondary" onClick={goBack}>
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Confirm and Save
        </Button>
      </div>
    </Container>
  );
};

export default Confirmation;
