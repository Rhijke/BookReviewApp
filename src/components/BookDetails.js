import React from 'react';

const BookDetails = ({ match }) => {
  return (
    <div>
      {console.log(match)}
      <h3 className="page-header">{match['params'].search}</h3>
    </div>
  );
};

export default BookDetails;
