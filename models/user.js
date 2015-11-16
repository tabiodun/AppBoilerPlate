"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id'
    },
    username: {
      type: DataTypes.TEXT,
      unique: true
    },
    email: {
      type: DataTypes.TEXT,
      unique: true
    },
    hash: {
      type: DataTypes.TEXT,
      unique: true
    },
    userLevel: {
      type: DataTypes.TEXT,
      unique: true,
      field: 'user_level'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }
  }, {
    tableName: 'users'
  });

  return User;
};
