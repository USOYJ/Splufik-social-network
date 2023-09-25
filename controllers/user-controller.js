const { User } = require('../models');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const userData = await User.getUserById(req.params.userId); 
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(201).json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  updateUserById: async (req, res) => {
    try {
      const {id} = req.params;
      const userData = await User.findOneAndUpdate(
        { _id: id},
        { $set: req.body }, 
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId});
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.id }, 
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.id }, 
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }

      const removed = !userData.friends.includes(req.params.friendId);

      if (removed) {
        res.json({ message: 'Friend removed successfully', userData });
      } else {
        res.json(userData);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },
};

module.exports = UserController;



