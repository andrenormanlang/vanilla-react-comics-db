import React from 'react';

const Navbar = ({ handleAddClick }) => {
  return (
    <nav className="navbar">
      <p className="navbar-title">Coms Database!</p>
      <button className="add-comic-button" onClick={handleAddClick}>Add Comic</button>
    </nav>
  );
};

export default Navbar;
