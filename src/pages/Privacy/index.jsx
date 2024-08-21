import React, { Suspense, useEffect } from "react";
import styles from "./privacy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchPrivacyData } from "../../features/privacy/privacySlicer";
import { CircularProgress } from "@mui/material";

const Contact = React.lazy(() => import("../../components/Contact"));
const PageTitle = React.lazy(() => import("../../components/pageTitle"));

const Privacy = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { privacy, status, error } = useSelector((state) => state.privacy);

  useEffect(() => {
    dispatch(fetchPrivacyData(lang));
  }, [lang, dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <section className={styles.privacy}>
        <div className="container">
          {status === "loading" && <CircularProgress />}
          {status === "failed" && <p>{error}</p>}
          <PageTitle title={privacy.page_title} />
          <div
            className={styles.privacyContent}
            dangerouslySetInnerHTML={{ __html: privacy.text }}
          />
        </div>
      </section>
      <Contact
        title={"Sualın var?"}
        subTitle={"Hardan başlamaqda tərəddüd edirsənsə bizə zəng elə"}
      />
    </Suspense>
  );
};

export default Privacy;
