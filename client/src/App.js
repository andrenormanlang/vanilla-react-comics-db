import React, { useState, useEffect } from "react";
import ComicsForm from "../src/components/ComicsForm";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "./components/NavBar";

function App() {
  const [comics, setComics] = useState([]);
  const [comicToEdit, setComicToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isClosing, setIsClosing] = useState(false); 
  const [comicToDelete, setComicToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  /* For local development */
  // // Fetch comics from the server
  // useEffect(() => {
  //   axios.get("http://localhost:5000/comics").then((response) => {
  //     // Ensure `read` is treated as a boolean
  //     const comicsWithBooleans = response.data.map(comic => ({
  //       ...comic,
  //       read: comic.read === "true" || comic.read === true // Ensure proper boolean conversion
  //     }));
  //     setComics(comicsWithBooleans);
  //   });
  // }, []);

  // const addComic = (comic) => {
  //   axios.post("http://localhost:5000/comics", comic).then((response) => {
  //     setComics([...comics, response.data]);
  //     setIsModalOpen(false);
  //   });
  // };

  // const editComic = (updatedComic) => {
  //   axios
  //     .put(`http://localhost:5000/comics/${updatedComic.id}`, updatedComic)
  //     .then((response) => {
  //       setComics(
  //         comics.map((comic) =>
  //           comic.id === updatedComic.id ? response.data : comic
  //         )
  //       );
  //       setComicToEdit(null);
  //       setIsModalOpen(false);
  //     });
  // };

  // const toggleReadStatus = (id) => {
  //   const updatedComics = comics.map((comic) =>
  //     comic.id === id ? { ...comic, read: !comic.read } : comic
  //   );
  //   setComics(updatedComics);

  //   // Update the backend
  //   const updatedComic = updatedComics.find(comic => comic.id === id);
  //   axios.put(`http://localhost:5000/comics/${id}`, updatedComic);
  // };

  // const confirmDeleteComic = () => {
  //   if (comicToDelete) {
  //     axios
  //       .delete(`http://localhost:5000/comics/${comicToDelete.id}`)
  //       .then(() => {
  //         setComics(comics.filter((comic) => comic.id !== comicToDelete.id));
  //         closeDeleteModal();
  //       });
  //   }
  // };

  // Fetch comics from the server
useEffect(() => {
  axios.get("http://comics-api:5000/comics").then((response) => {
    // Ensure `read` is treated as a boolean
    const comicsWithBooleans = response.data.map(comic => ({
      ...comic,
      read: comic.read === "true" || comic.read === true // Ensure proper boolean conversion
    }));
    setComics(comicsWithBooleans);
  });
}, []);

const addComic = (comic) => {
  axios.post("http://comics-api:5000/comics", comic).then((response) => {
    setComics([...comics, response.data]);
    setIsModalOpen(false);
  });
};

const editComic = (updatedComic) => {
  axios
    .put(`http://comics-api:5000/comics/${updatedComic.id}`, updatedComic)
    .then((response) => {
      setComics(
        comics.map((comic) =>
          comic.id === updatedComic.id ? response.data : comic
        )
      );
      setComicToEdit(null);
      setIsModalOpen(false);
    });
};

const toggleReadStatus = (id) => {
  const updatedComics = comics.map((comic) =>
    comic.id === id ? { ...comic, read: !comic.read } : comic
  );
  setComics(updatedComics);

  // Update the backend
  const updatedComic = updatedComics.find(comic => comic.id === id);
  axios.put(`http://comics-api:5000/comics/${id}`, updatedComic);
};

const confirmDeleteComic = () => {
  if (comicToDelete) {
    axios
      .delete(`http://comics-api:5000/comics/${comicToDelete.id}`)
      .then(() => {
        setComics(comics.filter((comic) => comic.id !== comicToDelete.id));
        closeDeleteModal();
      });
  }
};


  const handleDeleteClick = (comic) => {
    setComicToDelete(comic); 
    setIsDeleteModalOpen(true); 
  };

  const handleEditClick = (comic) => {
    setComicToEdit(comic);
    setIsModalOpen(true); 
  };

  const handleAddClick = () => {
    setComicToEdit(null); 
    setIsModalOpen(true); 
  };

  const openModal = () => {
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 500);
  };

  const closeDeleteModal = () => {
    setComicToDelete(null);
    setIsDeleteModalOpen(false);
  };

 

  return (
    <div className="app">
      <Navbar handleAddClick={handleAddClick} />

      <div className="container">
        <div className="comic-list">
          {comics.length > 0 ? (
            comics.map((comic) => (
              <div key={comic.id} className="card">
                <img className="comic-image" src={comic.imageUrl} alt={comic.title} />
                <div className="comic-content">
                  <h2>{comic.title} #{comic.issue}</h2>
                  
                  <p><strong>Release Year:</strong> {comic.year}</p>
                  <p><strong>Rating:</strong> {comic.rating}/10</p>
                  <p>{comic.description}</p>
                </div>
                <div className="button-container">
                  <button onClick={() => handleEditClick(comic)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>

                  {/* Toggle Read Status */}
                  <label className="read-checkbox">
                    <input
                      type="checkbox"
                      checked={comic.read} 
                      onChange={() => toggleReadStatus(comic.id)}
                    />
                    <span>READ ALREADY?</span>
                  </label>

                  <button onClick={() => handleDeleteClick(comic)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-comics-message">No comics added yet.</p>
          )}
        </div>
      </div>

      {/* Modal for ComicForm */}
      {isModalOpen && (
        <div className={`modal ${isClosing ? "hide" : "show"}`}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal show">
          <div className="modal-content">
            <p className="delete-text">
              Are you sure you want to delete the comic "
              <strong>{comicToDelete?.title} #{comicToDelete?.issue}</strong>"?
            </p>
            <div className="button-container">
              <button onClick={confirmDeleteComic}>Yes, Delete</button>
              <button onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
