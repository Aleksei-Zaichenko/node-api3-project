const express = require('express');

const userDataBase = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  userDataBase.get()
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  return function (req,res,next){

  }
}

function validateUser(req, res, next) {
  return function (req,res,next){

  }
}

function validatePost(req, res, next) {
  return function (req,res,next){

  }
}

module.exports = router;
