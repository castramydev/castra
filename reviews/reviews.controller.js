const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const reviewService = require("./reviews.services");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

// routes
router.post("/add", authorize(), registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
  reviewService
    .getAll()
    .then((reviews) => res.json(key.encrypt(reviews, "base64")))
    .catch(next);
}

function getById(req, res, next) {
  console.log(req.params.id);
  reviewService
    .getById(req.params.id)
    .then((reviews) => res.json(key.encrypt(reviews, "base64")))
    // res.json(key.encrypt(campsite, "base64")))
    .catch(next);
  // console.log(req.params.id);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    campsite_id: Joi.string().required(),
    user_id: Joi.string().required(),
    rating_stars: Joi.number().required(),
    comments: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  reviewService
    .create(req.body)
    .then(() => res.json({ message: "Rating added successfully" }))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    campsite_id: Joi.string().empty(""),
    rating_stars: Joi.number().empty(""),
    comments: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  reviewService
    .update(req.params.id, req.body)
    .then((reviews) => res.json(reviews))
    .catch(next);
}

function _delete(req, res, next) {
  reviewService
    .delete(req.params.id)
    .then(() => res.json({ message: "Rating deleted successfully" }))
    .catch(next);
}
