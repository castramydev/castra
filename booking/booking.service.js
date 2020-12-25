const config = require("config.json");
const axios = require("axios");
const qs = require("query-string");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  createBill,
  createUser,
  createCategory,
  getBank,
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect";

  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.Booking.findAll();
}

async function getById(id) {
  return await getBooking(id);
}

async function create(params) {
  // validate
  // if (await db.Booking.findOne({ where: { booking_id: params.campsite_id } })) {
  //   throw 'bookingname "' + params.campsite_id + '" is already don';
  // }
  // save booking
  // console.log(params);
  // await db.Booking.create(params);
  const response = await axios.post(
    "https://toyyibpay.com/index.php/api/runBill",
    params
  );
  console.log(response);
  return response.data;
}

async function update(id, params) {
  const booking = await getBooking(id);

  // validate
  const bookingnameChanged = params.campsite_id && booking.booking_id !== params.booking_id;
  if (
    bookingnameChanged &&
    (await db.booking.findOne({ where: { campsite_id: params.campsite_id } }))
  ) {
    throw 'campsite id "' + params.campsite_id + '" is already taken';
  }
  // copy params to booking and save
  Object.assign(booking, params);
  await booking.save();
  return booking;
}

async function _delete(id) {
  const booking = await getBooking(id);
  await booking.destroy();
}

async function getBank(){
  const response = await axios.get(
    "https://toyyibpay.com/index.php/api/getBankFPX"
  );
  return response.data; 
}

async function createUser(params){
  const response = await axios.post(
    "https://dev.toyyibpay.com/index.php/api/createAccount",
    params
    // qs.stringify(params)
  );
  console.log(params);
  return response.data;
}


async function createBill(params) {
  const response = await axios.post(
    "https://toyyibpay.com/index.php/api/createBill",
    params
    // qs.stringify(params)
  );
  console.log(response.data);
  return response.data;
}
async function createCategory(params) {
  const response = await axios.post(
    "https://toyyibpay.com/index.php/api/createCategory", params
    // qs.stringify(params)
  );
  console.log(response.data);
  return response.data;
}

async function getBooking(id) {
  const booking = await db.Booking.findByPk(id);
  if (!booking) throw "Booking not found";
  return booking;
}
