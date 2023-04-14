import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import process from 'process';

const ViewReport = (id) => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState([]);
  const [decision, setDecision] = useState('reject');
  const [adminComment, setAdminComment] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  // default is true for ease of testing; can turn it to false for production
  //let isAdmin = false;
  const token = JSON.parse(localStorage.getItem('token'));
  const { Id } = useParams();

  useEffect(() => {
    console.log('Logging token: ', token);
    getReports(Id);
    checkAdminStatus();
  }, []);

  const getReports = async (Id) => {
    console.log(id);
    fetch(`${process.env.REACT_APP_API_URL}/api/report/${Id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // SET  REPORTS HERE
        console.log(data);
        setReport({
          ...data.reportInfo.report,
          Insurance: data.reportInfo.vehiclesPolicies,
          PersonalInfo: data.reportInfo.user,
          VehicleInfo: data.reportInfo.vehicle,
        });
        console.log(report);
        // setUser(data.reportInfo.user);
        // setVehicle(data.reportInfo.vehicle);
        // console.log('Logging fetched reports: ', data.reports);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageRender = (evidence) => {
    let bytes = new Uint8Array(evidence.size);

    for (var i = 0; i < evidence.size; i++) {
      bytes[i] = evidence.data.data[i];
    }

    let blob = new Blob([bytes], { type: evidence.contentType });

    var urlCreator = window.URL || window.webkitURL;
    const result = urlCreator.createObjectURL(blob);
    console.log(result);
    return result;
  };

  const checkAdminStatus = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/userInfo`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsAdmin(data.userInfo.user.isAdmin);
        //isAdmin = data.userInfo.user.isAdmin;
        console.log(data.userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendAdminFeedback = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/api/postFeedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ reportId: Id, flag: decision, adminComments: adminComment }),
      });
      if (res.status >= 200 && res.status <= 299) {
        // maybe empty out fields and errors here with set state
        console.log('POST admin feedback Success!!');
      } else {
        console.log('Some Error occurred for admin feedback');
      }
    } catch (err) {
      console.log(err);
    }
    console.log(`id: ${Id},flag: ${decision}, adminComments: ${adminComment}`);
  };

  const deleteReport = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/api/report/${Id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      if (res.status >= 200 && res.status <= 299) {
        // maybe empty out fields and errors here with set state
        console.log('DELETE report Success!!');
      } else {
        console.log('Some Error occurred for deleting report');
      }
    } catch (err) {
      console.log(err);
    }
    console.log(`id: ${Id}`);
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <Container style={{ padding: '15px' }}>
            <Form>
              <fieldset disabled>
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
                    <Form.Control
                      type="text"
                      name="form[roadconditions]"
                      value={report.roadCondition}
                    />
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
                          <Form.Control
                            type="text"
                            name="personInjuredName"
                            value={personInjured.name}
                          />
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
                          <Form.Control
                            type="text"
                            name="personInjuredCity"
                            value={personInjured.city}
                          />
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
                          <Form.Control
                            type="text"
                            name="witnessPhoneNumber"
                            value={witness.phone}
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group as={Col} controlId="formPersonInjuredAddress">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="personInjuredAddress"
                            value={witness.street}
                          />
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
                          <Form.Control
                            type="text"
                            name="personInjuredCountry"
                            value={witness.country}
                          />
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
                        <Form.Control
                          type="text"
                          name="evidenceName"
                          value={evidence.id + evidence.name}
                        />
                        <img src={handleImageRender(evidence)} height="200px"></img>
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
                    <Form.Control
                      type="text"
                      name="insuranceAgent"
                      value={report.Insurance[0].Agent}
                    />
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
                      value={report.PersonalInfo.fullname}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPersonalInfoEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="personalInfoEmail"
                      value={report.PersonalInfo.email}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPersonalInfoDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="text"
                      name="personalInfoDob"
                      value={report.PersonalInfo.dob}
                    />
                  </Form.Group>
                  <br />
                  <h6>Home Address</h6>
                  <Row>
                    <Form.Group as={Col} controlId="formPersonalInfoHomeAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfohomeStreet"
                        value={report.PersonalInfo.homeStreet}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoHomeCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfoHomeCity"
                        value={report.PersonalInfo.homeCity}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formPersonalInfoHomeProvince">
                      <Form.Label>Province/State</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfohomeProvince"
                        value={report.PersonalInfo.homeProvince}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoHomeCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfoHomeCountry"
                        value={report.PersonalInfo.homeCountry}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoHomePostal">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfohomePostalCode"
                        value={report.PersonalInfo.homePostalCode}
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
                        value={report.PersonalInfo.businessStreet || ''}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoBizCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfoBizCity"
                        value={report.PersonalInfo.businessCity || ''}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="formPersonalInfoBizProvince">
                      <Form.Label>Province/State</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfoBizProvince"
                        value={report.PersonalInfo.businessProvince || ''}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoBizCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfoBizCountry"
                        value={report.PersonalInfo.businessCountry || ''}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoBizPostal">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalInfoBizPostalCode"
                        value={report.PersonalInfo.businessPostalCode || ''}
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
                        value={report.PersonalInfo.phoneNumber}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPersonalInfoYearsDriving">
                      <Form.Label>Years Driving</Form.Label>
                      <Form.Control
                        type="number"
                        name="personalInfoYearsDriving"
                        value={report.PersonalInfo.yearsDriving}
                      />
                    </Form.Group>
                  </Row>
                  <br />
                  <Form.Group controlId="formPersonalInfoYearLicenseNumber">
                    <Form.Label>Drivers License Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="personalInfodriverLicense"
                      value={report.PersonalInfo.driverLicense}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group xs={7} controlId="formPersonalInfoDisabilities">
                    <Form.Label>List any disabilities</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="personalInfodisabilities"
                      value={report.PersonalInfo.disabilities || ''}
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
                        value={report.VehicleInfo.registeredOwner}
                      />
                    </Form.Group>
                    <br />
                    <Row>
                      <Form.Group as={Col} controlId="formVehicleAddress">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleRegStreet"
                          value={report.VehicleInfo.registeredOwnerStreet}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleRegCity"
                          value={report.VehicleInfo.registeredOwnerCity}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formVehicleProvince">
                        <Form.Label>Province/State</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleRegProvince"
                          value={report.VehicleInfo.registeredOwnerProvince}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleRegCountry"
                          value={report.VehicleInfo.registeredOwnerCountry}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehiclePostal">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleRegPostalCode"
                          value={report.VehicleInfo.registeredOwnerPostalCode}
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
                        value={report.VehicleInfo.actualOwner}
                      />
                    </Form.Group>
                    <Row>
                      <Form.Group as={Col} controlId="formVehicleActAddress">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleregisteedActStreet"
                          value={report.VehicleInfo.actualOwnerStreet}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleActCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleActCity"
                          value={report.VehicleInfo.actualOwnerCity}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formVehicleActProvince">
                        <Form.Label>Province/State</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleActProvince"
                          value={report.VehicleInfo.actualOwnerProvince}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleActCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleActCountry"
                          value={report.VehicleInfo.actualOwnerCountry}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleActPostal">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleActPostalCode"
                          value={report.VehicleInfo.actualOwnerPostalCode}
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
                          value={report.VehicleInfo.licensePlateNo}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleCarProvince">
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleProvince"
                          value={report.VehicleInfo.province}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formVehicleMake">
                        <Form.Label>Make</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleMake"
                          value={report.VehicleInfo.make}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleYear"
                          value={report.VehicleInfo.year}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formVehicleModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleModel"
                          value={report.VehicleInfo.model}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formVehicleType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleType"
                          value={report.VehicleInfo.type}
                        />
                      </Form.Group>
                    </Row>
                    <Form.Group controlId="formVehicleVin">
                      <Form.Label>Vehicle Identification Number</Form.Label>
                      <Form.Control type="text" name="vehicleVIN" value={report.VehicleInfo.VIN} />
                    </Form.Group>
                    <br />
                  </div>
                  <div>
                    {report.PropertyDamage.map((PropertyDamage, idx) => (
                      <div key={idx}>
                        <h6>The Other Party{"'"}s Vehicle Owner Information</h6>
                        <Form.Group as={Col} controlId="formDamageNameOwner">
                          <Form.Label>Owner Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="damageNameOwner"
                            value={PropertyDamage.nameOwner}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDamagePhoneOwner">
                          <Form.Label>Owner Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="damagePhoneOwner"
                            value={PropertyDamage.phoneOwner}
                          />
                        </Form.Group>
                        <Row>
                          <Form.Group as={Col} controlId="formDamageOwnerStreet">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageOwnerStreet"
                              value={PropertyDamage.ownerStreet}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageOwnerCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageOwnerCity"
                              value={PropertyDamage.ownerCity}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageOwnerProvince">
                            <Form.Label>Province/State</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageOwnerProvince"
                              value={PropertyDamage.ownerProvince}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageOwnerCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageOwnerCountry"
                              value={PropertyDamage.ownerCountry}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageOwnerPostalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageOwnerPostalCode"
                              value={PropertyDamage.ownerPostalCode}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formDamagelicenseOwner">
                            <Form.Label>Driver License</Form.Label>
                            <Form.Control
                              type="text"
                              name="damagelicenseOwner"
                              value={PropertyDamage.licenseNumberOwner}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageOwnerProvIssue">
                            <Form.Label>Issuing Province</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageOwnerProvIssue"
                              value={PropertyDamage.ownerProvIssue}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageCarYear">
                            <Form.Label>Year of the Vehicle</Form.Label>
                            <Form.Control
                              type="number"
                              name="damageCarYear"
                              value={PropertyDamage.yearOfVehicle}
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
                            value={PropertyDamage.nameDriver}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDamagePhoneDrive">
                          <Form.Label>Driver Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="damagePhoneDriver"
                            value={PropertyDamage.phoneDriver}
                          />
                        </Form.Group>
                        <Row>
                          <Form.Group as={Col} controlId="formDamageDriStreet">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageDriStreet"
                              value={PropertyDamage.nameDriver}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageDriCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageDriCity"
                              value={PropertyDamage.driverCity}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageDriProvince">
                            <Form.Label>Province/State</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageDriProvince"
                              value={PropertyDamage.driverProvince}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageDriCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageDriCountry"
                              value={PropertyDamage.driverCountry}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageDriPostalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageDriPostalCode"
                              value={PropertyDamage.driverPostalCode}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formDamagelicenseDriver">
                            <Form.Label>Driver License</Form.Label>
                            <Form.Control
                              type="text"
                              name="damagelicenseDriver"
                              value={PropertyDamage.driverLicenseNumber}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formDamageDriverProvIssue">
                            <Form.Label>Issuing Province</Form.Label>
                            <Form.Control
                              type="text"
                              name="damageDriverProvIssue"
                              value={PropertyDamage.driverProvIssue}
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
                                value={PropertyDamage.nameInsurer}
                              />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formDamagePolicyNumber">
                              <Form.Label>Policy Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="damagePolicyNumber"
                                value={PropertyDamage.policyNumber}
                              />
                            </Form.Group>
                          </Row>
                        </Row>
                      </div>
                    ))}
                    <br />
                  </div>
                  <div>
                    <Row>
                      <Form.Group xs={7} controlId="adminComment">
                        <Form.Label>Admin Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          name="adminComment"
                          value={report.adminComments}
                          onChange={(e) => setAdminComment(e.target.value)}
                        />
                      </Form.Group>
                      <br />
                      <Form.Label>Decision</Form.Label>
                      <Form.Group controlId="decision">
                        <Form.Control type="text" value={report.flag} />
                      </Form.Group>
                    </Row>
                  </div>
                </Form.Group>
                <br />
              </fieldset>
              {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button as={Link} to="/editreport" id={id}>
                  Edit Report
                </Button>
              </div> */}

              {isAdmin ? (
                <div>
                  <h3>Admin Only</h3>
                  <Form.Group xs={7} controlId="adminComment">
                    <Form.Label>Admin Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="adminComment"
                      onChange={(e) => setAdminComment(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                  <Form.Label>Decision</Form.Label>
                  <Form.Group controlId="decision">
                    <Form.Check
                      type="radio"
                      name="decisionAccept"
                      id="inline-radio-1"
                      value="accept"
                      label="Accept"
                      checked={decision === 'accept'}
                      onChange={() => setDecision('accept')}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      name="decisionReject"
                      id="inline-radio-2"
                      value="reject"
                      label="Reject"
                      checked={decision === 'reject'}
                      onChange={() => setDecision('reject')}
                      inline
                    />
                  </Form.Group>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button id={id} onClick={sendAdminFeedback} as={Link} to={`/viewallreport`}>
                      Submit Feedback To Report
                    </Button>
                    <Button id={id} onClick={deleteReport} as={Link} to={`/viewallreport`}>
                      Delete Report
                    </Button>
                  </div>
                </div>
              ) : (
                ''
              )}
            </Form>
          </Container>
        </div>
      )}
    </>
  );
};

export default ViewReport;
