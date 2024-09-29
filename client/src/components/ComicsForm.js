import React, { useState, useEffect } from "react";

function ComicsForm({ addComic, editComic, comicToEdit }) {
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [read, setRead] = useState(false); // New state for the read status

  useEffect(() => {
    if (comicToEdit) {
      setTitle(comicToEdit.title);
      setIssue(comicToEdit.issue);
      setYear(comicToEdit.year);
      setRating(comicToEdit.rating);
      setDescription(comicToEdit.description);
      setImageUrl(comicToEdit.imageUrl);
      setRead(comicToEdit.read); // Set the initial value of the read checkbox when editing
    } else {
      setTitle("");
      setIssue("");
      setYear("");
      setRating("");
      setDescription("");
      setImageUrl("");
      setRead(false); // Reset the checkbox when adding a new comic
    }
  }, [comicToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comicData = {
      title,
      issue,
      year,
      rating,
      description,
      imageUrl,
      read, // Include the read status in the data
    };
    if (comicToEdit) {
      editComic({ ...comicToEdit, ...comicData });
    } else {
      addComic(comicData);
    }
    setTitle("");
    setIssue("");
    setYear("");
    setRating("");
    setDescription("");
    setImageUrl("");
    setRead(false); // Reset the checkbox
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Comic Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Issue Number"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Publication Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Rating (1-10)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows="5"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          resize: "vertical",
          fontSize: "1rem",
          marginBottom: "15px",
        }}
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      {/* Updated checkbox and label styling */}
      <label style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <input
          type="checkbox"
          checked={read}
          onChange={(e) => setRead(e.target.checked)} // Handle checkbox changes
          style={{ marginRight: "10px" }} // Adds space between checkbox and label text
        />
        <span style={{ fontSize: "1rem", color: "#333" }}>Read Already?</span>
      </label>

      <button type="submit">
        {comicToEdit ? "Edit Comic" : "Add Comic"}
      </button>
    </form>
  );
}

export default ComicsForm;
