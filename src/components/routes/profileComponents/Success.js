import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Success = () => {
  const reloadCount = sessionStorage.getItem('reloadCount');

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    if (reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      refreshPage();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);

  return (
    <Container className="text-center">
      <h2>Profile Completed!</h2>
      <Button variant="primary" type="submit" as={Link} to="/accountpage">
        Account Page
      </Button>
    </Container>
  );
};

export default Success;
