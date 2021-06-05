const router = require('express').Router();
const { Category, Product } = require('../../models');
const { beforeDestroy } = require('../../models/Tag');

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
  const errors = [];
  if (!req.body.category_name){
    errors.push('Missing category name');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }

  Category.create({
    category_name
  })
  .then(category => {
    res.status(200).send(category);
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const errors = [];
  if (!req.params.id){
    errors.push('Missing category id');
  }
  if (!req.body.category_name){
    errors.push('Missing category name');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }
  Category.findByPk(req.params.id)
  .then(category => {
    category.update({
      category_name
    })
    res.status(200).send(true)
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const errors = [];
  if (!req.params.id){
    errors.push('Missing category id');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }
  Category.findByPk(req.params.id)
  .then(category => {
    category.destroy()
    .then(() => {
      res.status(200).send('category deleted');
    })
    //get all category products
    //get all product tags
      //delete the tags
    //delete the products
    res.status(200);
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

module.exports = router;
