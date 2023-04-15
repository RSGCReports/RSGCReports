import React from 'react';

import './Recommendations.css';

const Recommendations = (props) => {
  const Recommendations = [
    {
      recommendation: 'Contact Us',
      handler: props.actionProvider.handleContactUs,
      id: 1,
    },
    {
      recommendation: 'Find a Collision Center',
      handler: props.actionProvider.handleFindACenter,
      id: 2,
    },
    {
      recommendation: 'Damages Exceeding $2000',

      handler: props.actionProvider.handleBigDamage,
      id: 3,
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
