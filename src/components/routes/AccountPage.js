import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Button } from 'react-bootstrap';
import '../../styles/AccountPage.css';
import { Auth } from 'aws-amplify';
import PersonalInfoModal from './accountComponents/PersonalInfoModal';
import PolicyInfoModal from './accountComponents/PolicyInfoModal';
import VehicleInfoModal from './accountComponents/VehicleInfoModal';
import process from 'process';

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [insuranceInfo, setInsuranceInfo] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState([]);
  const [bearerToken, setToken] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);
  const [showEditPolicyModal, setShowEditPolicyModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showEditVehicleModal, setShowEditVehicleModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setToken(user.signInUserSession.idToken.jwtToken);

      fetch(`${process.env.REACT_APP_API_URL}/api/userInfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${bearerToken}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.userInfo);
          setUserInfo(data.userInfo.user);
          console.log('my state', userInfo);
          setInsuranceInfo(data.userInfo.policies);
          setVehicleInfo(data.userInfo.vehicles);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUser().catch(console.error);
  }, [bearerToken, fetch, setUserInfo, setInsuranceInfo, setVehicleInfo, setLoading]);

  const newDob = (dob) => {
    const timeIdx = dob.indexOf('T');
    const date = dob.substring(0, timeIdx);
    return date;
  };
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
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="account-body">
          <div className="jumbotron">
            <Container>
              <h2>{userInfo.fullname}</h2>
            </Container>
          </div>
          <Container>
            <Card body>
              <Button
                style={{ float: 'right' }}
                variant="outline-secondary"
                onClick={() => setShowInfoModal(true)}
              >
                Edit
              </Button>
              <h5>Personal Information</h5>
              <hr />
              <Row xs={1} md={2}>
                <p>
                  <strong>Username: </strong>
                  {userInfo.username}
                </p>
                <p>
                  <strong>Email: </strong>
                  {obscureEmail(userInfo.email)}
                </p>
                <p>
                  <strong>Date of Birth: </strong>
                  {newDob(userInfo.dob)}
                </p>
                <p>
                  <strong>Phone Number: </strong>
                  {userInfo.phoneNumber}
                </p>
                <p>
                  <strong>Years of Driving: </strong>
                  {userInfo.yearsDriving}
                </p>
                <p>
                  <strong>Drivers License: </strong>
                  {obscureDriversLicense(userInfo.driverLicense)}
                </p>
                <p>
                  <strong>Home Address:</strong>
                  <br />
                  {userInfo.homeStreet +
                    ', ' +
                    userInfo.homeCity +
                    ', ' +
                    userInfo.homeProvince +
                    ', ' +
                    userInfo.homeCountry +
                    ', ' +
                    userInfo.homePostalCode}
                </p>
                <p>
                  <strong>Business Address: </strong>
                  <br />

                  {userInfo.businessStreet
                    ? userInfo.businessStreet +
                      ', ' +
                      userInfo.businessCity +
                      ', ' +
                      userInfo.businessProvince +
                      ', ' +
                      userInfo.businessCountry +
                      ', ' +
                      userInfo.businessPostalCode
                    : 'Not Stated'}
                </p>
                <p>
                  <strong>Disabilities:</strong>
                  <br />

                  {userInfo.disabilities ? userInfo.disabilities : 'Not Stated'}
                </p>
              </Row>
              <PersonalInfoModal
                show={showInfoModal}
                onHide={() => setShowInfoModal(false)}
                data={userInfo}
              />
            </Card>
          </Container>

          {insuranceInfo.map((data) => {
            return (
              <Container key={data.key}>
                <Card body>
                  <Button
                    style={{ float: 'right' }}
                    variant="outline-primary"
                    onClick={() => setShowAddPolicyModal(true)}
                  >
                    Add
                  </Button>
                  <Button
                    style={{ float: 'right' }}
                    variant="outline-secondary"
                    onClick={() => setShowEditPolicyModal(true)}
                  >
                    Edit
                  </Button>
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
                  <PolicyInfoModal
                    show={showAddPolicyModal}
                    onHide={() => setShowAddPolicyModal(false)}
                    adding={true}
                  />
                  <PolicyInfoModal
                    show={showEditPolicyModal}
                    onHide={() => setShowEditPolicyModal(false)}
                    data={data}
                    adding={false}
                  />
                </Card>
              </Container>
            );
          })}

          {vehicleInfo.map((data) => {
            return (
              <Container key={data.key}>
                <Card body>
                  <Button
                    style={{ float: 'right' }}
                    variant="outline-primary"
                    onClick={() => setShowAddVehicleModal(true)}
                  >
                    Add
                  </Button>
                  <Button
                    style={{ float: 'right' }}
                    variant="outline-secondary"
                    onClick={() => setShowEditVehicleModal(true)}
                  >
                    Edit
                  </Button>
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
                  <VehicleInfoModal
                    show={showAddVehicleModal}
                    onHide={() => setShowAddVehicleModal(false)}
                    adding={true}
                  />
                  <VehicleInfoModal
                    show={showEditVehicleModal}
                    onHide={() => setShowEditVehicleModal(false)}
                    data={data}
                    adding={false}
                  />
                </Card>
              </Container>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AccountPage;
