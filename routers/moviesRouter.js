const express = require("express");
const router = express.Router();

// import e destrutturazione di moviesController
const moviesController = require("../controllers/moviesController");
const { index, show, storeReview, update, modify, destroy } = moviesController;

// rotta di index
router.get("/", index);

// rotta di show
router.get("/:id", show);

// store: creazione nuovo post
router.post("/:id/reviews", storeReview);

// update: modifica integrale del post
router.put("/:id", update);

// modify: modifica parziale del post
router.patch("/:id", modify);

// destroy: cancellazione del post
router.delete("/:id", destroy);

module.exports = router;
