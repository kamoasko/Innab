import React, { forwardRef, useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import styles from "./customers.module.css";
import CustomerCard from "../CustomerCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCustomers } from "../../features/customers/customerSlice";
import { Box, CircularProgress } from "@mui/material";
import CustomerSlider from "../sliders/customerSlider";
import GoogleReviews from "../googleReviews";

const Customers = forwardRef(({ homepage, about, corporative }, ref) => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { customers, status, error } = useSelector((state) => state.customers);
  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch(fetchCustomers(lang));
  }, [lang, dispatch]);

  return (
    <section className={styles.customers} ref={ref}>
      <SectionTitle
        about={about}
        title={"Müştərilərimiz"}
        corporative={corporative}
      />
      <div className={styles.customersText}>
        <p>
          Bank, Sığorta, FMCG, Neft, İT, Təhsil və digər sektorlardan 200-dən
          çox şirkət əməkdaşlarının peşəkar inkişafında etibarlı tərəfdaş olaraq
          İnnabı seçmiş və bizim təlim proqramlarımız və xidmətlərimizdən
          faydalanmışdır.
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
