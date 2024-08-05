// src/components/CareerResults/CareerResults.jsx
import React from "react";

const CareerResults = ({ results }) => {
  return (
    <div>
      <h2>Career Path</h2>
      <p>
        <strong>Job Title:</strong> {results.jobTitle}
      </p>
      <p>
        <strong>Estimated Salary:</strong> ${results.salary}
      </p>
      <p>
        <strong>Growth Potential:</strong> {results.growth}
      </p>
      <p>
        <strong>Description:</strong> {results.description}
      </p>
    </div>
  );
};

export default CareerResults;
