import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import ContactDetails from "../contactDetails";
import SocialNetworks from "../SocialNetworks";

const Footer = () => {
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
                <p>
                  Nərimanov rayonu, Fətəli Xan Xoyski 118 A (Talassemiya
                  Mərkəzinin yanında, Gənclik və Nərimanov metrolarının
                  yaxınlığında)
                </p>
              </div>
            </div>
            <div>
              <h5>Əlaqə</h5>
              <ContactDetails email />
            </div>
            <div>
              <h5>Bizi izləyin</h5>
              <SocialNetworks gap={"2.4rem"} />
              <div className="footerLogo">
                <img src={logo} alt="" />
              </div>
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
