import React from "react";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import VacanciesPage from "./pages/VacanciesPage";
import TrainingsPage from "./pages/TrainingsPage";
import CareerCenter from "./pages/CareerCenter";
import VideoLessons from "./pages/VideoLessons";
import BlogPage from "./pages/BlogPage";
import NewsPage from "./pages/NewsPage";
import NewsDetail from "./pages/NewsDetail";
import SeminarWebinar from "./pages/SeminarWebinar";
import InternShips from "./pages/InternShips";
import CareerCalculator from "./pages/CareerCalculator";
import Corporative from "./pages/Corporative";
import NotFoundPage from "./pages/NotFoundPage";
import DetailPage from "./pages/DetailPage";
import Projects from "./pages/Projects";
import ContactPage from "./pages/ContactPage";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about">
            <Route index element={<About />} />
            <Route path="vacancies" element={<VacanciesPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          <Route path="trainings" element={<TrainingsPage />} />
          <Route path="corporative" element={<Corporative />} />
          <Route path="projects" element={<Projects />} />
          <Route path="career-center" element={<CareerCenter />} />

          <Route path="useful-for-you">
            <Route path="video-lessons">
              <Route index element={<VideoLessons />} />
              <Route path=":id" element={<DetailPage />} />
            </Route>
            <Route path="blog">
              <Route index element={<BlogPage />} />
              <Route path=":id" element={<DetailPage />} />
            </Route>
            <Route path="career-calculator" element={<CareerCalculator />} />
            <Route path="seminar-and-webinar" element={<SeminarWebinar />} />
            <Route path="internships" element={<InternShips />} />
          </Route>

          <Route path="news">
            <Route index element={<NewsPage />} />
            <Route path=":id" element={<NewsDetail />} />
          </Route>

          <Route path="/privacy-policy" element={<Privacy />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
