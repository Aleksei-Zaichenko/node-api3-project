const express = require('express');
const userDataBase = require('./userDb.js');
const postsDataBase = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser(),(req, res) => {
  // do your magic!
  userDataBase.insert(req.body)
  .then(insertedUser => {
    res.status(200).json(insertedUser);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.post('/:id/posts', validatePost(), (req, res) => {
  // do your magic!
  postsDataBase.insert(req.body,)
  .then(insertedPost => {
    res.status(200).json(insertedPost);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userDataBase.get()
  .then(users => {
    if(users.length > 0){
      res.status(200).json(users)
    } else {
      res.status(400).json({message: 'error 400'})
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  userDataBase.getById(req.params.id)
  .then(foundUser => {
    res.status(200).json(foundUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  userDataBase.getUserPosts(req.params.id)
  .then(foundPosts => {
    res.status(200).json(foundPosts);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  userDataBase.remove(req.params.id)
  .then(count =>{
    res.status(200).json({message: `User with id:${req.params.id} was updated successfully`})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  // do your magic!

  const changes = req.body

  userDataBase.update(req.params.id, changes)
  .then(count => {
    if(count){
      res.status(200).json({message: `User with id:${req.params.id} was updated successfully`})
    } else {
      res.status(500).json({message: `User with id:${req.params.id} was NOT updated successfully`})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error 500'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  return function (req,res,next){
    
    const userId = req.params.id;

    userDataBase.getById(userId)
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

function validateUser(req, res, next) {
  return function (req,res,next){
    if(req.body){

      const changes = req.body;
  
      if(changes.name){
        next();
      } else {
        res.status(400).json({message: "missing required name field"})
      }} else {
        res.status(400).json({message: "missing data data"})
      }
  }
}

function validatePost(req, res, next) {
  return function (req,res,next){

    if(req.body){

    const changes = req.body;

    if(changes.text){
      next();
    } else {
      res.status(400).json({message: "missing required text field"})
    }} else {
      res.status(400).json({message: "missing post data"})
    }
  }
}

module.exports = router;
