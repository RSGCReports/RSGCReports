import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <Container>
      <h2>Profile Completed!</h2>
      <Button variant="primary" type="submit" as={Link} to="/accountpage" />
    </Container>
  );
};

export default Success;
