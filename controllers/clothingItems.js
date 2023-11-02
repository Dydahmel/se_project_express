
const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR } = require('../utils/errors');

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
  .populate('owner')
  .orFail(() => {
    // document not found
    // throw an error with status 404
  })
  .then(clothingItems => res.send({data:clothingItems}))
  .catch((err)=> {
    console.error(err);
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error in getClothingItems'})
  });
}

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id)

  const {name, weather, imageUrl} = req.body;
  const ownerId = req.user._id;
  const createdAt = new Date();
  let likes = [];
  ClothingItem.create({name, weather, imageUrl, owner:ownerId, createdAt, likes})
  .then(item => res.send({data:item}))
  .catch((err)=> {
    console.error(err.name)

    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST_ERROR).send({ message: `${err.message}` })
    }
    else {
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error in createClothingItem'})}
    }
  )
}

module.exports.deleteClothingItem = (req, res) =>{
  const {itemId} = req.params
  console.log(itemId)
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then(item => res.status(204).send({}))
  .catch((err)=>{
    console.error(err.name)
    if(err.name === "CastError" || "DocumentNotFoundError"){
      return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` })
    }
    else{
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error in deleteClothingItem'})
    }}
  )
}

module.exports.updateItem = (req, res) =>{
  const {itemId} = req.params;
  const {imageUrl} = req.body;
  console.log(imageUrl)
  ClothingItem.findByIdAndUpdate(itemId, {$set:{imageUrl}})
  .orFail()
  .then((item) => res.status(200).send({data:item}))
  .catch(()=> res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error in updateItem'}))
}



