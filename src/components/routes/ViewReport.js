import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//TODO: make edit button functional
//TODO: add id as parameter and use it in your get request to fetch the report
const ViewReport = () => {
  // TODO: Delete the mocking when get report route is made
  let report = {
    reportId: 46,
    dayTime: new Date('2000-04-23'),
    dayLight: 'dark',
    roadCondition: 'Pretty slippery and icy',
    weatherCondition: 'Light snowing',
    location: 'Steeles and Finch Ave',
    accidentDescription: 'The other car T-boned my car while it drove through a red light.',
    comment: 'I had two children in the car. This is outrageous!',
    flag: null,
    adminComments: null,
    speed: 60,
    direction: 'South',
    purposeForUsage: 'Personal',
    damageDescription: '$4000 cost to replace right doors',
    EstimateOfDamage: 'major',
    AdminId: null,
    PersonInjured: [
      {
        id: 48,
        name: 'Alice Smith',
        phone: '459-865-4256',
        street: '221 Victoria Rd.',
        city: 'Toronto',
        country: 'CA',
        province: 'ON',
        postalCode: 'J1D 0I3',
        dob: new Date('2013-04-23'),
        hospital: "St. Henry Children's Hopsital",
        natureOfInjuries: 'Broken right arm',
        reportId: 48,
      },
    ],
    PoliceInvestigation: [{ id: 48, policeReportNo: '12565', reportId: 48 }],
    Witness: [
      {
        id: 48,
        name: 'Amber Ellis',
        phone: '458-562-5897',
        street: '223 Donda St.',
        city: 'Toronto',
        country: 'CA',
        province: 'ON',
        postalCode: 'X2A 5U9',
        reportId: 48,
      },
    ],
    Evidence: [{ id: 1, name: 'photo1', data: 125, reportId: 1 }],
    Insurance: [
      {
        policyId: 48,
        insurer: 'Sunlife Inc.',
        insurerName: 'John Smith',
        Agent: 'Alice Reiner',
        homeStreet: '221 Victoria',
        homeCity: 'Toronto',
        homeCountry: 'ON',
        homeProvince: 'CA',
        homePostalCode: 'J1D 0I3',
        businessStreet: '58 York',
        businessCity: 'Toronto',
        businessCountry: 'ON',
        businessProvince: 'CA',
        businessPostalCode: 'H2E 1G4',
        policyNumber: '465461656',
      },
    ],
    PersonalInfo: [
      {
        username: 'user1',
        fullname: 'John Smith',
        email: 'js@gmail.com',
        dob: new Date('2000-04-23'),
        disabilities: 'lost of hearing on left side',
        yearsDriving: 10,
        homeStreet: '221 Victoria',
        homeCity: 'Toronto',
        homeCountry: 'CA',
        homeProvince: 'ON',
        homePostalCode: 'J1D 0I3',
        businessStreet: '58 York',
        businessCity: 'Toronto',
        businessCountry: 'CA',
        businessProvince: 'ON',
        businessPostalCode: 'H2E 1G4',
        phoneNumber: '121-315-6625',
        driverLicense: 'F2548956525',
        isAdmin: false,
      },
    ],
    VehicleInfo: [
      {
        licensePlateNo: 'DHHE-875',
        registeredOwner: 'John Smith',
        actualOwner: 'John Smith',
        registeredOwnerStreet: '221 Victoria',
        registeredOwnerCity: 'Toronto',
        registeredOwnerCountry: 'ON',
        registeredOwnerProvince: 'CA',
        registeredOwnerPostalCode: 'J1D 0I3',
        actualOwnerStreet: '221 Victoria',
        actualOwnerCity: 'Toronto',
        actualOwnerCountry: 'ON',
        actualOwnerProvince: 'CA',
        actualOwnerPostalCode: 'J1D 0I3',
        province: 'ON',
        make: 'HONDA',
        year: 2015,
        model: 'Starlight',
        type: 'Personal',
        VIN: '8G5HJUS68J5260025',
      },
    ],
    PropertyDamage: [
      {
        id: 48,
        nameOwner: 'Eric Wong',
        phoneOwner: '526-859-5255',
        ownerStreet: '25 Warrent St.',
        ownerCity: 'Toronto',
        ownerCountry: 'CA',
        ownerProvince: 'ON',
        ownerPostalCode: 'H1N8I6',
        licenseNumberOwner: 'UCCR-257',
        ownerProvIssue: 'ON',
        yearOfVehicle: 2013,
        nameInsurer: 'West Sun Foundation',
        policyNumber: '125486595',
        nameDriver: 'Eric Wong',
        phoneDriver: '526-859-5255',
        driverStreet: 'Warrent St.',
        driverCity: 'Toronto',
        driverCountry: 'CA',
        driverProvince: 'ON',
        driverPostalCode: 'H1N8I6',
        driverLicenseNumber: 'UCCR-257',
        driverProvIssue: 'ON',
        reportId: 48,
      },
    ],
  };

  //TODO: fetch API when get report route is made; see ReportGeenral
  /*      const user = await Auth.currentAuthenticatedUser();
      setToken(user.signInUserSession.idToken.jwtToken);

      fetch('http://localhost:8080/api/userInfo', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${bearerToken}` },
      }).then ((result)=>{result=mockReport;})
   */

  return (
    <div>
      <Container style={{ padding: '15px' }}>
        <Form>
          <h3>
            <b>General Information</b>
          </h3>
          <Row>
            <Form.Group as={Col} controlId="formDate">
              <Form.Label>Date And Time</Form.Label>
              <Form.Control type="text" name="form[date]" value={report.dayTime} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formDayLight">
              <Form.Label>Light Conditions</Form.Label>
              <Form.Control type="text" name="form[dayLight]" value={report.dayLight} />
            </Form.Group>
            <Form.Group as={Col} controlId="formRoadConditions">
              <Form.Label>Road Conditions</Form.Label>
              <Form.Control type="text" name="form[roadconditions]" value={report.roadCondition} />
            </Form.Group>
            <Form.Group as={Col} controlId="formWeatherConditions">
              <Form.Label>Weather Conditions</Form.Label>
              <Form.Control
                type="text"
                name="form[weatherconditions]"
                value={report.weatherCondition}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="form[location]" value={report.location} />
          </Form.Group>
          <Form.Group controlId="formAccidentDescription">
            <Form.Label>Accident Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[accidentcondtions]"
              value={report.accidentDescription}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="formSpeed">
              <Form.Label>Speed</Form.Label>
              <Form.Control type="number" name="form[speed]" value={report.speed} />
            </Form.Group>
            <Form.Group as={Col} controlId="formDirection">
              <Form.Label>Direction</Form.Label>
              <Form.Control type="text" name="form[direction]" value={report.direction} />
            </Form.Group>
          </Row>
          <Form.Group controlId="formPurposeForUsage">
            <Form.Label>Purpose for Usage</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="form[purposeforusage]"
              value={report.purposeForUsage}
            />
          </Form.Group>
          <Form.Label>Damage Description</Form.Label>
          <Form.Group controlId="formSeverity">
            <Form.Control type="text" name="form[severity]" value={report.EstimateOfDamage} />
          </Form.Group>
          <Form.Label>Damage Description</Form.Label>
          <Form.Group controlId="formDamageDescription">
            <Form.Control
              as="textarea"
              type="text"
              name="form[damagecondtions]"
              value={report.damageDescription}
            />
          </Form.Group>
          <hr />

          <Form.Group controlId="formPersonInjured">
            <h3>
              <b>Persons Injured</b>
            </h3>
            {report.PersonInjured.map((personInjured, idx) => (
              <div key={idx}>
                <Row>
                  <Form.Group as={Col} controlId="formPersonInjuredName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="personInjuredName" value={personInjured.name} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredDate">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" name="personInjuredDate" value={personInjured.dob} />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formPersonInjuredAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="personInjuredAddress"
                      value={personInjured.street}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="personInjuredCity" value={personInjured.city} />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formPersonInjuredProvince">
                    <Form.Label>Province/State</Form.Label>
                    <Form.Control
                      type="text"
                      name="personInjuredProvince"
                      value={personInjured.province}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="personInjuredCountry"
                      value={personInjured.country}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="personInjuredPostalCode"
                      value={personInjured.postalCode}
                    />
                  </Form.Group>
                </Row>
                <Form.Group controlId="formPersonInjuredHospital">
                  <Form.Label>Hospital</Form.Label>
                  <Form.Control
                    type="text"
                    name="personInjuredHospital"
                    value={personInjured.hospital}
                  />
                </Form.Group>
                <Form.Group controlId="formPersonInjuredNatureOfInjuries">
                  <Form.Label>Nature of Injuries</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    name="personInjuredNatureOfInjuries"
                    value={personInjured.natureOfInjuries}
                  />
                </Form.Group>
                <br />
              </div>
            ))}
          </Form.Group>

          <hr />
          <Form.Group controlId="formWitness">
            <h3>
              <b>Witnesses</b>
            </h3>
            {report.Witness.map((witness, idx) => (
              <div key={idx}>
                <Row>
                  <Form.Group as={Col} controlId="formWitnessName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="witnessName" value={witness.name} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formWitnessNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="witnessPhoneNumber" value={witness.phone} />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formPersonInjuredAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="personInjuredAddress" value={witness.street} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="personInjuredCity" value={witness.city} />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formPersonInjuredProvince">
                    <Form.Label>Province/State</Form.Label>
                    <Form.Control
                      type="text"
                      name="personInjuredProvince"
                      value={witness.province}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="personInjuredCountry" value={witness.country} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formPersonInjuredPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="personInjuredPostalCode"
                      value={witness.postalCode}
                    />
                  </Form.Group>
                </Row>
                <br />
              </div>
            ))}
          </Form.Group>

          <Form.Group controlId="formEvidence">
            <hr />
            <h3>
              <b>Evidence</b>
            </h3>
            {report.Evidence.map((evidence, idx) => (
              <div key={idx}>
                <Form.Group controlId="formEvidenceName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="evidenceName" value={evidence.name} />
                </Form.Group>
                <br />
              </div>
            ))}
            <hr />
            <h3>
              <b>Insurance Information</b>
            </h3>
            <Form.Group controlId="formInsuranceInsurer">
              <Form.Label>Insurance Company</Form.Label>
              <Form.Control
                type="text"
                name="insuranceInsurer"
                value={report.Insurance[0].insurer}
              />
            </Form.Group>
            <Form.Group controlId="formInsuranceInsurerName">
              <Form.Label>Insured Person</Form.Label>
              <Form.Control
                type="text"
                name="insuranceInsurerName"
                value={report.Insurance[0].insurerName}
              />
            </Form.Group>
            <Form.Group controlId="formInsuranceAgent">
              <Form.Label>Insurance Company</Form.Label>
              <Form.Control type="text" name="insuranceAgent" value={report.Insurance[0].Agent} />
            </Form.Group>
            <Form.Group controlId="formInsurancePolicyNumber">
              <Form.Label>Policy Number</Form.Label>
              <Form.Control
                type="text"
                name="insurancePolicyNumber"
                value={report.Insurance[0].policyNumber}
              />
            </Form.Group>
            <br />
            <h6>Home Address</h6>
            <Row>
              <Form.Group as={Col} controlId="formInsuranceAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceAddress"
                  value={report.Insurance[0].homeStreet}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="forminsuranceCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceCity"
                  value={report.Insurance[0].homeCity}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formInsuranceProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceProvince"
                  value={report.Insurance[0].homeProvince}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formInsuranceCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceCountry"
                  value={report.Insurance[0].homeCountry}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formInsurancePostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="insurancePostalCode"
                  value={report.Insurance[0].homePostalCode}
                />
              </Form.Group>
            </Row>
            <br />
            <h6>Business Address</h6>
            <Row>
              <Form.Group as={Col} controlId="formInsuranceBizAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceBizAddress"
                  value={report.Insurance[0].businessStreet || ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="forminsuranceBizCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceBizCity"
                  value={report.Insurance[0].businessCity || ''}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formInsuranceBizProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceBizProvince"
                  value={report.Insurance[0].businessProvince || ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formInsuranceBizCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceBizCountry"
                  value={report.Insurance[0].businessCountry || ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formInsuranceBizPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceBizPostalCode"
                  value={report.Insurance[0].businessPostalCode || ''}
                />
              </Form.Group>
            </Row>
            <hr />
            <h3>
              <b>Personal Information</b>
            </h3>
            <Form.Group controlId="formPersonalInfoFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="personalInfoFullname"
                value={report.PersonalInfo[0].fullname}
              />
            </Form.Group>

            <Form.Group controlId="formPersonalInfoEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="personalInfoEmail"
                value={report.PersonalInfo[0].email}
              />
            </Form.Group>
            <Form.Group controlId="formPersonalInfoDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="personalInfoDob" value={report.PersonalInfo[0].dob} />
            </Form.Group>
            <br />
            <h6>Home Address</h6>
            <Row>
              <Form.Group as={Col} controlId="formPersonalInfoHomeAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfohomeStreet"
                  value={report.PersonalInfo[0].homeStreet}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoHomeCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoHomeCity"
                  value={report.PersonalInfo[0].homeCity}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formPersonalInfoHomeProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfohomeProvince"
                  value={report.PersonalInfo[0].homeProvince}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoHomeCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoHomeCountry"
                  value={report.PersonalInfo[0].homeCountry}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoHomePostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfohomePostalCode"
                  value={report.PersonalInfo[0].homePostalCode}
                />
              </Form.Group>
            </Row>
            <br />
            <h6>Business Address</h6>
            <Row>
              <Form.Group as={Col} controlId="formPersonalInfoBizAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoBizStreet"
                  value={report.PersonalInfo[0].businessStreet || ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoBizCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoBizCity"
                  value={report.PersonalInfo[0].businessCity || ''}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formPersonalInfoBizProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoBizProvince"
                  value={report.PersonalInfo[0].businessProvince || ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoBizCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoBizCountry"
                  value={report.PersonalInfo[0].businessCountry || ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoBizPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoBizPostalCode"
                  value={report.PersonalInfo[0].businessPostalCode || ''}
                />
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group as={Col} controlId="formPersonalInfoNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="personalInfoPhoneNumber"
                  value={report.PersonalInfo[0].phoneNumber}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formPersonalInfoYearsDriving">
                <Form.Label>Years Driving</Form.Label>
                <Form.Control
                  type="number"
                  name="personalInfoYearsDriving"
                  value={report.PersonalInfo[0].yearsDriving}
                />
              </Form.Group>
            </Row>
            <br />
            <Form.Group controlId="formPersonalInfoYearLicenseNumber">
              <Form.Label>Drivers License Number</Form.Label>
              <Form.Control
                type="text"
                name="personalInfodriverLicense"
                value={report.PersonalInfo[0].driverLicense}
              />
            </Form.Group>
            <br />
            <Form.Group xs={7} controlId="formPersonalInfoDisabilities">
              <Form.Label>List any disabilities</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="personalInfodisabilities"
                value={report.PersonalInfo[0].disabilities || ''}
              />
            </Form.Group>
            <br />
            <div>
              <h3>Vehicle Information</h3>
              <br />
              <h6>Registered Owner{"'"}s Information</h6>
              <Form.Group controlId="formVehicleOwner">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleRegOwner"
                  value={report.VehicleInfo[0].registeredOwner}
                />
              </Form.Group>
              <br />
              <Row>
                <Form.Group as={Col} controlId="formVehicleAddress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleRegStreet"
                    value={report.VehicleInfo[0].registeredOwnerStreet}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleRegCity"
                    value={report.VehicleInfo[0].registeredOwnerCity}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formVehicleProvince">
                  <Form.Label>Province/State</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleRegProvince"
                    value={report.VehicleInfo[0].registeredOwnerProvince}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleRegCountry"
                    value={report.VehicleInfo[0].registeredOwnerCountry}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehiclePostal">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleRegPostalCode"
                    value={report.VehicleInfo[0].registeredOwnerPostalCode}
                  />
                </Form.Group>
              </Row>
              <br />
              <h6>Actual Owner{"'"}s Information</h6>
              <Form.Group as={Col} controlId="formVehicleActOwner">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleActualOwner"
                  value={report.VehicleInfo[0].actualOwner}
                />
              </Form.Group>
              <Row>
                <Form.Group as={Col} controlId="formVehicleActAddress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleregisteedActStreet"
                    value={report.VehicleInfo[0].actualOwnerStreet}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleActCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleActCity"
                    value={report.VehicleInfo[0].actualOwnerCity}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formVehicleActProvince">
                  <Form.Label>Province/State</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleActProvince"
                    value={report.VehicleInfo[0].actualOwnerProvince}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleActCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleActCountry"
                    value={report.VehicleInfo[0].actualOwnerCountry}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleActPostal">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleActPostalCode"
                    value={report.VehicleInfo[0].actualOwnerPostalCode}
                  />
                </Form.Group>
              </Row>
              <br />
              <h6>Vehicle</h6>
              <Row>
                <Form.Group as={Col} controlId="formVehiclePlate">
                  <Form.Label>License Plate</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleLicensePlateNo"
                    value={report.VehicleInfo[0].licensePlateNo}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleCarProvince">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleProvince"
                    value={report.VehicleInfo[0].province}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formVehicleMake">
                  <Form.Label>Make</Form.Label>
                  <Form.Control type="text" name="vehicleMake" value={report.VehicleInfo[0].make} />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="text" name="vehicleYear" value={report.VehicleInfo[0].year} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formVehicleModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleModel"
                    value={report.VehicleInfo[0].model}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formVehicleType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control type="text" name="vehicleType" value={report.VehicleInfo[0].type} />
                </Form.Group>
              </Row>
              <Form.Group controlId="formVehicleVin">
                <Form.Label>Vehicle Identification Number</Form.Label>
                <Form.Control type="text" name="vehicleVIN" value={report.VehicleInfo[0].VIN} />
              </Form.Group>
              <br />
            </div>
            <div>
              <h6>The Other Party{"'"}s Vehicle Owner Information</h6>
              <Form.Group as={Col} controlId="formDamageNameOwner">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  name="damageNameOwner"
                  value={report.PropertyDamage[0].nameOwner}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formDamagePhoneOwner">
                <Form.Label>Owner Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="damagePhoneOwner"
                  value={report.PropertyDamage[0].phoneOwner}
                />
              </Form.Group>
              <Row>
                <Form.Group as={Col} controlId="formDamageOwnerStreet">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageOwnerStreet"
                    value={report.PropertyDamage[0].ownerStreet}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageOwnerCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageOwnerCity"
                    value={report.PropertyDamage[0].ownerCity}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageOwnerProvince">
                  <Form.Label>Province/State</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageOwnerProvince"
                    value={report.PropertyDamage[0].ownerProvince}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageOwnerCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageOwnerCountry"
                    value={report.PropertyDamage[0].ownerCountry}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageOwnerPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageOwnerPostalCode"
                    value={report.PropertyDamage[0].ownerPostalCode}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formDamagelicenseOwner">
                  <Form.Label>Driver License</Form.Label>
                  <Form.Control
                    type="text"
                    name="damagelicenseOwner"
                    value={report.PropertyDamage[0].licenseNumberOwner}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageOwnerProvIssue">
                  <Form.Label>Issuing Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageOwnerProvIssue"
                    value={report.PropertyDamage[0].ownerProvIssue}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageCarYear">
                  <Form.Label>Year of the Vehicle</Form.Label>
                  <Form.Control
                    type="number"
                    name="damageCarYear"
                    value={report.PropertyDamage[0].yearOfVehicle}
                  />
                </Form.Group>
              </Row>
              <br />
              <h6>The Other Party{"'"}s Vehicle Driver Information</h6>
              <Form.Group as={Col} controlId="formDamageNameDriver">
                <Form.Label>Driver Name</Form.Label>
                <Form.Control
                  type="text"
                  name="damageNameDriver"
                  value={report.PropertyDamage[0].nameDriver}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formDamagePhoneDrive">
                <Form.Label>Driver Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="damagePhoneDriver"
                  value={report.PropertyDamage[0].phoneDriver}
                />
              </Form.Group>
              <Row>
                <Form.Group as={Col} controlId="formDamageDriStreet">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageDriStreet"
                    value={report.PropertyDamage[0].nameDriver}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageDriCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageDriCity"
                    value={report.PropertyDamage[0].driverCity}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageDriProvince">
                  <Form.Label>Province/State</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageDriProvince"
                    value={report.PropertyDamage[0].driverProvince}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageDriCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageDriCountry"
                    value={report.PropertyDamage[0].driverCountry}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageDriPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageDriPostalCode"
                    value={report.PropertyDamage[0].driverPostalCode}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formDamagelicenseDriver">
                  <Form.Label>Driver License</Form.Label>
                  <Form.Control
                    type="text"
                    name="damagelicenseDriver"
                    value={report.PropertyDamage[0].driverLicenseNumber}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formDamageDriverProvIssue">
                  <Form.Label>Issuing Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="damageDriverProvIssue"
                    value={report.PropertyDamage[0].driverProvIssue}
                  />
                </Form.Group>
              </Row>
              <br />

              <Row>
                <br />
                <h6>The Other Party{"'"}s Insurance</h6>
                <Row>
                  <Form.Group as={Col} controlId="formDamageNameInsurer">
                    <Form.Label>Insurance Agency</Form.Label>
                    <Form.Control
                      type="text"
                      name="damageNameInsurer"
                      value={report.PropertyDamage[0].nameInsurer}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formDamagePolicyNumber">
                    <Form.Label>Policy Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="damagePolicyNumber"
                      value={report.PropertyDamage[0].policyNumber}
                    />
                  </Form.Group>
                </Row>
              </Row>

              <br />
            </div>
          </Form.Group>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button as={Link} to="/editreport">
              Edit Report
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ViewReport;
