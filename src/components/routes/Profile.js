import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import PersonalInfo from './profileComponents/PersonalInfo';
// import InsurancePolicy from './profileComponents/InsurancePolicy';
// import VehicleInfo from './profileComponents/VehicleInfo';

const Profile = () => {
  const [fullName, setFullName] = useState([]);

  useEffect(() => {
    fetchUser().then((users) => setFullName(users.attributes.name));
  });

  const fetchUser = async () => {
    return await Auth.currentUserInfo();
  };

  return (
    <div>
      <Container>
        <h1>
          {fullName}
          {"'"}s Profile
        </h1>
        <br />
        <PersonalInfo />
        <br />
        {/* <InsurancePolicy /> */}
        <br />
        {/* <VehicleInfo /> */}
      </Container>
    </div>
  );
};

export default Profile;
