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
  return await db.Reviews.findAll();
}

async function getById(id) {
  return await getReview(id);
}

async function update(id, params) {
  const reviews = await getReview(id);

  // validate
const reviewsChanged = params.id && user.id !== params.id;
if (
reviewsChanged &&
(await db.Reviews.findOne({
    where: { reviews_name: params.reviews_name },
}))
) {
throw 'Review "' + params.reviews_name + '" is already taken';
}

// copy params to user and save
Object.assign(reviews, params);
console.log(reviews);
await reviews.save();

return reviews;
}

async function _delete(id) {
  const reviews = await getReview(id);
  await reviews.destroy();
}

async function create(params) {
  console.log(params);
  // save review
  await db.Reviews.create(params);
}

// helper functions
async function getReview(id) {
  const reviews = await db.Reviews.findByPk(id);
  if (!reviews) throw "Review not found";
  return reviews;
}
