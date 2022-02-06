const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// router.use('/tags', apiRoutes);

// find all tags
// be sure to include its associated Product data
router.get('/', async(req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error)
  }
})

 // find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async(req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a tag's name by its `id` value
router.put('/:id', async(req, res) => {
    try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

// delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    const tags = await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
