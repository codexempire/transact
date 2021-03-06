'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Friend.belongsTo(models.User);
    }
  };
  Friend.init({
    friend: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};