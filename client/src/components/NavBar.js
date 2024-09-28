import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faComments } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ handleAddClick }) => {
  return (
    <nav className="navbar">
      <p className="navbar-title">
        <span className="sok">SOK!</span>
        <span className="bam">BAM!</span>
        <span className="pow">POW!</span>
        <span className="database">DATABASE</span>
      </p>
      <button className="add-comic-button" onClick={handleAddClick}>
        <span className="icon">
          <FontAwesomeIcon
            icon={faComments}
            data-fa-transform="shrink-9 up-2"
          />
          <FontAwesomeIcon icon={faBook} data-fa-transform="shrink-9 up-2" />
        </span>
        Add Comic
      </button>
    </nav>
  );
};

export default Navbar;
