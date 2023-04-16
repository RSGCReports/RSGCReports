import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import process from 'process';

const ViewAllReport = () => {
  const [reports, setReports] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    console.log('Logging token: ', token);
    checkAdminStatus();
    getReports();
  }, [isAdmin]);

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

        console.log(data.userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReports = async () => {
    if (!isAdmin) {
      fetch(`${process.env.REACT_APP_API_URL}/api/reports`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // SET  REPORTS HERE
          console.log(data);
          setReports(data.reports);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/adminGetAllReports`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // SET  REPORTS HERE
          console.log('REPORT DATAs: ', data);
          setReports(data.reports);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
                      value={report.vehicle.licensePlateNo}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formVehicleMake">
                    <Form.Label>Make</Form.Label>
                    <Form.Control type="text" name="vehicleMake" value={report.vehicle.make} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formVehicleYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="text" name="vehicleYear" value={report.vehicle.year} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formVehicleModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="vehicleModel" value={report.vehicle.model} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formVehicleType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" name="vehicleType" value={report.vehicle.type} />
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
                <Button as={Link} to={`/viewreport/${report.reportId}`}>
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
