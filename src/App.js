import React, { useState, useEffect } from "react";
import ComicsForm from "../src/components/ComicsForm";
import axios from "axios"; // Axios for API requests
import "./App.css"; // Styling using SCSS
import Navbar from "./components/NavBar";

function App() {
  const [comics, setComics] = useState([]);
  const [comicToEdit, setComicToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  // Fetch comics from the server
  useEffect(() => {
    axios.get("http://localhost:5000/comics").then((response) => {
      setComics(response.data);
    });
  }, []);

  const addComic = (comic) => {
    axios.post("http://localhost:5000/comics", comic).then((response) => {
      setComics([...comics, response.data]);
      setIsModalOpen(false); // Close the modal after submission
    });
  };

  const editComic = (updatedComic) => {
    axios.put(`http://localhost:5000/comics/${updatedComic.id}`, updatedComic).then((response) => {
      setComics(comics.map((comic) => (comic.id === updatedComic.id ? response.data : comic)));
      setComicToEdit(null);
      setIsModalOpen(false); // Close the modal after submission
    });
  };

  const deleteComic = (id) => {
    axios.delete(`http://localhost:5000/comics/${id}`).then(() => {
      setComics(comics.filter((comic) => comic.id !== id));
    });
  };

  const handleEditClick = (comic) => {
    setComicToEdit(comic);
    setIsModalOpen(true); // Open the modal when editing
  };

  const handleAddClick = () => {
    setComicToEdit(null); // Reset the form for adding a new comic
    setIsModalOpen(true); // Open the modal when adding a new comic
  };

  return (
    <div className="app">
      <Navbar handleAddClick={handleAddClick} />

      <div className="container">
      <div className="comic-list">
        {comics.length > 0 ? (
          comics.map((comic) => (
            <div key={comic.id} className=" card">
              
              <img
                className="comic-image"
                src={comic.imageUrl}
                alt={comic.title}
            
              />
               <div className="comic-content">
              <h2>{comic.title}</h2>
              <p><strong>Issue:</strong> {comic.issue}</p>
              <p><strong>Year:</strong> {comic.year}</p>
              <p><strong>Rating:</strong> {comic.rating}/10</p>
              <p><strong></strong> {comic.description}</p>
              </div>
              <div className="button-container">
              <button onClick={() => handleEditClick(comic)}>Edit</button>
              <button onClick={() => deleteComic(comic.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No comics added yet.</p>
        )}
      </div>
      </div>

      {/* Modal for ComicForm */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <ComicsForm
              addComic={addComic}
              editComic={editComic}
              comicToEdit={comicToEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
