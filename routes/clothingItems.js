const router = require('express').Router();
const {getClothingItems, createClothingItem, deleteClothingItem, updateItem} = require('../controllers/clothingItems');

router.get('/', getClothingItems);
router.post('/', createClothingItem);
router.delete('/:itemId', deleteClothingItem);
router.put('/:itemId', updateItem)

module.exports = router;