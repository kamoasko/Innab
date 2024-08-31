import styles from "../../pages/Homepage/home.module.css";
import { NavLink, Outlet } from "react-router-dom";

const TrainingLayout = () => {
  return (
    <>
      <nav className={styles.trainingsNavbar}>
        <ul
          className={`${styles.trainingsNavbarMenu} tnMenu flex alignItemsCenter justifyContentBetween`}
        >
          <li>
            <NavLink className="flexCenter flexDirectionColumn">
              <h3>Data analitika</h3> <span>&#123; inData &#125;</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="flexCenter flexDirectionColumn">
              <h3>Mühasibatlıq</h3> <span>&#123; inFinance &#125;</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="flexCenter flexDirectionColumn">
              <h3> Kompüter bilikləri</h3>
              <span>&#123; inOffice &#125;</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="flexCenter flexDirectionColumn">
              <h3>İnsan resursları</h3> <span>&#123; inHR &#125;</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="flexCenter flexDirectionColumn">
              <h3>Yumşaq səriştələr</h3>
              <span>&#123; İnSoftSkills &#125;</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="flexCenter flexDirectionColumn">
              <h3>Digər təlimlər</h3> <span>&#123; İnBusiness &#125;</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default TrainingLayout;
