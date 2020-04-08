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

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  return function(req,res,next){

  }
}

module.exports = router;
