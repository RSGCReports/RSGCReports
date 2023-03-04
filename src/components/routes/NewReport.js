import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReportGeneral from './reportFormComponents/ReportGeneral';
const NewReport = () => {
  const [form, setForm] = useState({});
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
  return (
    <Container>
      <ReportGeneral setField={setField} setErrors={setErrors} errors={errors} formValues={form} />
    </Container>
  );
};
export default NewReport;
