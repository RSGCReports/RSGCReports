import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewAllReport = () => {
  // TODO: Delete the mocking when get report route is made
  let reports = [
    {
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
    },
    {
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
    },
  ];

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
      <Container>
        {' '}
        <h3>
          <b> All Reports</b>
        </h3>
      </Container>

      {reports.map((report, idx) => (
        <div key={idx}>
          <Container style={{ padding: '15px' }}>
            <Form>
              <fieldset disabled>
                <Row>
                  <Form.Group as={Col} controlId="formDate">
                    <Form.Label>Date And Time</Form.Label>
                    <Form.Control type="text" name="form[date]" value={report.dayTime} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="form[location]" value={report.location} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formAccidentDescription">
                    <Form.Label>Accident Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="form[accidentcondtions]"
                      value={report.accidentDescription}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formVehiclePlate">
                    <Form.Label>License Plate</Form.Label>
                    <Form.Control
                      type="text"
                      name="vehicleLicensePlateNo"
                      value={report.VehicleInfo[0].licensePlateNo}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formVehicleMake">
                    <Form.Label>Make</Form.Label>
                    <Form.Control
                      type="text"
                      name="vehicleMake"
                      value={report.VehicleInfo[0].make}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formVehicleYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="vehicleYear"
                      value={report.VehicleInfo[0].year}
                    />
                  </Form.Group>

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
                    <Form.Control
                      type="text"
                      name="vehicleType"
                      value={report.VehicleInfo[0].type}
                    />
                  </Form.Group>
                </Row>
                <br />

                {report.PropertyDamage.map((PropertyDamage, idx) => (
                  <div key={idx}>
                    <h6>The Other Partys{"'"} Vehicle Driver</h6>
                    <Form.Group as={Col} controlId="formDamageNameDriver">
                      <Form.Control
                        type="text"
                        name="damageNameDriver"
                        value={PropertyDamage.nameDriver}
                      />
                    </Form.Group>
                  </div>
                ))}
              </fieldset>
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button as={Link} to="/viewreport" id={report.reportId}>
                  View Report
                </Button>
              </div>
            </Form>
          </Container>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ViewAllReport;
