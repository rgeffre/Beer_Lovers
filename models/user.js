'use strict';
//Requiring bcrypt for the password hashing.
var bcrypt = require('bcrypt-nodejs');

//Creating the user model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    //Email must not be null and must be a proper email address before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    //the password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  //Creating a custom method for the user model to see if an unhashed pw entered by the user can be
  //compared to the password stored in the database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  //Setting up automatic password hashing
  User.hook('beforeCreate', function(user) {
    user.password = bycrypt.hashSync(user.password, bycrypt.genSaltSync(10),
        null);
  });

  return User;
};

