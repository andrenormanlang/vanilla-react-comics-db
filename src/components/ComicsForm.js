import React, { useState, useEffect } from "react";

function ComicsForm({ addComic, editComic, comicToEdit }) {
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (comicToEdit) {
      setTitle(comicToEdit.title);
      setIssue(comicToEdit.issue);
      setYear(comicToEdit.year);
      setRating(comicToEdit.rating);
      setDescription(comicToEdit.description);
      setImageUrl(comicToEdit.imageUrl);
    } else {
      setTitle("");
      setIssue("");
      setYear("");
      setRating("");
      setDescription("");
      setImageUrl("");
    }
  }, [comicToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comicToEdit) {
      editComic({
        ...comicToEdit,
        title,
        issue,
        year,
        rating,
        description,
        imageUrl,
      });
    } else {
      addComic({ title, issue, year, rating, description, imageUrl });
    }
    setTitle("");
    setIssue("");
    setYear("");
    setRating("");
    setDescription("");
    setImageUrl("");
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
        type="number"
        placeholder="Publication Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="number"
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
        rows="5" // Adjust for more space
        style={{
          width: "100%", // Full width
          padding: "10px", // Add padding for better readability
          borderRadius: "5px", // Smooth corners
          border: "1px solid #ccc", // Light gray border
          boxSizing: "border-box", // Ensure padding and width play nicely together
          resize: "vertical", // Only allow vertical resizing
          fontSize: "1rem", // Enhance readability
          marginBottom: "15px", // Add space at the bottom
        }}
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">{comicToEdit ? "Edit Comic" : "Add Comic"}</button>
    </form>
  );
}

export default ComicsForm;
