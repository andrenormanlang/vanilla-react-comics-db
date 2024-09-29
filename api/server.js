const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const comicRoutes = require('./routes/comicRoutes');

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Routes
app.use('/api/comics', comicRoutes);

// GET: Root endpoint with instructions
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Rubik', sans-serif;
          background-color: #fafafa;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          color: #333;
        }
        .container {
          background-color: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          padding: 30px;
          max-width: 600px;
          margin: auto;
          border: 5px solid #ffdd57;
          position: relative;
        }
        .container:before {
          content: "💥 SOK! BAM! POW! 💥";
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: #ffdd57;
          color: #000;
          padding: 10px;
          border-radius: 15px;
          font-size: 24px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 30px;
          color: #ff4136;
        }
        p {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        ul li {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          margin-bottom: 12px;
          padding: 15px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          font-size: 16px;
        }
        ul li strong {
          color: #007BFF;
          margin-right: 10px;
        }
        ul li::before {
          content: "📚"; /* Comic-related emoji */
          margin-right: 10px;
          font-size: 20px;
        }
        code {
          background-color: #ffdd57;
          padding: 3px 6px;
          border-radius: 5px;
          font-size: 16px;
          color: #c7254e;
        }
        footer {
          margin-top: 20px;
          color: #aaa;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Dre´s Comics List API! 📖</h1>
        <p>Here are the available endpoints:</p>
        <ul>
          <li><strong>GET /api/comics</strong>: Fetch all comics</li>
          <li><strong>GET /api/comics/:id</strong>: Fetch a specific comic by its ID</li>
          <li><strong>POST /api/comics</strong>: Add a new comic (requires JSON body)</li>
          <li><strong>PUT /api/comics/:id</strong>: Update a comic by its ID (requires JSON body)</li>
          <li><strong>DELETE /api/comics/:id</strong>: Delete a comic by its ID</li>
        </ul>
        <p>For example, to fetch all comics, use <code>/api/comics</code>.</p>
        <footer>🦸 Built with great power by the Comics API team! 🦸‍♂️</footer>
      </div>
    </body>
    </html>
  `);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});