import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Reports = () => {
  return (
    <div>
      <Container className="text-center">
        <h1>Reports</h1>
        <Button as={Link} to="/newreport">
          Create a New Report
        </Button>{' '}
        <Button as={Link} to="/viewallreport">
          View All Existing Reports
        </Button>
      </Container>
    </div>
  );
};

export default Reports;
