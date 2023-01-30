import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState([]);

  useEffect(() => {
    fetchUser().then((users) => setUser(users));
    fetchUser().then((users) => setUserName(users.username));
  });

  const fetchUser = async () => {
    return await Auth.currentUserInfo();
  };

  return (
    <div>
      <Container>
        <h1>{username}</h1>
      </Container>
    </div>
  );
};

export default Profile;
