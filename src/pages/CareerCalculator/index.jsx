// src/pages/CareerCalculator/CareerCalculator.jsx
import React, { useState } from "react";
import CareerForm from "../../components/CareerForm";
import CareerResults from "../../components/CareerResults";

const CareerCalculator = () => {
  const [results, setResults] = useState(null);

  const handleResults = (data) => {
    setResults(data);
  };

  return (
    <>
      <h1>Career Calculator</h1>
      <CareerForm onResults={handleResults} />
      {results && <CareerResults results={results} />}
    </>
  );
};

export default CareerCalculator;
