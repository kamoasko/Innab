import React from "react";
import styles from "../Contact/contact.module.css";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const ContactDetails = ({ marginLeft, email }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {email ? (
        <ul
          className={`${styles.contactDetails} flex flexDirectionColumn`}
          style={{ marginLeft: marginLeft }}
        >
          <li className="flex flexDirectionColumn">
            <span>Fiziki şəxslər üçün</span>
            <span>
              Tel:<Link>(+994) 50 290 61 21</Link>
            </span>
          </li>
          <li className="flex flexDirectionColumn">
            <span>Korporativ müştərilər üçün</span>
            <span>
              Tel:<Link>(+994) 50 290 61 31</Link>
            </span>
          </li>
          <li className="flex flexDirectionColumn">
            <span>
              DMA, Technest, Qaçqınkom və digər dövlətlə əməkdaşlıq layihələri
              üçün
            </span>
            <span>
              Tel:<Link>(+994) 51 230 25 17</Link>
            </span>
          </li>
          <li className="flex flexDirectionColumn">
            <span>
              Tel:<Link to={"mailto:info@innab.org"}>info@innab.org</Link>
            </span>
          </li>
        </ul>
      ) : !email && width > 768 ? (
        <ul
          className={`${styles.contactDetails} flex flexDirectionColumn`}
          style={{ marginLeft: marginLeft }}
        >
          <li className="flex flexDirectionColumn">
            <span>Fiziki şəxslər üçün</span>
            <span>
              Tel:<Link>(+994) 50 290 61 21</Link>
            </span>
          </li>
          <li className="flex flexDirectionColumn">
            <span>Korporativ müştərilər üçün</span>
            <span>
              Tel:<Link>(+994) 50 290 61 31</Link>
            </span>
          </li>
          <li className="flex flexDirectionColumn">
            <span>
              DMA, Technest, Qaçqınkom və digər dövlətlə əməkdaşlıq layihələri
              üçün
            </span>
            <span>
              Tel:<Link>(+994) 51 230 25 17</Link>
            </span>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default ContactDetails;
