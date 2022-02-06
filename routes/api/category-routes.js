const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get all categories
// find all categories
// be sure to include its associated Products
router.get('/', async(req, res) => {
  try{
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error)
  }
})

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async(req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a new category
router.post('/', async(req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a category by its `id` value
router.put('/:id', async(req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    if(!updateCategory[0]) {
      res.status(404).json({ message: 'No category with this id!'});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete a category by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    const categories = await Category.destroy({ where: { id: req.body.id } });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
