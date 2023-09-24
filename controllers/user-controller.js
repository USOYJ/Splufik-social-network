const { User } = require('../models');

const UserController = {
 
  getAllUsers(req, res) {
    User.find()
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },


  getUserById(req, res) {
    User.findById(req.params.userId)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },


  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.status(201).json(userData))
      .catch((err) => res.status(500).json(err));
  },


  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },


  deleteUserById(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },

 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },


  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'User not found' });
        }
        const removed = !dbUserData.friends.includes(req.params.friendId);
        if (removed) {
          res.json({ message: 'Friend removed successfully', user: dbUserData });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};


module.exports = UserController;



