const User = require("./userModel");

exports.userGetAll = (req, res) => {
  User.find({})
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(200).json({ message: "No users yet!" });
      }
    })
    .catch(err => res.status(500).json(err));
};
