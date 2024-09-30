import React, { forwardRef, memo } from "react";
import SectionTitle from "../SectionTitle";
import styles from "./customers.module.css";
import CustomerCard from "../CustomerCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useParams } from "react-router";
import { useGetCustomers } from "../../features/customers/useGetCustomers";
import { Box, Skeleton } from "@mui/material";
import CustomerSlider from "../sliders/customerSlider";
// import GoogleReviews from "../googleReviews";
import { useTranslations } from "../../features/translations/translations";

const Customers = memo(
  forwardRef(({ homepage, about, corporative }, ref) => {
    const { lang } = useParams();
    const { data: customers, status, error } = useGetCustomers(lang);
    const { width } = useWindowDimensions();
    const { data: translations, isLoading } = useTranslations("site");

    const getTranslation = (keyword) => {
      const translation = translations.find((item) => item.keyword === keyword);
      return translation ? translation.value[lang] : keyword;
    };

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
              translations && getTranslation("home_customers_title")
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
              translations && getTranslation("customers_text")
            )}
          </p>
        </div>
        {status === "pending" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={300}
              className="customerCard"
            />
          </Box>
        )}
        {status === "error" && <Box>{error}</Box>}
        <div className={styles.customerSliderWrapper}>
          {status === "success" && (
            <>
              {corporative && width > 768 ? (
                <div className="container">
                  <div className="customerCard">
                    {customers.map((customer) => (
                      <CustomerCard
                        img={customer.image}
                        key={customer.id}
                        to={customer.link}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <CustomerSlider customers={customers} />
              )}
            </>
          )}
        </div>
        {/* {homepage && <GoogleReviews />} */}
      </section>
    );
  })
);

export default Customers;
