const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    review_id: { type: DataTypes.INTEGER, primaryKey: true },
    campsite_id: { type: DataTypes.CHAR, allowNull: false },
    rating_stars: { type: DataTypes.INTEGER, allowNull: false },
    comments: { type: DataTypes.STRING, allowNull: false },
  };

  // Campsite.belongsTo(User);
  return sequelize.define("Reviews", attributes, { timestamps: false });
}
