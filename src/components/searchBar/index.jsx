import React, { useState } from "react";
import { useTrainingCategories } from "../../features/categories/useCategory";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMenus } from "../../features/menus/useMenu";
import { useTranslations } from "../../features/translations/translations";

const SearchBar = ({ top, bottom, isOpen, onClose }) => {
  const { lang } = useParams();
  const { data: menus } = useMenus(lang);
  const { data: trainings } = useTrainingCategories(lang);
  const parentMenu = menus?.filter((menu) => menu.parent_id === 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const className = top ? `searchForm ${isOpen ? "open" : ""}` : "";
  const className2 = bottom ? `searchBar ${isOpen ? "open" : ""}` : "searchBar";

  const keywords = ["search_placeholder"];
  const { data: translations } = useTranslations(lang, "header", keywords);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = trainings
        ?.flatMap((category) =>
          category.subData?.map((training) => ({
            ...training,
            categorySlug: category.slug, // Store the parent category slug here
          }))
        )
        ?.filter(
          (training) =>
            training.top_text_title.toLowerCase().includes(query) ||
            training.slug.toLowerCase().includes(query) ||
            training.short_description.toLowerCase().includes(query)
        );
      setFilteredResults(results);
      setShowResults(true);
    } else {
      setFilteredResults([]);
      setShowResults(false);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setFilteredResults([]);
    setShowResults(false);
    onClose();
  };

  return (
    <form action="" className={className}>
      <div className={className2} id="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M8.12507 1.25C11.9221 1.25 15.0001 4.32821 15.0001 8.12536C15.0001 9.68585 14.4803 11.1249 13.6043 12.2788L18.4739 17.1542C18.8398 17.5205 18.8394 18.1141 18.4731 18.48C18.1068 18.8459 17.5132 18.8456 17.1473 18.4792L12.2783 13.6049C11.1245 14.4809 9.68549 15.0007 8.12507 15.0007C4.32807 15.0007 1.25 11.9225 1.25 8.12536C1.25 4.32821 4.32807 1.25 8.12507 1.25ZM8.12507 3.125C5.36363 3.125 3.125 5.36372 3.125 8.12536C3.125 10.887 5.36363 13.1257 8.12507 13.1257C10.8865 13.1257 13.1251 10.887 13.1251 8.12536C13.1251 5.36372 10.8865 3.125 8.12507 3.125Z"
            fill="currentColor"
          />
        </svg>

        <input
          type="search"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={translations && translations["search_placeholder"]}
        />
        <button type="button" name="" id="" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.71967 4.71967C5.01256 4.42678 5.48744 4.42678 5.78033 4.71967L10 8.93934L14.2197 4.71967C14.5126 4.42678 14.9874 4.42678 15.2803 4.71967C15.5732 5.01256 15.5732 5.48744 15.2803 5.78033L11.0607 10L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L10 11.0607L5.78033 15.2803C5.48744 15.5732 5.01256 15.5732 4.71967 15.2803C4.42678 14.9874 4.42678 14.5126 4.71967 14.2197L8.93934 10L4.71967 5.78033C4.42678 5.48744 4.42678 5.01256 4.71967 4.71967Z"
              fill="#333333"
            />
          </svg>
        </button>
      </div>
      {showResults && (
        <div className="searchResults">
          <div className="container">
            {filteredResults.length > 0 ? (
              <ul className="flex flexDirectionColumn">
                {filteredResults.map((training) => (
                  <li key={training.id}>
                    <Link
                      to={`${parentMenu[1]?.slug}/${training.categorySlug}/${training.slug}`}
                      className="flex alignItemsCenter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.12507 1.25C11.9221 1.25 15.0001 4.32821 15.0001 8.12536C15.0001 9.68585 14.4803 11.1249 13.6043 12.2788L18.4739 17.1542C18.8398 17.5205 18.8394 18.1141 18.4731 18.48C18.1068 18.8459 17.5132 18.8456 17.1473 18.4792L12.2783 13.6049C11.1245 14.4809 9.68549 15.0007 8.12507 15.0007C4.32807 15.0007 1.25 11.9225 1.25 8.12536C1.25 4.32821 4.32807 1.25 8.12507 1.25ZM8.12507 3.125C5.36363 3.125 3.125 5.36372 3.125 8.12536C3.125 10.887 5.36363 13.1257 8.12507 13.1257C10.8865 13.1257 13.1251 10.887 13.1251 8.12536C13.1251 5.36372 10.8865 3.125 8.12507 3.125Z"
                          fill="currentColor"
                        />
                      </svg>
                      {training.top_text_title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
