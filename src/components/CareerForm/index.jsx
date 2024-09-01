import { useEffect } from "react";
import styles from "../../pages/CareerCalculator/calculator.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Slider, styled } from "@mui/material";

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
  const initialValues = {
    field: "",
    educationType: "",
    duration: 2,
    language: "",
    experience: 0,
  };

  const validationSchema = Yup.object({
    field: Yup.string().required("Required"),
    educationType: Yup.string().required("Required"),
    duration: Yup.number().required("Required"),
    language: Yup.string().required("Required"),
    experience: Yup.number().required("Required"),
  });

  const calculateResults = (values) => {
    const fieldSalaries = {
      "Frontend Developer": 1200,
      "Data Analitika": 800,
      Mühasibatlıq: 600,
    };

    const educationCoefficients = {
      "İnnab-da": 1.3,
      Özüm: 1,
      "Digər kurslarda": 0.8,
    };

    const experienceCoefficients = {
      0: 0.5,
      1: 0.7,
      2: 1,
      3: 1.25,
      4: 2,
      5: 3,
    };

    const languageCoefficients = {
      Zəif: 0.7,
      Orta: 1,
      Güclü: 1.2,
    };

    const durationCoefficients = {
      0: 0.5,
      1: 0.7,
      2: 1,
      3: 1.2,
      4: 1.5,
      5: 2,
    };

    const educationCosts = {
      "İnnab-da": 2000,
      Özüm: 1000,
      "Digər kurslarda": 1500,
    };

    const averageSalary = fieldSalaries[values.field];
    const educationCoefficient = educationCoefficients[values.educationType];
    const experienceCoefficient =
      values.experience >= 10
        ? experienceCoefficients[5]
        : values.experience >= 5
        ? experienceCoefficients[4]
        : values.experience >= 3
        ? experienceCoefficients[3]
        : values.experience >= 1
        ? experienceCoefficients[2]
        : experienceCoefficients[1];
    const languageCoefficient = languageCoefficients[values.language];
    const durationCoefficient =
      values.duration >= 6
        ? durationCoefficients[5]
        : values.duration >= 3
        ? durationCoefficients[4]
        : values.duration >= 1
        ? durationCoefficients[3]
        : durationCoefficients[1];

    const futureSalary =
      averageSalary *
      educationCoefficient *
      experienceCoefficient *
      languageCoefficient *
      durationCoefficient;

    const futurePositions = {
      "Frontend Developer": [
        "Frontend developer",
        "Software developer",
        "Software engineer",
        "Mobile FrontEnd Developer",
        "Web developer",
        "UI/UX developer",
        "IT project manager",
      ],
      "Data Analitika": ["Data analyst", "Business analyst"],
      Mühasibatlıq: ["Accountant", "Financial analyst"],
    };

    const foreignWorkPercentage = futureSalary > 1000 ? 45 : 25;

    // Calculate the investment payback period
    const totalInvestment =
      educationCosts[values.educationType] * educationCoefficient;
    const averageMonthlySalary = futureSalary / 12;
    const investmentPaybackPeriod = (
      totalInvestment / averageMonthlySalary
    ).toFixed(2);

    onResults({
      futureSalary: futureSalary.toFixed(2),
      futurePositions: futurePositions[values.field],
      foreignWorkPercentage,
      investmentPaybackPeriod: investmentPaybackPeriod,
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, setFieldValue }) => {
        useEffect(() => {
          if (values.experience !== initialValues.experience) {
            calculateResults(values);
          }
        }, [values.experience]);

        return (
          <Form className="flex flexDirectionColumn">
            <div className={`${styles.formGroup}`}>
              <Field as="select" name="field" id="field">
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Data Analitika">Data Analitika</option>
                <option value="Mühasibatlıq">Mühasibatlıq</option>
              </Field>
              <ErrorMessage name="field" component="span" className="error" />
            </div>

            <div className={`${styles.formGroup} flex flexDirectionColumn`}>
              <h4>Necə öyrənəcəksən?</h4>
              <div
                className={`${styles.formGroupWrapper} flex alignItemsCenter justifyContentBetween`}
                role="group"
                aria-labelledby="educationType"
              >
                <label
                  htmlFor="educationType"
                  className="flex alignItemsCenter"
                >
                  <Field type="radio" name="educationType" value="İnnab-da" />
                  İnnab-da
                </label>
                <label
                  htmlFor="educationType"
                  className="flex alignItemsCenter"
                >
                  <Field type="radio" name="educationType" value="Özüm" />
                  Özüm
                </label>
                <label
                  htmlFor="educationType"
                  className="flex alignItemsCenter"
                >
                  <Field
                    type="radio"
                    name="educationType"
                    value="Digər kurslarda"
                  />
                  Digər kurslarda
                </label>
              </div>
              <ErrorMessage
                name="educationType"
                component="span"
                className="error"
              />
            </div>

            <div className={`${styles.formGroup}`}>
              <div>
                <label>Gündə neçə saat məşğul olacaqsan?</label>
                <div className="flex justifyContentBetween">
                  <span>{values.duration}</span>
                  <span>saat</span>
                </div>
                <Box>
                  <PrettoSlider
                    value={values.duration}
                    onChange={(_, value) => setFieldValue("duration", value)}
                    aria-label="pretto slider"
                    min={0}
                    max={24}
                    step={1}
                  />
                </Box>
              </div>
              <ErrorMessage
                name="duration"
                component="span"
                className="error"
              />
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
                  <Field type="radio" name="language" value="Zəif" />
                  Zəif
                </label>
                <label htmlFor="language" className="flex alignItemsCenter">
                  <Field type="radio" name="language" value="Orta" />
                  Orta
                </label>
                <label htmlFor="language" className="flex alignItemsCenter">
                  <Field type="radio" name="language" value="Güclü" />
                  Güclü
                </label>
              </div>
              <ErrorMessage
                name="language"
                component="span"
                className="error"
              />
            </div>

            <div className={`${styles.formGroup}`}>
              <div>
                <label>Neçə il təcrübən var?</label>
                <div className="flex justifyContentBetween">
                  <span>{values.experience}</span>
                  <span>il</span>
                </div>
                <Box>
                  <PrettoSlider
                    value={values.experience}
                    onChange={(_, value) => setFieldValue("experience", value)}
                    aria-label="pretto slider"
                    min={0}
                    max={10}
                    step={1}
                  />
                </Box>
              </div>
              <ErrorMessage
                name="experience"
                component="span"
                className="error"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CareerForm;
