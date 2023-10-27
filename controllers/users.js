const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({}).then(users => res.send({data:users})).catch(()=> res.status(500).send({ message: 'Error'}))
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
  .then(user => res.send({data: user}))
  .catch(() => res.status(500).send({message: 'Error'}))
};

module.exports.createUser = (req, res) => {
  const {name,avatar} = req.body;
  User.create({name, avatar})
  .then(user => res.send({data : user}))
  .catch(() => res.status(500).send({message: 'Error'}))
}



