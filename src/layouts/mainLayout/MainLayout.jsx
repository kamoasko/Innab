import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = () => {
  const partnersRef = useRef(null);
  const trainingsRef = useRef(null);
  const projectsRef = useRef(null);
  const useFullRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);

  return (
    <>
      <Header
        partnersRef={partnersRef}
        trainingsRef={trainingsRef}
        projectsRef={projectsRef}
        useFullRef={useFullRef}
      />

      <main>
        <Outlet
          context={{ partnersRef, trainingsRef, projectsRef, useFullRef }}
        />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
