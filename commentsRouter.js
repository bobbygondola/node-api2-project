const express = require('express');
const router = express.Router();
const db = require('./data/db');

//POST /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {})


//GET /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {})

module.exports = router;