const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {all: true}
  })
  .then(categories => {
    res.status(200).send(categories)
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

router.get('/:id', (req, res) => {
  const errors = [];
  if (!req.params.id){
    errors.push('Missing category id');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }
  Category.findByPk(req.params.id, {
    include: { all: true}
  })
  .then(category => {
    res.status(200).send(category)
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
