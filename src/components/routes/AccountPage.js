
import React, { useState, useEffect } from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import '../../styles/AccountPage.css';
import { Auth } from 'aws-amplify';

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [insuranceInfo, setInsuranceInfo] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState([]);
  const [bearerToken, setToken] = useState([]);
  // const token = 'Bearer ' + bearerToken;

  useEffect(() => {
    fetchUser().then((users) => setToken(users.signInUserSession.idToken.jwtToken));
  }, []);

  useEffect(() => {
    // fetchUser().then((users) => setToken(users.signInUserSession.idToken.jwtToken));
    // .then(() => {
    // const token = `Bearer ${bearerToken}`;
    fetch('http://localhost:8080/api/userInfo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${bearerToken}` },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.userInfo);
        setUserInfo([data.userInfo.user]);
        setInsuranceInfo([data.userInfo.policies[0]]);
        setVehicleInfo([data.userInfo.vehicles[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
    // });
  }, []);

  const fetchUser = async () => {
    return await Auth.currentAuthenticatedUser();
  };

  // const token = `Bearer ${bearerToken}`;
  // console.log(token);
  // const userTest = [
  //   {
  //     fullname: 'John Doe',
  //     username: 'johndoe12',
  //     email: 'john.doe@gmail.com',
  //     dob: '2001-11-08',
  //     disabilities: 'Something...',
  //     yearsDriving: '5',
  //     homeStreet: '123 Fake St',
  //     homeCity: 'Toronto',
  //     homeCountry: 'Canada',
  //     homeProvince: 'ON',
  //     homePostalCode: 'A1B2C3',
  //     businessStreet: '321 Fake St',
  //     businessCity: 'Edmonton',
  //     businessCountry: 'Canada',
  //     businessProvince: 'AB',
  //     businessPostalCode: 'C3B2A1',
  //     phoneNumber: '4161231234',
  //     driverLicense: 'A1234-12345-67890',
  //   },
  // ];

  // const insuranceTest = [
  //   {
  //     insurer: 'Life',
  //     insurerName: 'Mike J',
  //     Agent: 'Mary Jane',
  //     homeStreet: '432 Fake Ave',
  //     homeCity: 'Brampton',
  //     homeCountry: 'Canada',
  //     homeProvince: 'ON',
  //     homePostalCode: 'D4E5F6',
  //     businessStreet: '234 Some Dr',
  //     businessCity: 'Victoria',
  //     businessCountry: 'Canada',
  //     businessProvince: 'BC',
  //     businessPostalCode: 'L1M2A0',
  //     policyNumber: '1234567890',
  //   },
  // ];

  // const vehicleTest = [
  //   {
  //     licensePlateNo: 'ABCD123',
  //     registeredOwner: 'John Doe',
  //     actualOwner: 'John Doe',
  //     RegisteredOwnerStreet: '123 Fake St',
  //     RegisteredOwnerCity: 'Toronto',
  //     RegisteredOwnerCountry: 'Canada',
  //     RegisteredOwnerProvince: 'ON',
  //     RegisteredOwnerPostalCode: 'A1B2C3',
  //     ActualOwnerStreet: '123 Fake St',
  //     ActualOwnerCity: 'Toronto',
  //     ActualOwnerCountry: 'Canada',
  //     ActualOwnerProvince: 'ON',
  //     ActualOwnerPostalCode: 'A1B2C3',
  //     province: 'ON',
  //     make: 'Ford',
  //     year: '2015',
  //     model: 'Escape',
  //     type: 'SUV',
  //     identification: '12345678901234567',
  //   },
  // ];


  const obscureEmail = (email) => {
    const [name, domain] = email.split('@');
    const newEmail = `${name[0]}${new Array(name.length).join('*')}@${domain}`;
    return newEmail;
  };
  const obscureDriversLicense = (license) => {
    const [a, b, c] = license.split('-');
    const newLicense = `${a[0]}${new Array(a.length).join('*')}-${new Array(b.length + 1).join(
      '*'
    )}-${new Array(c.length + 1).join('*')}`;
    return newLicense;
  };
  const obscurePolicy = (policy) => {
    const lastPart = policy.slice(policy.length - 3);
    const newPolicy = `${new Array(policy.length - 2).join('*')}${lastPart}`;
    return newPolicy;
  };
  const obscureVIN = (identification) => {
    const lastPart = identification.slice(identification.length - 3);
    const newVIN = `${new Array(identification.length - 2).join('*')}${lastPart}`;
    return newVIN;
  };
  return (
    <div className="account-body">

      {userInfo.map((data) => {
        return (
          <div className="jumbotron" key={data.key}>
            <Container>
              <h2>{data.fullname}</h2>
            </Container>
          </div>
        );
      })}

      {userInfo.map((data) => {
        return (
          <Container key={data.key}>
            <Card body>
              <h5>Personal Information</h5>
              <hr />
              <Row xs={1} md={2}>
                <p>
                  <strong>Username: </strong>
                  {data.username}
                </p>
                <p>
                  <strong>Email: </strong>
                  {obscureEmail(data.email)}
                </p>
                <p>
                  <strong>Date of Birth: </strong>
                  {data.dob}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {data.phoneNumber}
                </p>
                <p>
                  <strong>Years of Driving: </strong>
                  {data.yearsDriving}
                </p>
                <p>
                  <strong>Drivers License: </strong>
                  {obscureDriversLicense(data.driverLicense)}
                </p>
                <p>
                  <strong>Home Address:</strong>
                  <br />
                  {data.homeStreet +
                    ', ' +
                    data.homeCity +
                    ', ' +
                    data.homeProvince +
                    ', ' +
                    data.homeCountry +
                    ', ' +
                    data.homePostalCode}
                </p>
                <p>
                  <strong>Business Address: </strong>
                  <br />

                  {data.businessStreet
                    ? data.businessStreet +
                      ', ' +
                      data.businessCity +
                      ', ' +
                      data.businessProvince +
                      ', ' +
                      data.businessCountry +
                      ', ' +
                      data.businessPostalCode
                    : 'Not Stated'}

                </p>
                <p>
                  <strong>Disabilities:</strong>
                  <br />

                  {data.disabilities ? data.disabilities : 'Not Stated'}

                </p>
              </Row>
            </Card>
          </Container>
        );
      })}

      {insuranceInfo.map((data) => {

        return (
          <Container key={data.key}>
            <Card body>
              <h5>Insurance Policy Information</h5>
              <hr />
              <Row xs={1} md={2}>
                <p>
                  <strong>Insurer: </strong>
                  {data.insurer}
                </p>
                <p>
                  <strong>Insurer Name: </strong>
                  {data.insurerName}
                </p>
                <p>
                  <strong>Agent: </strong>
                  {data.Agent}
                </p>
                <p>
                  <strong>Policy Number: </strong>
                  {obscurePolicy(data.policyNumber)}
                </p>
                <p>
                  <strong>Home Address:</strong>
                  <br />
                  {data.homeStreet +
                    ', ' +
                    data.homeCity +
                    ', ' +
                    data.homeProvince +
                    ', ' +
                    data.homeCountry +
                    ', ' +
                    data.homePostalCode}
                </p>
                <p>
                  <strong>Business Address: </strong>
                  <br />

                  {data.businessStreet
                    ? data.businessStreet +
                      ', ' +
                      data.businessCity +
                      ', ' +
                      data.businessProvince +
                      ', ' +
                      data.businessCountry +
                      ', ' +
                      data.businessPostalCode
                    : 'Not Stated'}

                </p>
              </Row>
            </Card>
          </Container>
        );
      })}

      {vehicleInfo.map((data) => {

        return (
          <Container key={data.key}>
            <Card body>
              <h5>Vehicle Information</h5>
              <hr />
              <Row xs={1} md={2}>
                <p>
                  <strong>Registered Owner{"'"}s Name: </strong>
                  {data.registeredOwner}
                </p>
                <p>
                  <strong>Registered Owner{"'"}s Address: </strong>
                  <br />

                  {data.registeredOwnerStreet +
                    ', ' +
                    data.registeredOwnerCity +
                    ', ' +
                    data.registeredOwnerProvince +
                    ', ' +
                    data.registeredOwnerCountry +
                    ', ' +
                    data.registeredOwnerPostalCode}

                </p>
              </Row>
              <hr />
              <Row xs={1} md={2}>
                <p>
                  <strong>Actual Owner{"'"}s Name: </strong>
                  {data.actualOwner}
                </p>
                <p>
                  <strong>Actual Owner{"'"}s Address: </strong>
                  <br />

                  {data.actualOwnerStreet +
                    ', ' +
                    data.actualOwnerCity +
                    ', ' +
                    data.actualOwnerProvince +
                    ', ' +
                    data.actualOwnerCountry +
                    ', ' +
                    data.actualOwnerPostalCode}

                </p>
              </Row>
              <hr />
              <Row xs={1} md={2}>
                <p>
                  <strong>License Plate Number: </strong>
                  {data.licensePlateNo}
                </p>
                <p>
                  <strong>Province: </strong>
                  {data.province}
                </p>
                <p>
                  <strong>Make: </strong>
                  {data.make}
                </p>
                <p>
                  <strong>Year: </strong>
                  {data.year}
                </p>
                <p>
                  <strong>Model: </strong>
                  {data.model}
                </p>
                <p>
                  <strong>Type: </strong>
                  {data.type}
                </p>
                <p>
                  <strong>Vehicle Identification Number: </strong>

                  {obscureVIN(data.VIN)}

                </p>
              </Row>
            </Card>
          </Container>
        );
      })}
      {/* <br /> */}
    </div>
  );
};

export default AccountPage;
