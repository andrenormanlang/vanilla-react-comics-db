const pool = require('../config/db');

// Fetch all comics
const getAllComics = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM comics');
    return result.rows;
  } finally {
    client.release();
  }
};

// Fetch a comic by ID
const getComicById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM comics WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Add a new comic
const addComic = async (comic) => {
  const client = await pool.connect();
  try {
    const query = 'INSERT INTO comics (title, issue, year, rating, read, description, imageUrl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [comic.title, comic.issue, comic.year, comic.rating, comic.read, comic.description, comic.imageUrl];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Add multiple comics (bulk insert)
const addComicsBulk = async (comics) => {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO comics (title, issue, year, rating, read, description, imageUrl)
        VALUES 
        ${comics.map((_, i) => `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`).join(', ')}
        RETURNING *`;
  
      const values = comics.flatMap(comic => [
        comic.title,
        comic.issue,
        comic.year,
        comic.rating,
        comic.read,
        comic.description,
        comic.imageUrl
      ]);
  
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  };

// Update an existing comic
const updateComic = async (id, comic) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE comics
      SET title = $1, issue = $2, year = $3, rating = $4, read = $5, description = $6, imageUrl = $7
      WHERE id = $8
      RETURNING *`;
    const values = [comic.title, comic.issue, comic.year, comic.rating, comic.read, comic.description, comic.imageUrl, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating comic:", error);
    throw error;  // Re-throw the error to handle it properly in the frontend
  } finally {
    client.release();
  }
};


// Delete a comic
const deleteComic = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM comics WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  getAllComics,
  getComicById,
  addComic,
  addComicsBulk,
  updateComic,
  deleteComic
};
