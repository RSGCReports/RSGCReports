import React from 'react';
import { Container, Form, Col } from 'react-bootstrap';

const VehicleInfo = () => {
  return (
    <div>
      <Container>
        <Form>
          <h3>Vehicle Information</h3>
          {/* <Row> */}
          <Form.Group as={Col} controlId="formRegOwner">
            <Form.Label>Registered Owner Name</Form.Label>
            <Form.Control type="text" placeholder="John Doe" />
          </Form.Group>
          <Form.Group as={Col} controlId="formActOwner">
            <Form.Label>Actual Owner Name</Form.Label>
            <Form.Control type="text" placeholder="John Doe" />
          </Form.Group>
          {/* </Row> */}
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="1234 Fake St" />
          </Form.Group>
          <br />
          <h6>Vehicle</h6>
          {/* <Row> */}
          <Form.Group as={Col} controlId="formPlate">
            <Form.Label>License Plate</Form.Label>
            <Form.Control type="text" placeholder="ABCD1234" />
          </Form.Group>
          <Form.Group as={Col} controlId="formProvince">
            <Form.Label>Province</Form.Label>
            <Form.Select defaultValue="Province">
              <option>List of provinces...</option>
            </Form.Select>
          </Form.Group>
          {/* </Row> */}
          {/* <Row> */}
          <Form.Group as={Col} controlId="formMake">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group as={Col} controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group as={Col} controlId="formModel">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group as={Col} controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Select defaultValue="Type...">
              <option>Types of vehicles...</option>
            </Form.Select>
          </Form.Group>
          {/* </Row> */}
          <Form.Group controlId="formVin">
            <Form.Label>Vehicle Identification Number</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <br />
          <Button varient="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default VehicleInfo;
