import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ContactDetails from "../contactDetails";
import SocialNetworks from "../SocialNetworks";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { fetchSiteInfos } from "../../features/siteInfos/siteInfoSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const { infos, status, error } = useSelector((state) => state.infos);

  useEffect(() => {
    dispatch(fetchSiteInfos(lang));
  }, [lang, dispatch]);

  return (
    <footer>
      <div className="footerTop">
        <div className="container">
          <div className="footerTopWrapper flex justifyContentBetween">
            <div>
              <h5>Linklər</h5>
              <ul className="flex flexDirectionColumn">
                <li>
                  <Link to="about">Haqqımızda</Link>
                </li>
                <li>
                  <Link to="about">Onlayn qeydiyyat</Link>
                </li>
                <li>
                  <Link to="coorperative">Korporativ təlimlərimiz</Link>
                </li>
                <li>
                  <Link to="trainings">Data analitika</Link>
                </li>
                <li>
                  <Link to="trainings">Mühasibatlıq</Link>
                </li>
                <li>
                  <Link to="trainings">Kompüter bilikləri</Link>
                </li>
                <li>
                  <Link to="career-center">İnsan resursları</Link>
                </li>
                <li>
                  <Link to="trainings">Digər təlimlər</Link>
                </li>
                <li>
                  <Link to="privacy-policy">Məxfilik siyasəti</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5>Ünvan</h5>
              <div>
                <p>{infos.address}</p>
              </div>
            </div>
            <div>
              <h5>Əlaqə</h5>
              <ContactDetails email />
            </div>
            <div>
              <h5>Bizi izləyin</h5>
              <SocialNetworks gap={"2.4rem"} />
              {status === "loading" && (
                <Box sx={{ width: "100%" }}>
                  <CircularProgress
                    sx={{ width: "2rem !important", height: "2rem !important" }}
                  />
                </Box>
              )}
              {status === "failed" && <p>{error}</p>}
              {status === "succeeded" && (
                <div className="footerLogo">
                  <img src={infos.header_footer} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footerCopy">
        <div className="container">
          <p>© 2024 INNAB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
