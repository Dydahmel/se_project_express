const router = require('express').Router();
const clothingItems = require('./clothingItems');
const users = require('./users');

router.use('/users', users);
router.use('/items', clothingItems);

module.exports = router;


router.use((req, res)=> res.status(500).send({ message: 'Router not found'}))