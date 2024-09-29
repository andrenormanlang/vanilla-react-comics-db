import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faComments, faPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ handleAddClick }) => {
  return (
    <nav className="navbar">
      <p className="navbar-title">
        <span className="sok">Dre´s</span>
        <span className="bam">COMICS</span>
        <span className="pow">LIST</span>
        <span className="database">DB</span>
      </p>
      <button className="add-comic-button" onClick={handleAddClick}>
        <span className="icon">
        <FontAwesomeIcon icon={faPlus} size="lg" /> 
          <FontAwesomeIcon icon={faBook} data-fa-transform="shrink-9 up-2" />
          <FontAwesomeIcon
            icon={faComments}
            data-fa-transform="shrink-9 up-2"
          />
        </span>
        {/* Add Comic */}
      </button>
    </nav>
  );
};

export default Navbar;
