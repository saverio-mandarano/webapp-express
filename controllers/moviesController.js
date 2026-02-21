// import connessione al database
const connection = require("../data/db");

// index
function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// show
function show(req, res) {
  const { id } = req.params;

  const movieSql = "SELECT * FROM movies WHERE id = ?";
  const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

  // chiamata a DB principale per recuperare il film
  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    // salviamo il risultato in una cost
    const movie = movieResults[0];

    // chiamata a DB secondaria per recupero reviews del film
    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });

      // saviamo le reviews in una cost
      const reviewsArr = reviewsResults;

      // aggiungiamo a oggetto movie la prop per le reviews
      movie.reviews = reviewsArr;
      // add url immagini nel dettaglio film
      movie.img_url = `${req.protocol}://${req.get("host")}/${movie.image}`;

      res.json(movie);
    });
  });
}

function store(req, res) {}
function update(req, res) {}
function modify(req, res) {}
function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
