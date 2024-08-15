// src/components/CareerForm/CareerForm.jsx
import React from "react";
import styles from "../../pages/CareerCalculator/calculator.module.css";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Slider, styled, TextField, Typography } from "@mui/material";

const PrettoSlider = styled(Slider)({
  color: "var(--color-main)",
  height: 2.5,
  position: "relative",
  padding: "0 !important",
  borderRadius: 0,
  bottom: "0rem",
  "& .MuiSlider-rail": {
    backgroundColor: "transparent",
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "0.25rem solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 14,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const CareerForm = ({ onResults }) => {
  const formik = useFormik({
    initialValues: {
      field: "",
      educationType: "",
      duration: "",
      language: "",
      experience: "",
    },
    validationSchema: Yup.object({
      field: Yup.string().required("Required"),
      educationType: Yup.number().required("Required").positive().integer(),
      duration: Yup.string().required("Required"),
      language: Yup.string().required("Required"),
      experience: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <Formik
      onSubmit={formik.handleSubmit}
      initialValues={formik.initialValues}
      validationSchema={formik.validationSchema}
    >
      <Form className="flex flexDirectionColumn">
        <div className={`${styles.formGroup}`}>
          <Field as="select" name="field" id="field">
            <option value="Sahəni seçin">Sahəni seçin</option>
            <option value="Sahəni seçin">Sahəni seçin</option>
            <option value="Sahəni seçin">Sahəni seçin</option>
          </Field>
          <ErrorMessage name="skills" component="span" className="error" />
        </div>

        <div className={`${styles.formGroup} flex flexDirectionColumn`}>
          <h4>Necə öyrənəcəksən?</h4>
          <div
            className={`${styles.formGroupWrapper} flex alignItemsCenter justifyContentBetween`}
            role="group"
            aria-labelledby="educationType"
          >
            <label htmlFor="educationType" className="flex alignItemsCenter">
              <Field type="radio" name="educationType" value="İnnab-da" />
              İnnab-da
            </label>
            <label htmlFor="educationType" className="flex alignItemsCenter">
              <Field type="radio" name="educationType" value="Özüm" />
              Özüm
            </label>
            <label htmlFor="educationType" className="flex alignItemsCenter">
              <Field
                type="radio"
                name="educationType"
                value="Digər kurslarda"
              />
              Digər kurslarda
            </label>
          </div>
          <ErrorMessage name="experience" component="span" className="error" />
        </div>

        <div className={`${styles.formGroup}`}>
          <div>
            <label>Gündə neçə saat məşğul olacaqsan?</label>
            <div className="flex justifyContentBetween">
              <span>2</span>
              <span>saat</span>
            </div>
            <Box>
              <PrettoSlider
                // valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={2}
                min={0}
                max={12}
              />
            </Box>
          </div>
          <ErrorMessage name="education" component="span" className="error" />
        </div>

        <div
          className={`${styles.formGroup} flex flexDirectionColumn`}
          role="group"
          aria-labelledby="language"
        >
          <h4>İngilis dili biliyin</h4>
          <div
            className={`${styles.formGroupWrapper} flex alignItemsCenter justifyContentBetween`}
          >
            <label htmlFor="language" className="flex alignItemsCenter">
              <Field type="radio" name="language" value="İnnab-da" />
              Zəif
            </label>
            <label htmlFor="language" className="flex alignItemsCenter">
              <Field type="radio" name="language" value="Özüm" />
              Orta
            </label>
            <label htmlFor="language" className="flex alignItemsCenter">
              <Field type="radio" name="language" value="Digər kurslarda" />
              Güclü
            </label>
          </div>
          <ErrorMessage name="experience" component="span" className="error" />
        </div>

        <div className={`${styles.formGroup}`}>
          <div>
            <label>Sahə üzrə təcrübən</label>
            <div className="flex justifyContentBetween">
              <span>0</span>
              <span>il</span>
            </div>
            <Box>
              <PrettoSlider
                // valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
                min={0}
                max={47}
              />
            </Box>
          </div>
          <ErrorMessage name="education" component="span" className="error" />
        </div>
        {/* <button type="submit">Calculate</button> */}
      </Form>
    </Formik>
  );
};

export default CareerForm;
