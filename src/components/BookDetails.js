import React from 'react';

const BookDetails = ({ match }) => {
  return (
    <div>
      {console.log(match)}
      {console.log(this)}
      <h3 className="page-header">{match['params'].book}</h3>
    </div>
  );
};

export default BookDetails;
