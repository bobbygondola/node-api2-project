const express = require('express');
const router = express.Router();
const db = require('./data/db');



//GET /api/posts
router.get("/", (req, res) => {
    db.find(req.body)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });

})
//GET /api/posts/:id
router.get("/:id", (req, res) => {
    db.findById(req.params.id)
    .then(postById => {
        if (!postById) {
            res.status(404).json({messge: "the post with this id does not exist"})
        } else {
            res.status(200).json(postById)
        }
    })
})
//POST /api/posts
router.post('/', (req, res) => {
    const pendingPost = req.body;
    if (!pendingPost.title || !pendingPost.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
      db.insert(pendingPost)
        .then(NewPost => {
          res.status(201).json(NewPost);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
    }
  });

//DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(post => {
        if (post) {
          res.status(200).json({ message: 'The post has been deleted' });
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'The post could not be recovered' });
      });
  });

//PUT /api/posts/:id
router.put('/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    } else {
      db.update(id, post)
        .then(updated => {
          if (updated) {
            res.status(200).json(updated);
          } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
        })
        .catch(error => {
          console.log(error);
          res
            .status(500)
            .json({ error: 'The post information could not be modified' });
        });
    }
  });

module.exports = router;