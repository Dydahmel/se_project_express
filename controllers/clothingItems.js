const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in getClothingItems" }),
    );
};

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
  console.log(req.user)

  const { name, weather, imageUrl } = req.body;
  const ownerId = req.user._id;
  const createdAt = new Date();
  const likes = [];
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: ownerId,
    createdAt,
    likes,
  })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err.name);

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in createClothingItem" });
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((err) => {
      console.error(err.name);

      if (err.name === "DocumentNotFoundError") {
        // im not sure if this is correct way to handle, but i wanted to pass all postman tests
        return res
          .status(NOT_FOUND_ERROR)
          .send({ message: `Item was deleted` });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in deleteClothingItem" });
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in likeItem" });
    });
};
module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in dislikeItem" });
    });
};
