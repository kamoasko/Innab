import { useState } from "react";
import styles from "./calculator.module.css";
import CareerForm from "../../components/CareerForm";
import CareerResults from "../../components/CareerResults";
import PageTitle from "../../components/pageTitle";
import suitcase from "../../assets/icons/money-suitcase.svg";
import Contact from "../../components/Contact";

const CareerCalculator = () => {
  const [results, setResults] = useState(null);

  const handleResults = (data) => {
    setResults(data);
  };

  return (
    <>
      <div className="pageTop">
        <div className="container">
          <PageTitle title={"Karyera kakulyatoru"} />
        </div>
      </div>
      <section className={styles.calculator}>
        <div className="container">
          <div className={`${styles.calculatorWrapper} flex`}>
            <div className={styles.calculatorForm}>
              <div className={`${styles.calculatorTitle} flex`}>
                <h2>
                  Gələcək <strong>maaşını</strong> hesabla
                </h2>
                <div>
                  <img src={suitcase} alt="" />
                </div>
              </div>
              <CareerForm onResults={handleResults} />
            </div>
            <div className={styles.calculatorResults}>
              <CareerResults results={results} />
            </div>
          </div>
        </div>
      </section>
      <Contact
        title={"Sualın var?"}
        subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
        apiEndpoint={"https://admin.innab.coder.az/api/contactform/post"}
      />
    </>
  );
};

export default CareerCalculator;
