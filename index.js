const express = require('express');
const server = express();
server.use(express.json());
//database
const db = require('./data/db')
const commentsRouter = require("./commentsRouter")
const postRouter = require("./postRouter")

//this should be fine

server.use("/api/posts", commentsRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
    res.send("hello from the / endpoint")
});



const port = 8001;
server.listen(port, () => console.log(`hello bobby - on port ${port}`));


