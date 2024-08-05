import React from "react";
import styles from "./contact.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button";

const ContactForm = () => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    formType: "Fərdi",
    service: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Ad və Soyad tələb olunur"),
    phone: Yup.string().required("Telefon nömrəsi tələb olunur"),
    // email: Yup.string()
    //   .email("Düzgün E-poçt daxil edin")
    //   .required("E-poçt tələb olunur"),
    // service: Yup.string().required("Xidmət tələb olunur"),
  });

  const handleSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div
            className={`flex alignItmesCenter justifyContentBetween ${styles.contactFormDivider}`}
          >
            <div className={`${styles.formGroup} flex flexDirectionColumn`}>
              <label htmlFor="name">
                Ad və Soyad <small>*</small>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="İslam Bağırlı"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className={`${styles.formGroup} flex flexDirectionColumn`}>
              <label htmlFor="phone">
                Telefon nömrəsi <small>*</small>
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="(99) - 999 - 99 - 99"
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
          </div>

          <div
            className={`flex alignItmesCenter justifyContentBetween ${styles.contactFormDivider}`}
          >
            <div className={`${styles.formGroup} flex flexDirectionColumn`}>
              <label>Müraciət formanız</label>
              <div
                role="group"
                aria-labelledby="formType"
                className={`${styles.formGroupTypes} flex alignItemsCenter`}
              >
                <label>
                  <Field type="radio" name="formType" value="Fərdi" />
                  Fərdi
                </label>
                <label>
                  <Field type="radio" name="formType" value="Korporativ" />
                  Korporativ
                </label>
              </div>
            </div>
            <div className={`${styles.formGroup} flex flexDirectionColumn`}>
              <label htmlFor="email">E-poçt</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="test@mail.com"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>

          <div className={`${styles.formGroup} flex flexDirectionColumn`}>
            <label htmlFor="service">
              İştirak etmək istədiyiniz təlim və ya xidmət
            </label>
            <Field as="select" id="service" name="service">
              <option value="BPMN təlimi">
                Biznes Proseslərinin İdarə edilməsi (BPMN) təlimi
              </option>
              <option value="Excel təlimi">Excel təlimi</option>
            </Field>
            <ErrorMessage name="service" component="div" className="error" />
          </div>

          <Button component title={"Müraciət et"} borderRadius={"7rem"} />
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
