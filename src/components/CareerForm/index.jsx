// src/components/CareerForm/CareerForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { careerData, synonyms } from "../../data/careerData";

const CareerForm = ({ onResults }) => {
  const formik = useFormik({
    initialValues: {
      skills: "",
      experience: "",
      education: "",
    },
    validationSchema: Yup.object({
      skills: Yup.string().required("Required"),
      experience: Yup.number().required("Required").positive().integer(),
      education: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const normalizedValues = {
        skills: values.skills.toLowerCase(),
        experience: values.experience,
        education: values.education.toLowerCase(),
      };
      const results = calculateCareerPath(normalizedValues);
      onResults(results);
    },
  });

  const mapSynonyms = (input) => {
    return input
      .split(" ")
      .map((word) => {
        for (const [key, value] of Object.entries(synonyms)) {
          if (value.includes(word)) return key;
        }
        return word;
      })
      .join(" ");
  };

  const calculateCareerPath = (values) => {
    const { skills, experience, education } = values;

    // Normalize the skills input to an array, split by space and comma, map synonyms
    const skillsArray = skills
      .split(/[, ]+/)
      .map((skill) => mapSynonyms(skill.trim()));

    // Map education to its synonym equivalent
    const normalizedEducation = mapSynonyms(education);

    // Find the best match career from the data
    const bestMatch = careerData.find((career) => {
      const careerSkills = career.skills.map((skill) => mapSynonyms(skill));
      return (
        careerSkills.every((skill) => skillsArray.includes(skill)) &&
        career.experience <= experience &&
        mapSynonyms(career.education) === normalizedEducation
      );
    });

    // If no match is found, return a default result
    if (!bestMatch) {
      return {
        jobTitle: "General Position",
        salary: 50000,
        growth: "Medium",
        description:
          "Based on your skills and experience, a general position is recommended.",
      };
    }

    return bestMatch;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Skills</label>
        <input
          type="text"
          name="skills"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.skills}
        />
        {formik.touched.skills && formik.errors.skills ? (
          <div>{formik.errors.skills}</div>
        ) : null}
      </div>
      <div>
        <label>Experience (years)</label>
        <input
          type="number"
          name="experience"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.experience}
        />
        {formik.touched.experience && formik.errors.experience ? (
          <div>{formik.errors.experience}</div>
        ) : null}
      </div>
      <div>
        <label>Education</label>
        <input
          type="text"
          name="education"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.education}
        />
        {formik.touched.education && formik.errors.education ? (
          <div>{formik.errors.education}</div>
        ) : null}
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default CareerForm;
