'use strict';
//Creating model for blog posts
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    //Posts should belong to an author and cannot be created without one
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
