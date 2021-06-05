const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({include: {all: true}})
  .then(tags => {
    res.status(200).send(tags);
  })
  .catch(err => {
    res.status(500).send(err.message);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const errors = [];
  if (!req.params.id){
    errors.push('Missing tag id');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }
  
  Tag.findByPk(req.params.id, {include: {all: true}})
  .then(tag => {
    res.status(200).send(tag);
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

router.post('/', (req, res) => {
  // create a new tag
  const errors = [];
  if (!req.body.tag_name){
    errors.push('Missing tag name');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }

  Tag.create({
    tag_name
  })
  .then(tag => {
    res.status(200).send(tag);
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // update a category by its `id` value
  const errors = [];
  if (!req.params.id){
    errors.push('Missing category id');
  }
  if (!req.body.tag_name){
    errors.push('Missing tag name');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }
  Tag.findByPk(req.params.id)
  .then(tag => {
    tag.update({
      tag_name
    })
    res.status(200).send(true)
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const errors = [];
  if (!req.params.id){
    errors.push('Missing tag id');
  }
  if (errors.length > 0){
    res.status(500).send({message: errors.join('\n')});
    return;
  }
  
  Tag.findByPk(req.params.id)
  .then(tag => {
    tag.destroy()
    .then(() => {
      res.status(200).send('Deleted tag');l
    })
  })
  .catch(err => {
    res.status(500).send({message: err.message});
  })
});

module.exports = router;
