import React, { forwardRef, useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import styles from "./customers.module.css";
import CustomerCard from "../CustomerCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCustomers } from "../../features/customers/customerSlice";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import CustomerSlider from "../sliders/customerSlider";
import GoogleReviews from "../googleReviews";
import { useTranslations } from "../../features/translations/translations";

const Customers = forwardRef(({ homepage, about, corporative }, ref) => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { customers, status, error } = useSelector((state) => state.customers);
  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch(fetchCustomers(lang));
  }, [lang, dispatch]);

  const keywords = ["home_customers_title", "customers_text"];
  const { data: translations, isLoading } = useTranslations(
    lang,
    "site",
    keywords
  );

  return (
    <section className={styles.customers} ref={ref}>
      <SectionTitle
        about={about}
        title={
          isLoading ? (
            <Skeleton
              variant="text"
              height={60}
              width={200}
              sx={{ margin: "0 auto" }}
            />
          ) : (
            translations && translations["home_customers_title"]
          )
        }
        corporative={corporative}
      />
      <div className={styles.customersText}>
        <p>
          {isLoading ? (
            <>
              <Skeleton
                variant="text"
                width={800}
                height={20}
                sx={{ margin: "0 auto" }}
              />
              <Skeleton
                variant="text"
                width={600}
                height={20}
                sx={{ margin: "0 auto" }}
              />
              <Skeleton
                variant="text"
                width={300}
                height={20}
                sx={{ margin: "0 auto" }}
              />
            </>
          ) : (
            translations && translations["customers_text"]
          )}
        </p>
      </div>
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && <Box>{error}</Box>}
      <div className={styles.customerSliderWrapper}>
        {status === "succeeded" && (
          <>
            {corporative && width > 768 ? (
              <div className="container">
                <div className="customerCard">
                  {customers.map((customer) => (
                    <CustomerCard img={customer.image} key={customer.id} />
                  ))}
                </div>
              </div>
            ) : (
              <CustomerSlider customers={customers} />
            )}
          </>
        )}
      </div>
      {homepage && <GoogleReviews />}
    </section>
  );
});

export default Customers;
