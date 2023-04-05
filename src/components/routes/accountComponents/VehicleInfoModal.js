import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

const VehicleInfoModal = (props) => {
  const [newVehicle, setNewVehicle] = useState({});
  const [policies, setPolicies] = useState([]);
  const [policy, setPolicy] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setNewVehicle({
      ...newVehicle,
      [field]: value,
    });
    // checking for errors, and removing them from error object
    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = async (e) => {
    console.log('inside submit');
    e.preventDefault();
    const newErrors = checkErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      console.log('success, no errors');
      if (props.adding) {
        try {
          const payload = { newVehicle, policy };
          console.log(payload);
          let res = await fetch('http://localhost:8080/api/postVehicle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify(payload),
          });
          if (res.status >= 200 && res.status <= 299) {
            // maybe empty out fields and errors here with set state
            console.log('POST Success!!');
          } else {
            console.log('Some Error occurred...');
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const payload = { newVehicle, policy };
          console.log(payload);
          let res = await fetch('http://localhost:8080/api/updateVehicle', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify(payload),
          });
          if (res.status >= 200 && res.status <= 299) {
            // maybe empty out fields and errors here with set state
            console.log('PUT Success!!');
          } else {
            console.log('Some Error occurred...');
          }
        } catch (err) {
          console.log(err);
        }
      }
      props.onHide();
    }
  };

  // get policies to display for dropdown
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    console.log('Logging token: ', token);
    getPolicies();
  }, []);

  const getPolicies = async () => {
    fetch('http://localhost:8080/api/getPolicies', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // SET Policies HERE
        console.log(data);
        setPolicies(data.policies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePolicyNumberChange = (selectedOption) => {
    console.log(selectedOption);
    setPolicy(selectedOption);
  };

  const checkErrors = () => {
    const {
      registeredOwner,
      actualOwner,
      registeredOwnerStreet,
      registeredOwnerCity,
      registeredOwnerCountry,
      registeredOwnerProvince,
      registeredOwnerPostalCode,
      actualOwnerStreet,
      actualOwnerCity,
      actualOwnerCountry,
      actualOwnerProvince,
      actualOwnerPostalCode,
      licensePlateNo,
      province,
      make,
      year,
      model,
      type,
      VIN,
    } = newVehicle;
    const newErrors = {};

    if (props.adding === true) {
      // name check
      if (!registeredOwner || registeredOwner === '')
        newErrors.registeredOwner = 'Must provide registered owners name';
      if (!actualOwner || actualOwner === '')
        newErrors.actualOwner = 'Must provide actual owners name';

      // registered owners address check
      if (!registeredOwnerStreet || registeredOwnerStreet === '')
        newErrors.registeredOwnerStreet = 'Must provide street address';
      if (!registeredOwnerCity || registeredOwnerCity === '')
        newErrors.registeredOwnerCity = 'Must provide city';
      if (!registeredOwnerCountry || registeredOwnerCountry === '')
        newErrors.registeredOwnerCountry = 'Must provide country';
      if (!registeredOwnerProvince || registeredOwnerProvince === '')
        newErrors.registeredOwnerProvince = 'Must provide province';
      if (!registeredOwnerPostalCode || registeredOwnerPostalCode === '')
        newErrors.registeredOwnerPostalCode = 'Must provide postal code';

      // actual owners address check
      if (!actualOwnerStreet || actualOwnerStreet === '')
        newErrors.actualOwnerStreet = 'Must provide street address';
      if (!actualOwnerCity || actualOwnerCity === '')
        newErrors.actualOwnerCity = 'Must provide city';
      if (!actualOwnerCountry || actualOwnerCountry === '')
        newErrors.actualOwnerCountry = 'Must provide country';
      if (!actualOwnerProvince || actualOwnerProvince === '')
        newErrors.actualOwnerProvince = 'Must provide province';
      if (!actualOwnerPostalCode || actualOwnerPostalCode === '')
        newErrors.actualOwnerPostalCode = 'Must provide postal code';

      // license plate check
      if (!licensePlateNo || licensePlateNo === '')
        newErrors.licensePlateNo = 'Must provide license plate number';

      // vehicle details check
      if (!province || province === '')
        newErrors.province = 'Must provide the province of where the vehicle was bought';

      if (!make || make === '') newErrors.make = 'Must provide make of vehicle';
      if (!year || year === '') newErrors.year = 'Must provide year of vehicle';
      if (!model || model === '') newErrors.model = 'Must provide model of vehicle';
      if (!type || type === '') newErrors.type = 'Must provide type of vehicle';
      if (!VIN || VIN === '') newErrors.VIN = 'Must provide vehicle identification number';
    }

    if (
      registeredOwnerCountry &&
      registeredOwnerCountry !== '' &&
      registeredOwnerCountry !== 'Canada'
    )
      newErrors.registeredOwnerCountry = 'Must be Canada';
    if (
      registeredOwnerProvince &&
      registeredOwnerProvince !== '' &&
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        registeredOwnerProvince
      )
    )
      newErrors.registeredOwnerProvince = 'Must be a Canadian province code (e.g ON)';
    if (
      registeredOwnerPostalCode &&
      registeredOwnerPostalCode !== '' &&
      !/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(registeredOwnerPostalCode)
    )
      newErrors.registeredOwnerPostalCode = 'Postal code must be in X#X#X# format';

    if (actualOwnerCountry && actualOwnerCountry !== '' && actualOwnerCountry !== 'Canada')
      newErrors.actualOwnerCountry = 'Must be Canada';
    if (
      actualOwnerProvince &&
      actualOwnerProvince !== '' &&
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        actualOwnerProvince
      )
    )
      newErrors.actualOwnerProvince = 'Must be a Canadian province code (e.g ON)';
    if (
      actualOwnerPostalCode &&
      actualOwnerPostalCode !== '' &&
      !/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/.test(actualOwnerPostalCode)
    )
      newErrors.actualOwnerPostalCode = 'Postal code must be in X#X#X# format';

    if (
      province &&
      province !== '' &&
      !['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU'].includes(
        province
      )
    )
      newErrors.province = 'Must be a Canadian province code (e.g ON)';

    if (VIN && VIN.length != 17)
      newErrors.VIN = 'Vehicle identification number must be 17 characters';

    return newErrors;
  };

  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {!props.adding
              ? `Edit Vehicle Information ${props.data.VIN}`
              : 'Add New Vehicle Information'}
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <h6>Registered Owner{"'"}s Information</h6>
            <Form.Group controlId="formRegOwner">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="newVehicle[registeredOwner]"
                defaultValue={
                  !props.adding ? props.data.registeredOwner : newVehicle.registeredOwner
                }
                placeholder={!props.adding ? props.data.registeredOwner : 'John Doe'}
                onChange={(e) => setField('registeredOwner', e.target.value)}
                isInvalid={errors.registeredOwner}
              />
              <Form.Control.Feedback type="invalid">{errors.registeredOwner}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId="formAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[registeredOwnerStreet]"
                  defaultValue={
                    !props.adding
                      ? props.data.registeredOwnerStreet
                      : newVehicle.registeredOwnerStreet
                  }
                  placeholder={!props.adding ? props.data.registeredOwnerStreet : '123 Fake St'}
                  onChange={(e) => setField('registeredOwnerStreet', e.target.value)}
                  isInvalid={errors.registeredOwnerStreet}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registeredOwnerStreet}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[registeredOwnerCity]"
                  defaultValue={
                    !props.adding ? props.data.registeredOwnerCity : newVehicle.registeredOwnerCity
                  }
                  placeholder={!props.adding ? props.data.registeredOwnerCity : ''}
                  onChange={(e) => setField('registeredOwnerCity', e.target.value)}
                  isInvalid={errors.registeredOwnerCity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registeredOwnerCity}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[registeredOwnerProvince]"
                  defaultValue={
                    !props.adding
                      ? props.data.registeredOwnerProvince
                      : newVehicle.registeredOwnerProvince
                  }
                  placeholder={!props.adding ? props.data.registeredOwnerProvince : ''}
                  onChange={(e) => setField('registeredOwnerProvince', e.target.value)}
                  isInvalid={errors.registeredOwnerProvince}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registeredOwnerProvince}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[registeredOwnerCountry]"
                  defaultValue={
                    !props.adding
                      ? props.data.registeredOwnerCountry
                      : newVehicle.registeredOwnerCountry
                  }
                  placeholder={!props.adding ? props.data.registeredOwnerCountry : ''}
                  onChange={(e) => setField('registeredOwnerCountry', e.target.value)}
                  isInvalid={errors.registeredOwnerCountry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registeredOwnerCountry}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[registeredOwnerPostalCode]"
                  defaultValue={
                    !props.adding
                      ? props.data.registeredOwnerPostalCode
                      : newVehicle.registeredOwnerPostalCode
                  }
                  placeholder={!props.adding ? props.data.registeredOwnerPostalCode : 'X#X#X#'}
                  onChange={(e) => setField('registeredOwnerPostalCode', e.target.value)}
                  isInvalid={errors.registeredOwnerPostalCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registeredOwnerPostalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <hr />
            <h6>Actual Owner{"'"}s Information</h6>
            <Form.Group as={Col} controlId="formActOwner">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="newVehicle[actualOwner]"
                defaultValue={!props.adding ? props.data.actualOwner : newVehicle.actualOwner}
                placeholder={!props.adding ? props.data.actualOwner : 'John Doe'}
                onChange={(e) => setField('actualOwner', e.target.value)}
                isInvalid={errors.actualOwner}
              />
              <Form.Control.Feedback type="invalid">{errors.actualOwner}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId="formAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[actualOwnerStreet]"
                  defaultValue={
                    !props.adding ? props.data.actualOwnerStreet : newVehicle.actualOwnerStreet
                  }
                  placeholder={!props.adding ? props.data.actualOwnerStreet : '123 Fake St'}
                  onChange={(e) => setField('actualOwnerStreet', e.target.value)}
                  isInvalid={errors.actualOwnerStreet}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.actualOwnerStreet}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[actualOwnerCity]"
                  defaultValue={
                    !props.adding ? props.data.actualOwnerCity : newVehicle.actualOwnerCity
                  }
                  placeholder={!props.adding ? props.data.actualOwnerCity : ''}
                  onChange={(e) => setField('actualOwnerCity', e.target.value)}
                  isInvalid={errors.actualOwnerCity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.actualOwnerCity}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province/State</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[actualOwnerProvince]"
                  defaultValue={
                    !props.adding ? props.data.actualOwnerProvince : newVehicle.actualOwnerProvince
                  }
                  placeholder={!props.adding ? props.data.actualOwnerProvince : ''}
                  onChange={(e) => setField('actualOwnerProvince', e.target.value)}
                  isInvalid={errors.actualOwnerProvince}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.actualOwnerProvince}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[actualOwnerCountry]"
                  defaultValue={
                    !props.adding ? props.data.actualOwnerCountry : newVehicle.actualOwnerCountry
                  }
                  placeholder={!props.adding ? props.data.actualOwnerCountry : ''}
                  onChange={(e) => setField('actualOwnerCountry', e.target.value)}
                  isInvalid={errors.actualOwnerCountry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.actualOwnerCountry}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formPostal">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[actualOwnerPostalCode]"
                  defaultValue={
                    !props.adding
                      ? props.data.actualOwnerPostalCode
                      : newVehicle.actualOwnerPostalCode
                  }
                  placeholder={!props.adding ? props.data.actualOwnerPostalCode : 'X#X#X#'}
                  onChange={(e) => setField('actualOwnerPostalCode', e.target.value)}
                  isInvalid={errors.actualOwnerPostalCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.actualOwnerPostalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <hr />
            <h6>Vehicle</h6>
            <Row>
              <Form.Group as={Col} controlId="formPlate">
                <Form.Label>License Plate</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[licensePlateNo]"
                  defaultValue={
                    !props.adding ? props.data.licensePlateNo : newVehicle.licensePlateNo
                  }
                  placeholder={!props.adding ? props.data.licensePlateNo : 'ABCD1234'}
                  onChange={(e) => setField('licensePlateNo', e.target.value)}
                  isInvalid={errors.licensePlateNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.licensePlateNo}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formProvince">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[province]"
                  defaultValue={!props.adding ? props.data.province : newVehicle.province}
                  placeholder={!props.adding ? props.data.province : ''}
                  onChange={(e) => setField('province', e.target.value)}
                  isInvalid={errors.province}
                />
                <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formMake">
                <Form.Label>Make</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[make]"
                  defaultValue={!props.adding ? props.data.make : newVehicle.make}
                  placeholder={!props.adding ? props.data.make : ''}
                  onChange={(e) => setField('make', e.target.value)}
                  isInvalid={errors.make}
                />
                <Form.Control.Feedback type="invalid">{errors.make}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[year]"
                  defaultValue={!props.adding ? props.data.year : newVehicle.year}
                  placeholder={!props.adding ? props.data.year : ''}
                  onChange={(e) => setField('year', e.target.value)}
                  isInvalid={errors.year}
                />
                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formModel">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[model]"
                  defaultValue={!props.adding ? props.data.model : newVehicle.model}
                  placeholder={!props.adding ? props.data.model : ''}
                  onChange={(e) => setField('model', e.target.value)}
                  isInvalid={errors.model}
                />
                <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[type]"
                  defaultValue={!props.adding ? props.data.type : newVehicle.type}
                  placeholder={!props.adding ? props.data.type : ''}
                  onChange={(e) => setField('type', e.target.value)}
                  isInvalid={errors.type}
                />
                <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            {props.adding && (
              <Form.Group controlId="formVin">
                <Form.Label>Vehicle Identification Number</Form.Label>
                <Form.Control
                  type="text"
                  name="newVehicle[VIN]"
                  defaultValue={!props.adding ? props.data.VIN : newVehicle.VIN}
                  placeholder={!props.adding ? props.data.VIN : ''}
                  onChange={(e) => setField('VIN', e.target.value)}
                  isInvalid={errors.VIN}
                />
                <Form.Control.Feedback type="invalid">{errors.VIN}</Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Insurance Policy</Form.Label>
              <Select
                value={policies.policyNumber}
                getOptionLabel={(option) => option.insurer + ' ' + option.policyNumber}
                onChange={handlePolicyNumberChange}
                options={policies}
              ></Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save and Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default VehicleInfoModal;
