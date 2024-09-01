import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import TrainingsNavbar from "../../components/trainingsNavbar";
import HomeTrainings from "../../components/homeTrainings";
import { useTrainingCategories } from "../../features/categories/categorySlice";

const TrainingLayout = () => {
  const { lang } = useParams();
  const {
    data: trainingsCategories,
    error: trainingsError,
    status: trainingStatus,
  } = useTrainingCategories(lang);

  if (trainingStatus === "error") {
    return <div>{trainingsError}</div>;
  }

  if (trainingStatus === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TrainingsNavbar trainingsCategory={trainingsCategories} />
      <HomeTrainings />
    </>
  );
};

export default TrainingLayout;
