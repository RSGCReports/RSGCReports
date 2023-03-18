import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <Container className="text-center ">
      <h2>Profile Completed!</h2>
      <Button variant="primary" type="submit" as={Link} to="/accountpage">
        Account Page
      </Button>
    </Container>
  );
};

export default Success;
