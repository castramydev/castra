const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    campsite_id: { type: DataTypes.CHAR, primaryKey: true },
    user_id: { type: DataTypes.STRING, allowNull: false },
    campsite_name: { type: DataTypes.STRING, allowNull: false },
    campsite_type: { type: DataTypes.STRING, allowNull: false },
    tent_type: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    photo_path: { type: DataTypes.STRING, allowNull: false },
    cost: { type: DataTypes.DECIMAL, allowNull: false },
    food_status: { type: DataTypes.CHAR, allowNull: false },
    latitud: { type: DataTypes.DECIMAL, allowNull: false },
    longitud: { type: DataTypes.DECIMAL, allowNull: false },
    exact_location: { type: DataTypes.STRING, allowNull: false },
    kitchen_status: { type: DataTypes.STRING, allowNull: false },
    toilet_status: { type: DataTypes.STRING, allowNull: false },
    firepit_status: { type: DataTypes.STRING, allowNull: false },
    parking_distances: { type: DataTypes.INTEGER, allowNull: false },
    car_types: { type: DataTypes.STRING, allowNull: false },
    campervan_availability: { type: DataTypes.STRING, allowNull: false },
    equipment_provided: { type: DataTypes.STRING, allowNull: false },
    accomodation: { type: DataTypes.STRING, allowNull: false },
    streams: { type: DataTypes.STRING, allowNull: false },
    plugpoint: { type: DataTypes.STRING, allowNull: false },
  };

  // Campsite.belongsTo(User);
  return sequelize.define("Campsite", attributes, { timestamps: false });
}
