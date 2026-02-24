const express = require("express");
const app = express();
const port = process.env.PORT;

// importiamo middleware cors
const cors = require("cors");

// middleware per il CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// import del router dei film
const moviesRouter = require("./routers/moviesRouter");

// import del middelware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler");
// import del middelware di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");

// attivazione della cartella public per uso file statici
app.use(express.static("public"));

// registro il body-parser per "application/json"
app.use(express.json());

// rotta home APP
app.get("/api", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// rotte relative al router dei film
app.use("/api/movies", moviesRouter);

// registriamo middelware di gestione err 500
app.use(errorsHandler);

// registriamo middelware di gestione rotta inesistente
app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
