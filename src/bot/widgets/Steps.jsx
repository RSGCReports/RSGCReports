import React from 'react';

import './Steps.css';

const Steps = () => {
  return (
    <div style={{ backgroundColor: 'rgb(54 106 125)', borderRadius: '25px' }}>
      <div className="Steps">
        <ol style={{ color: 'white' }}>
          <li>Navigate to profile page, enter personal, insurance, and vehicle information</li>
          <li>Navigate to Account Page</li>
          <li>Verify information is correct</li>
          <li>(Optional) Edit information</li>
          <li>(Optional) Add new Insurance Policies and Vehicles</li>
          <li>Navigate to reports page</li>
          <li>Create new report</li>
          <li>Wait for an Admin to review your report</li>
          <li>If your report is rejected re-create it with the advice from the admin comments</li>
        </ol>
      </div>
    </div>
  );
};

export default Steps;
