// src/components/Layout.js
import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchBlogPosts } from "../../features/blog/blogSlice";
import { useDispatch } from "react-redux";

const MainLayout = () => {
  const partnersRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <>
      <Header
        partnersRef={partnersRef}
        onLanguageChange={(lang) => dispatch(fetchBlogPosts(lang))}
      />

      <main>
        <Outlet context={{ partnersRef }} />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
