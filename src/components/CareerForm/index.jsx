import { useEffect } from "react";
import styles from "../../pages/CareerCalculator/calculator.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Skeleton, Slider, styled } from "@mui/material";
import { useCalcDatas } from "../../features/calculator/useCalculator";
import { useParams } from "react-router";
import { useTranslations } from "../../features/translations/translations";

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
  const { lang } = useParams();
  const { data: calcDatas } = useCalcDatas(lang);
  const { data: translations, isLoading } = useTranslations("site");
  const getTranslation = (keyword) => {
    const translation = translations.find((item) => item.keyword === keyword);
    return translation ? translation.value[lang] : keyword;
  };

  const initialValues = {
    field: "",
    educationType: "",
    // duration: 2,
    language: "",
    computer: "",
    experience: 0,
  };

  const validationSchema = Yup.object({
    field: Yup.string().required(
      translations && getTranslation("profession_validation")
    ),
    educationType: Yup.string().required(
      translations && getTranslation("where_validation")
    ),
    // duration: Yup.number().required("Required"),
    language: Yup.string().required(
      translations && getTranslation("language_validation")
    ),
    computer: Yup.string().required(
      translations && getTranslation("computer_validation")
    ),
    experience: Yup.number().required(
      translations && getTranslation("experience_validation")
    ),
  });

  const calculateResults = (values) => {
    if (
      !values.field ||
      !values.educationType ||
      !values.language ||
      !values.computer ||
      values.experience === undefined ||
      values.experience === null
    ) {
      // Don't proceed if any required value is missing
      onResults(null);
      return;
    }

    const fieldSalaries =
      calcDatas &&
      calcDatas?.areas
        ?.map((area) => ({
          [area.area_name]: area.count,
        }))
        ?.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const educationCoefficients = calcDatas && {
      "İnnab-da": calcDatas?.calculator?.where_innab,
      Özüm: calcDatas?.calculator?.where_own,
      "Digər kurslarda": calcDatas?.calculator?.where_other,
    };

    // const durationCoefficients = {
    //   0: 0.5,
    //   1: 0.7,
    //   2: 1,
    //   3: 1.25,
    //   4: 2,
    //   5: 3,
    // };

    const languageCoefficients = calcDatas && {
      Zəif: calcDatas?.calculator?.english_elementry,
      Orta: calcDatas?.calculator?.english_medium,
      Güclü: calcDatas?.calculator?.english_hard,
    };

    const computerCoefficients = calcDatas && {
      Zəif: calcDatas?.calculator?.comp_elementry,
      Orta: calcDatas?.calculator?.comp_medium,
      Güclü: calcDatas?.calculator?.comp_hard,
    };

    const experienceCoefficients = calcDatas && {
      0: calcDatas?.calculator?.experience_0,
      1: calcDatas?.calculator?.experience_0_1,
      2: calcDatas?.calculator?.experience_1_3,
      3: calcDatas?.calculator?.experience_3_5,
      4: calcDatas?.calculator?.experience_5_10,
      5: calcDatas?.calculator?.experience_10_plus,
    };

    const educationCosts = {
      "İnnab-da": 800,
      Özüm: 600,
      "Digər kurslarda": 2000,
    };

    let averageSalary = fieldSalaries[values.field] || 0;
    let educationCoefficient = educationCoefficients[values.educationType] || 1;
    let languageCoefficient = languageCoefficients[values.language] || 1;
    let computerCoefficient = computerCoefficients[values.computer] || 1;
    let experienceCoefficient = 1;

    if (values.experience >= 10) {
      experienceCoefficient = experienceCoefficients[5];
    } else if (values.experience >= 5) {
      experienceCoefficient = experienceCoefficients[4];
    } else if (values.experience >= 3) {
      experienceCoefficient = experienceCoefficients[3];
    } else if (values.experience >= 1) {
      experienceCoefficient = experienceCoefficients[2];
    } else {
      experienceCoefficient = experienceCoefficients[1];
    }

    educationCoefficient = Number(educationCoefficient) || 1;
    languageCoefficient = Number(languageCoefficient) || 1;
    computerCoefficient = Number(computerCoefficient) || 1;
    experienceCoefficient = Number(experienceCoefficient) || 1;
    // const durationCoefficient =
    //   values.duration >= 6
    //     ? durationCoefficients[5]
    //     : values.duration >= 3
    //     ? durationCoefficients[4]
    //     : values.duration >= 1
    //     ? durationCoefficients[3]
    //     : durationCoefficients[1];

    const futureSalary =
      averageSalary *
      educationCoefficient *
      experienceCoefficient *
      languageCoefficient *
      computerCoefficient;
    // durationCoefficient;

    // const futurePositions =
    //   calcDatas &&
    //   calcDatas?.areas
    //     ?.map((area) => ({
    //       [area.area_name]: area.children?.map((child) => child.area_name),
    //     }))
    //     ?.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    // const foreignWorkPercentage = futureSalary > 1000 ? 45 : 25;

    const totalInvestment =
      educationCosts[values.educationType] * educationCoefficient;
    const averageYearlySalary = futureSalary;
    const investmentPaybackPeriod = (
      totalInvestment / averageYearlySalary
    ).toFixed(1);

    onResults({
      futureSalary: futureSalary.toFixed(2),
      // futurePositions: futurePositions[values.field],
      // foreignWorkPercentage,
      investmentPaybackPeriod: investmentPaybackPeriod,
    });
  };

  const onSubmit = (values) => {
    calculateResults(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isValid, handleSubmit }) => {
        useEffect(() => {
          if (isValid) {
            calculateResults(values);
          } else {
            onResults(null);
          }
        }, [values, isValid]);

        const handleExperienceChange = (_, value) => {
          setFieldValue("experience", value);
          handleSubmit();
        };

        return (
          <Form className="flex flexDirectionColumn">
            <div className={`${styles.formGroup}`}>
              <Field as="select" name="field" id="field">
                <option value="" hidden>
                  {translations && getTranslation("select_field")}
                </option>
                {calcDatas &&
                  calcDatas.areas?.map((area, index) => (
                    <option key={index} value={area.area_name}>
                      {area.area_name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="field" component="span" className="error" />
            </div>

            <div className={`${styles.formGroup} flex flexDirectionColumn`}>
              <h4>
                {isLoading && (
                  <Skeleton variant="text" height={20} width={"100%"} />
                )}
                {translations && getTranslation("how_to_learn")}
              </h4>
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
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("in_innab")}
                </label>
                <label
                  htmlFor="educationType"
                  className="flex alignItemsCenter"
                >
                  <Field type="radio" name="educationType" value="Özüm" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("myself")}
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
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("other_courses")}
                </label>
              </div>
              <ErrorMessage
                name="educationType"
                component="span"
                className="error"
              />
            </div>

            {/* <div className={`${styles.formGroup}`}>
              <div>
                <label>
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("how_many_works")}
                </label>
                <div className="flex justifyContentBetween">
                  <span>{values.duration}</span>
                  <span>
                    {isLoading && (
                      <Skeleton variant="text" height={20} width={"100%"} />
                    )}
                    {translations && getTranslation("hour")}
                  </span>
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
            </div>  */}

            <div
              className={`${styles.formGroup} flex flexDirectionColumn`}
              role="group"
              aria-labelledby="language"
            >
              <h4>
                {isLoading && (
                  <Skeleton variant="text" height={20} width={"100%"} />
                )}
                {translations && getTranslation("english_knowledge")}
              </h4>
              <div
                className={`${styles.formGroupWrapper} flex alignItemsCenter justifyContentBetween`}
              >
                <label htmlFor="language" className="flex alignItemsCenter">
                  <Field type="radio" name="language" value="Zəif" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("beginner")}
                </label>
                <label htmlFor="language" className="flex alignItemsCenter">
                  <Field type="radio" name="language" value="Orta" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("intermediate")}
                </label>
                <label htmlFor="language" className="flex alignItemsCenter">
                  <Field type="radio" name="language" value="Güclü" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("advanced")}
                </label>
              </div>
              <ErrorMessage
                name="language"
                component="span"
                className="error"
              />
            </div>

            <div
              className={`${styles.formGroup} flex flexDirectionColumn`}
              role="group"
              aria-labelledby="computer"
            >
              <h4>
                {isLoading && (
                  <Skeleton variant="text" height={20} width={"100%"} />
                )}
                {translations && getTranslation("computer_knowledge")}
              </h4>
              <div
                className={`${styles.formGroupWrapper} flex alignItemsCenter justifyContentBetween`}
              >
                <label htmlFor="computer" className="flex alignItemsCenter">
                  <Field type="radio" name="computer" value="Zəif" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("beginner")}
                </label>
                <label htmlFor="computer" className="flex alignItemsCenter">
                  <Field type="radio" name="computer" value="Orta" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("intermediate")}
                </label>
                <label htmlFor="computer" className="flex alignItemsCenter">
                  <Field type="radio" name="computer" value="Güclü" />
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("advanced")}
                </label>
              </div>
              <ErrorMessage
                name="computer"
                component="span"
                className="error"
              />
            </div>

            <div className={`${styles.formGroup}`}>
              <div>
                <label>
                  {isLoading && (
                    <Skeleton variant="text" height={20} width={"100%"} />
                  )}
                  {translations && getTranslation("experience")}
                </label>
                <div className="flex justifyContentBetween">
                  <span>{values.experience}</span>
                  <span>
                    {isLoading && (
                      <Skeleton variant="text" height={20} width={"100%"} />
                    )}
                    {translations && getTranslation("year")}
                  </span>
                </div>
                <Box>
                  <PrettoSlider
                    value={values.experience}
                    onChange={handleExperienceChange}
                    aria-label="Experience slider"
                    min={0}
                    max={15}
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
