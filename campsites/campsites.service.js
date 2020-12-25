const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  authenticate,
  getAll,
  create,
  getById,
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
  return await db.Campsite.findAll();
}

async function getById(id) {
  return await getCampsite(id);
}


async function update(id, params) {
  const campsite = await getCampsite(id);

  // validate
  const campsiteChanged = params.id && user.id !== params.id;
  if (
    campsiteChanged &&
    (await db.Campsite.findOne({ where: { campsite_name: params.campsite_name } }))
  ) {
    throw 'Campsite "' + params.campsite_name + '" is already taken';
  }

  // copy params to user and save
  Object.assign(campsite, params);
  console.log(campsite);
  await campsite.save();

  return campsite;
}

async function _delete(id) {
  const campsite = await getCampsite(id);
  await campsite.destroy();
}

async function create(params) {
  console.log(params);
  // save user
  await db.Campsite.create(params);
}

// helper functions

async function getCampsite(id) {
  
  const campsite = await db.Campsite.findByPk(id);
  if (!campsite) throw "Campsite not found";
  return campsite;
}