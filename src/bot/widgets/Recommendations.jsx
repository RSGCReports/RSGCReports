import React from 'react';

import './Recommendations.css';

const Recommendations = (props) => {
  const Recommendations = [
    {
      recommendation: 'Contact Us',
      handler: props.actionProvider.handleContactUs,
      // handler: () => {},
      id: 1,
    },
    {
      recommendation: 'Nearest Collision Center',
      // handler: props.actionProvider.handleCollisionCenter,
      handler: () => {},
      id: 2,
    },
    {
      recommendation: 'Go to Reports',
      // handler: props.actionProvider.handleGoToReports,
      handler: () => {},
      id: 3,
    },
    {
      recommendation: 'Damages Exceeding $2000',
      // handler: props.actionProvider.handleHighDamage,
      handler: () => {},
      id: 4,
    },
  ];

  return (
    <div className="recommendations">
      <h1 className="rec-header">Recommendations</h1>
      <div className="recs">
        {Recommendations.map((Recommendation) => {
          return (
            <button className="rec-button" onClick={Recommendation.handler} key={Recommendation.id}>
              {Recommendation.recommendation}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
