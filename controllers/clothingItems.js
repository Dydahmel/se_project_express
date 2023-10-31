
const ClothingItem = require('../models/clothingItem');

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
  .then(clothingItems => res.send({data:clothingItems}))
  .catch(()=> res.status(500).send({ message: 'Error in getClothingItems'}))
}

module.exports.createClothingItem = (req, res) => {
  const {name, weather, imageUrl} = req.body;
  ClothingItem.create({name, weather, imageUrl})
  .then(item => res.send({data:item}))
  .catch(()=> res.status(500).send({ message: 'Error in createClothingItem'}))
}

module.exports.deleteClothingItem = (req, res) =>{
  const {itemId} = req.params
  console.log(itemId)
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then(item => res.status(204).send({}))
  .catch(()=> res.status(500).send({ message: 'Error in deleteClothingItem'}))
}

module.exports.updateItem = (req, res) =>{
  const {itemId} = req.params;
  const {imageUrl} = req.body;
  console.log(imageUrl)
  ClothingItem.findByIdAndUpdate(itemId, {$set:{imageUrl}})
  .orFail()
  .then((item) => res.status(200).send({data:item}))
  .catch(()=> res.status(500).send({ message: 'Error in updateItem'}))
}



