const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint 

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product]
  })
  // be sure to include its associated Products
  .then((categoryData) => {
     res.json(categoryData);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where:{
      id: req.params.id
    }, include: [Product],
  })
  // be sure to include its associated Products
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
 Category.create(req.body)
 .then((categoryData) => 
 res.status(200).json(categoryData))
 .catch((err) => {
   res.status(400).json(err);
 });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id: req.params.id
    },
  }) 
  .then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
  where:{
    id: req.params.id
  },  
  })
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
