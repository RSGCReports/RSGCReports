import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PersonalInfo from './profileComponents/PersonalInfo';
import InsurancePolicy from './profileComponents/InsurancePolicy';
import VehicleInfo from './profileComponents/VehicleInfo';
import Confirmation from './profileComponents/Confirmation';
// import Success from './profileComponents/Success';
import NotFound from './NotFound';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const [form, setForm] = useState({});
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // checking for errors, and removing them from error object
    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  // proceed to next component
  const nextStep = () => {
    setStep(step + 1);
  };
  // proceed to previous component
  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <Container>
          <PersonalInfo
            nextStep={nextStep}
            setField={setField}
            setErrors={setErrors}
            errors={errors}
            formValues={form}
          />
        </Container>
      );
    case 2:
      return (
        <Container>
          <InsurancePolicy
            nextStep={nextStep}
            prevStep={prevStep}
            setField={setField}
            setErrors={setErrors}
            errors={errors}
            formValues={form}
          />
        </Container>
      );
    case 3:
      return (
        <Container>
          <VehicleInfo
            nextStep={nextStep}
            prevStep={prevStep}
            setField={setField}
            setErrors={setErrors}
            errors={errors}
            formValues={form}
          />
        </Container>
      );
    case 4:
      return (
        <Container>
          <Confirmation
            nextStep={nextStep}
            prevStep={prevStep}
            setForm={setForm}
            setErrors={setErrors}
            formValues={form}
          />
        </Container>
      );
    case 5:
      return <Navigate to="/success" />;
    default:
      return (
        <Container>
          <NotFound />
        </Container>
      );
  }
};

export default Profile;
