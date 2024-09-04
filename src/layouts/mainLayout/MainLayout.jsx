// src/components/Layout.js
import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = () => {
  const partnersRef = useRef(null);

  return (
    <>
      <Header partnersRef={partnersRef} />

      <main>
        <Outlet context={{ partnersRef }} />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
