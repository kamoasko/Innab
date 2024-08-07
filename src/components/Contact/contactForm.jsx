import React from "react";
import styles from "./contact.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button";

const ContactForm = ({ apply, join }) => {
  const initialValues = apply
    ? {
        name: "",
        fin: "",
        date: "",
        phone: "",
        project: "",
        education: "",
        studentStatus: "",
        workStatus: "",
        voen: "",
        address: "",
        cv: null,
      }
    : {
        name: "",
        phone: "",
        email: "",
        formType: "Fərdi",
        service: "",
      };

  const validationSchema = apply
    ? Yup.object({
        name: Yup.string().required("Ad və Soyad tələb olunur"),
        fin: Yup.string().required("FIN tələb olunur"),
        date: Yup.date().required("Doğum tarixi tələb olunur"),
        phone: Yup.string().required("Telefon nömrəsi tələb olunur"),
        project: Yup.string().required("Layihə tələb olunur"),
        education: Yup.string().required("Təhsil tələb olunur"),
        studentStatus: Yup.string().required("Təhsil statusunuz tələb olunur"),
        workStatus: Yup.string().required("Is statusunuz tələb olunur"),
        voen: Yup.string().required("VÖEN tələb olunur"),
        address: Yup.string().required("Ünvan tələb olunur"),
        cv: Yup.mixed().required("CV tələb olunur"),
      })
    : Yup.object({
        name: Yup.string().required("Ad və Soyad tələb olunur"),
        phone: Yup.string().required("Telefon nömrəsi tələb olunur"),
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
        {({ setFieldValue }) => (
          <Form>
            <div
              className={`flex alignItemsCenter justifyContentBetween ${styles.contactFormDivider}`}
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

              {apply ? (
                <div className={`${styles.formGroup} flex flexDirectionColumn`}>
                  <label htmlFor="fin">
                    FIN <small>*</small>
                  </label>
                  <Field type="text" id="fin" name="fin" placeholder="FIN" />
                  <ErrorMessage name="fin" component="div" className="error" />
                </div>
              ) : (
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
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
              )}
            </div>

            <div
              className={`flex alignItemsCenter justifyContentBetween ${styles.contactFormDivider}`}
            >
              {apply ? (
                <div className={`${styles.formGroup} flex flexDirectionColumn`}>
                  <label htmlFor="date">
                    Doğum tarixi <small>*</small>
                  </label>
                  <Field type="date" id="date" name="date" />
                  <ErrorMessage name="date" component="div" className="error" />
                </div>
              ) : (
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
              )}

              {apply ? (
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
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
              ) : (
                <div className={`${styles.formGroup} flex flexDirectionColumn`}>
                  <label htmlFor="email">E-poçt</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="test@mail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
              )}
            </div>

            {apply ? (
              <>
                <div
                  className={`${styles.formGroup} ${styles.fgp} flex flexDirectionColumn`}
                >
                  <label>İştirak etmək istədiyiniz layihə</label>
                  <div
                    role="group"
                    aria-labelledby="project"
                    className={`${styles.formGroupTypes} flex flexDirectionColumn`}
                  >
                    <label>
                      <Field
                        type="radio"
                        name="project"
                        value="Data analitika"
                      />
                      Data analitika
                    </label>
                    <label>
                      <Field type="radio" name="project" value="Mühasibatlıq" />
                      Mühasibatlıq
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="project"
                        value="İnsan Resursları"
                      />
                      İnsan Resursları
                    </label>
                    <label>
                      <Field type="radio" name="project" value="SMM" />
                      SMM
                    </label>
                    <label>
                      <Field type="radio" name="project" value="Digər" />
                      <div className="flex">
                        Digər:
                        <Field type="text" name="projectOther" placeholder="" />
                      </div>
                    </label>
                  </div>
                  <ErrorMessage
                    name="project"
                    component="div"
                    className="error"
                  />
                </div>

                <div
                  className={`${styles.formGroup} ${styles.fgp} flex flexDirectionColumn`}
                >
                  <label>Təhsiliniz:</label>
                  <div
                    role="group"
                    aria-labelledby="education"
                    className={`${styles.formGroupTypes} flex flexDirectionColumn`}
                  >
                    <label>
                      <Field type="radio" name="education" value="Orta" />
                      Orta
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="education"
                        value="Orta ixtisas (peşə)"
                      />
                      Orta ixtisas (peşə)
                    </label>
                    <label>
                      <Field type="radio" name="education" value="Bakalavr" />
                      Bakalavr
                    </label>
                    <label>
                      <Field type="radio" name="education" value="Magistr" />
                      Magistr
                    </label>
                    <label>
                      <Field type="radio" name="education" value="Digər" />
                      <div className="flex">
                        Digər:
                        <Field
                          type="text"
                          name="educationOther"
                          placeholder=""
                        />
                      </div>
                    </label>
                  </div>
                  <ErrorMessage
                    name="education"
                    component="div"
                    className="error"
                  />
                </div>

                <div
                  className={`${styles.formGroup} ${styles.fgp} flex flexDirectionColumn`}
                >
                  <label>Hal-hazırda tələbəsinizmi?</label>
                  <div
                    role="group"
                    aria-labelledby="studentStatus"
                    className={`${styles.formGroupTypes} flex flexDirectionColumn`}
                  >
                    <label>
                      <Field type="radio" name="studentStatus" value="Bəli" />
                      Bəli
                    </label>
                    <label>
                      <Field type="radio" name="studentStatus" value="Xeyr" />
                      Xeyr
                    </label>
                    <label>
                      <Field type="radio" name="studentStatus" value="Digər" />
                      <div className="flex">
                        Digər:
                        <Field
                          type="text"
                          name="studentStatusOther"
                          placeholder=""
                        />
                      </div>
                    </label>
                  </div>
                  <ErrorMessage
                    name="studentStatus"
                    component="div"
                    className="error"
                  />
                </div>

                <div
                  className={`${styles.formGroup} ${styles.fgp} flex flexDirectionColumn`}
                >
                  <label>Hal-hazırda işləyirsinizmi?</label>
                  <div
                    role="group"
                    aria-labelledby="workStatus"
                    className={`${styles.formGroupTypes} flex flexDirectionColumn`}
                  >
                    <label>
                      <Field type="radio" name="workStatus" value="Bəli" />
                      Bəli
                    </label>
                    <label>
                      <Field type="radio" name="workStatus" value="Xeyr" />
                      Xeyr
                    </label>
                    <label>
                      <Field type="radio" name="workStatus" value="Digər" />
                      <div className="flex">
                        Digər:
                        <Field
                          type="text"
                          name="workStatusOther"
                          placeholder=""
                        />
                      </div>
                    </label>
                  </div>
                  <ErrorMessage
                    name="workStatus"
                    component="div"
                    className="error"
                  />
                </div>

                <div
                  className={`${styles.formGroup} ${styles.fgp} flex flexDirectionColumn`}
                >
                  <label>Adınıza aktiv VÖEN varmı?</label>
                  <div
                    role="group"
                    aria-labelledby="voen"
                    className={`${styles.formGroupTypes} flex flexDirectionColumn`}
                  >
                    <label>
                      <Field type="radio" name="voen" value="Bəli" />
                      Bəli
                    </label>
                    <label>
                      <Field type="radio" name="voen" value="Xeyr" />
                      Xeyr
                    </label>
                    <label>
                      <Field type="radio" name="voen" value="Digər" />
                      <div className="flex">
                        Digər:
                        <Field type="text" name="voenOther" placeholder="" />
                      </div>
                    </label>
                  </div>
                  <ErrorMessage name="voen" component="div" className="error" />
                </div>

                <div
                  className={`${styles.formGroup} ${styles.adress} flex flexDirectionColumn`}
                >
                  <label htmlFor="address">
                    Faktiki yaşadığınız ünvan <small>*</small>
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder=""
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>

                <div
                  className={`${styles.formGroup} ${styles.upload} flex flexDirectionColumn`}
                >
                  <label>
                    CV-nizi əlavə edin <small>*</small>
                  </label>
                  <label htmlFor="cv" className="flexCenter">
                    <input
                      id="cv"
                      name="cv"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("cv", event.currentTarget.files[0]);
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.973 2.00006C13.2727 1.99968 13.5594 1.99932 13.8389 2.06642C14.0838 2.12521 14.3179 2.22218 14.5327 2.35377C14.7777 2.50395 14.9802 2.70697 15.1918 2.91911L19.581 7.30828L19.581 7.30829C19.7931 7.51989 19.9961 7.72241 20.1463 7.96747C20.2779 8.1822 20.3749 8.4163 20.4337 8.66119C20.5008 8.94066 20.5004 9.22742 20.5 9.52704L20.5 15.5386C20.5 16.4861 20.5 17.2518 20.4493 17.8722C20.3971 18.5115 20.2866 19.0754 20.0204 19.5977C19.5986 20.4256 18.9255 21.0987 18.0976 21.5206C17.5752 21.7868 17.0114 21.8973 16.3721 21.9495C15.7517 22.0002 14.9859 22.0002 14.0384 22.0002H10.9616C10.0141 22.0002 9.24834 22.0002 8.62792 21.9495C7.98863 21.8973 7.42481 21.7868 6.90244 21.5206C6.07453 21.0987 5.40142 20.4256 4.97957 19.5977C4.71341 19.0754 4.60291 18.5115 4.55067 17.8722C4.49998 17.2518 4.49999 16.4861 4.5 15.5386V8.46176C4.49999 7.51426 4.49998 6.7485 4.55067 6.12808C4.60291 5.48879 4.71341 4.92497 4.97957 4.40261C5.40142 3.57469 6.07453 2.90158 6.90244 2.47974C7.42481 2.21358 7.98863 2.10307 8.62792 2.05084C9.24834 2.00015 10.0141 2.00015 10.9616 2.00016L12.973 2.00006ZM11 3.80013L12.5 3.80012V5.93554C12.5 6.46541 12.5 6.9166 12.5302 7.28703C12.562 7.67619 12.6317 8.05478 12.8161 8.41671C13.0941 8.96238 13.5378 9.40603 14.0834 9.68406C14.4454 9.86847 14.824 9.93811 15.2131 9.9699C15.5835 10.0002 16.0347 10.0002 16.5646 10.0001H16.5646H16.5646L18.7 10.0001V14.5001L18.7 15.5002C18.7 16.4951 18.6993 17.1872 18.6553 17.7257C18.6122 18.2536 18.5319 18.5542 18.4166 18.7805C18.1673 19.2698 17.7696 19.6675 17.2804 19.9168C17.0541 20.0321 16.7535 20.1123 16.2255 20.1555C15.687 20.1995 14.9949 20.2002 14 20.2002H11C10.0051 20.2002 9.31298 20.1995 8.7745 20.1555C8.24652 20.1123 7.94595 20.0321 7.71962 19.9168C7.2304 19.6675 6.83266 19.2698 6.58339 18.7805C6.46807 18.5542 6.38783 18.2536 6.3447 17.7257C6.3007 17.1872 6.3 16.4951 6.3 15.5002V8.50016C6.3 7.50522 6.3007 6.81314 6.3447 6.27466C6.38783 5.74668 6.46806 5.44611 6.58338 5.21979C6.83265 4.73057 7.2304 4.33282 7.71962 4.08355C7.94595 3.96823 8.24652 3.888 8.7745 3.84486C9.31298 3.80086 10.0051 3.80013 11 3.80013ZM14.3 4.57293L17.9272 8.20014H16.6C16.0251 8.20014 15.648 8.19944 15.3597 8.17588C15.0818 8.15318 14.9665 8.11382 14.9006 8.08025C14.6936 7.97479 14.5254 7.80651 14.4199 7.59953C14.3863 7.53364 14.347 7.41829 14.3243 7.14045C14.3007 6.85209 14.3 6.47504 14.3 5.90014V4.57293ZM8.49731 17.1044C8.49731 16.6074 8.90026 16.2044 9.39731 16.2044H12.5956C13.0927 16.2044 13.4956 16.6074 13.4956 17.1044C13.4956 17.6015 13.0927 18.0044 12.5956 18.0044H9.39731C8.90026 18.0044 8.49731 17.6015 8.49731 17.1044ZM9.39731 12.998C8.90026 12.998 8.49731 13.4009 8.49731 13.898C8.49731 14.395 8.90026 14.798 9.39731 14.798H14.5944C15.0915 14.798 15.4944 14.395 15.4944 13.898C15.4944 13.4009 15.0915 12.998 14.5944 12.998L9.39731 12.998Z"
                        fill="#3138E3"
                      />
                    </svg>
                    <span>Dosya yüklə</span>
                  </label>
                  <ErrorMessage name="cv" component="div" className="error" />
                </div>
              </>
            ) : (
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
                <ErrorMessage
                  name="service"
                  component="div"
                  className="error"
                />
              </div>
            )}

            <Button
              component
              title={apply ? "Göndər" : join ? "Təsdiq et" : "Müraciət et"}
              borderRadius={"7rem"}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
