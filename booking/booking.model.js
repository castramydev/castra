const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    booking_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      // primaryKey: true,
      // autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    campsite_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    user_secret_key: { type: DataTypes.STRING, allowNull: false },
    bill_code: { type: DataTypes.STRING, allowNull: false },
    bill_amount: { type: DataTypes.FLOAT, allowNull: false },
    bill_name: { type: DataTypes.STRING, allowNull: false },
    bill_phone: { type: DataTypes.INTEGER, allowNull: false },
    bill_email: { type: DataTypes.STRING, allowNull: false },
    bank_id: { type: DataTypes.INTEGER, allowNull: false },
  };

  console.log(attributes);
  // Campsite.belongsTo(User);
  return sequelize.define("Booking", attributes, { timestamps: false });
}
