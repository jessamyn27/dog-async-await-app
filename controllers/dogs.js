const express = require('express');
const router  = express.Router();
const Dog  = require('../models/dogs');

router.get('/', (req, res, next) => {
  Dog.find({}, (err, foundDogs) => {
      res.render('index.ejs', {
        dogs: foundDogs
      });
  });
});

router.get('/new', (req, res) => {
  res.render('new.ejs');
});


router.get('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    res.render('authors/show.ejs', {
      dog: foundDog
    });
  });
});

router.get('/:id/edit', (req, res) => {

  Dog.findById(req.params.id, (err, foundDog) => {
    res.render('edit.ejs', {
      dog: foundDog
    });
  });

});

router.put('/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedDog)=> {
    console.log(updatedDog, ' this is updatedDog');
    res.redirect('/dogs');
  });
});


router.post('/', (req, res) => {
  console.log(req.body)
  Dog.create(req.body, (err, createdDog) => {
    console.log(createdDog, ' this is the createdDog');
    res.redirect('/dogs');
  });

});


router.delete('/:id', (req, res) => {

  Dog.findByIdAndRemove(req.params.id, (err, deletedDog) => {
    console.log(deletedDog, ' this is deletedDog');
    res.redirect('/dogs')
  })

});



module.exports = router;
