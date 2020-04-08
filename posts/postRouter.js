const express = require('express');

const router = express.Router();

const postsDataBase = require('./postDb.js');

router.get('/', (req, res) => {
  postsDataBase.get()
  .then(posts => {
    if(posts.length > 0){
      res.status(200).json(posts)
    } else {
      res.status(400).json({message: 'error 400'})
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  postsDataBase.getById(req.params.id)
  .then(post => res.status(200).json(post))
  .catch(err => res.status(500).json({message: "error 500"})) 
});

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  postsDataBase.remove(req.params.id)
  .then(count =>res.status(200).json({message: `post with id:${req.params.id} was deleted`}))
  .catch(err => res.status(500).json({message: 'error 500'}))
});

router.put('/:id', validatePostId(), (req, res) => {
  // do your magic!
  const changes = req.body;

  if(changes.text && changes.user_id){
    postsDataBase.update(req.params.id, changes)
    .then(updatedPost =>{
      if(updatedPost){
        res.status(200).json({message: `Post with id:${req.params.id} was updated successfully`})
      } else {
        res.status(500).json({message: 'Post was not updated'})
      }
    })
    .catch(err => res.status(500).json({message: 'error 500'}))
  } else {
    res.status(400).json({message: 'missing the text or user_id'})
  }
});

// custom middleware

function validatePostId(req, res, next) {
  return function(req,res,next){
    
    const postId = req.params.id;

    postsDataBase.getById(postId)
    .then(post => {
      if(post){
        next();
      } else {
        res.status(404).json({message:'error 404'});
      }
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({message:' error 500'});
    })
  }
}

module.exports = router;
