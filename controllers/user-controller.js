const { User } = require('../models');

const UserController = {

  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  getUserById: async (req, res) => {
    try {
      const userData = await User.findById(req.params.userId);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  createUser: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(201).json(userData);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },


  updateUserById: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  deleteUserById: async (req, res) => {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.id });
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },


  addFriend: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  removeFriend: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }

      const removed = !userData.friends.includes(req.params.friendId);

      if (removed) {
        res.json({ message: 'Friend removed successfully!', userData });
      } else {
        res.json(userData);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = UserController;


