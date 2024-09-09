import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import VacanciesPage from "./pages/VacanciesPage";
import ContactPage from "./pages/ContactPage";
import TrainingsPage from "./pages/TrainingsPage";
import Corporative from "./pages/Corporative";
import Projects from "./pages/Projects";
import CareerCenter from "./pages/CareerCenter";
import VideoLessons from "./pages/VideoLessons";
import BlogPage from "./pages/BlogPage";
import CareerCalculator from "./pages/CareerCalculator";
import SeminarWebinar from "./pages/SeminarWebinar";
import NewsPage from "./pages/NewsPage";
import NewsDetail from "./pages/NewsDetail";
import Privacy from "./pages/Privacy";
import NotFoundPage from "./pages/NotFoundPage";
import DetailPage from "./pages/DetailPage";
import VideoGrid from "./components/videosGrid";
import BlogGrid from "./components/blogGrid";
import Scholarships from "./pages/Scholarship";

export const generateRoutes = (menuData, lang) => {
  const parentMenu = menuData?.filter((menu) => menu.parent_id === 0);
  const aboutMenu = menuData?.filter((menu) => menu.parent_id === 3);
  const usefulMenu = menuData?.filter((menu) => menu.parent_id === 8);

  const routes = [
    {
      path: "/",
      element: <Navigate to={`${lang}`} replace />,
    },
    {
      path: `:lang`,
      element: <MainLayout />,
      children: [
        { path: "", element: <Homepage /> },
        {
          path: parentMenu[0]?.slug,
          children: [
            { path: "", element: <About /> },
            {
              path: aboutMenu[1]?.slug,
              element: <VacanciesPage />,
            },
            {
              path: aboutMenu[2]?.slug,
              element: <ContactPage />,
            },
          ],
        },

        {
          path: parentMenu[1]?.slug,
          children: [
            {
              path: ":slug/:trainingSlug",
              element: <TrainingsPage />,
            },
          ],
        },
        { path: parentMenu[2]?.slug, element: <Corporative /> },
        {
          path: parentMenu[3]?.slug,
          children: [{ path: ":slug", element: <Projects /> }],
        },
        {
          path: parentMenu[4]?.slug,
          children: [{ path: ":slug", element: <CareerCenter /> }],
        },
        {
          path: parentMenu[5]?.slug,
          children: [
            {
              path: usefulMenu[0]?.slug,
              children: [
                {
                  path: ":slug",
                  element: <VideoLessons />,
                  children: [{ path: "", element: <VideoGrid /> }],
                },
              ],
            },
            {
              path: usefulMenu[0]?.slug,
              children: [
                {
                  path: ":slug/:videoSlug",
                  element: <DetailPage pageTitle={"Video dərslər"} />,
                },
              ],
            },
            {
              path: usefulMenu[1]?.slug,
              children: [
                {
                  path: ":slug",
                  element: <BlogPage />,
                  children: [
                    { path: "", element: <BlogGrid /> },
                    {
                      path: ":blogSlug",
                      element: <DetailPage pageTitle={"Bloq"} blog />,
                    },
                  ],
                },
              ],
            },
            {
              path: usefulMenu[5]?.slug,
              element: <CareerCalculator />,
            },
            {
              path: usefulMenu[2]?.slug,
              element: <SeminarWebinar />,
            },
            {
              path: usefulMenu[4]?.slug,
              element: <SeminarWebinar workshop />,
            },
            {
              path: usefulMenu[3]?.slug,
              element: <Scholarships />,
            },
          ],
        },
        {
          path: parentMenu[7]?.slug,
          children: [
            { path: "", element: <NewsPage /> },
            { path: ":slug", element: <NewsDetail /> },
          ],
        },
        { path: parentMenu[9]?.slug, element: <Privacy /> },
        ,
      ].filter(Boolean),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  return routes;
};
