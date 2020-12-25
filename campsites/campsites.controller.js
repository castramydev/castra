const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const campsiteService = require("./campsites.service");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

// routes
router.post("/register", authorize(), registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
  campsiteService
    .getAll()
    .then((campsites) => res.json(key.encrypt(campsites, "base64")))
    .catch(next);
}

function getById(req, res, next) {
  console.log(req.params.id);
  campsiteService
    .getById(req.params.id)
    .then((campsite) => res.json(key.encrypt(campsite, "base64")))
    // res.json(key.encrypt(campsite, "base64")))
    .catch(next);
    // console.log(req.params.id);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    campsite_id: Joi.string().required(),
    campsite_name: Joi.string().required(),
    campsite_type: Joi.string().required(),
    description: Joi.string().required(),
    photo_path: Joi.string().required(),
    cost: Joi.number().required(),
    food_status: Joi.string().required(),
    tent_type: Joi.string().required(),
    latitud: Joi.number().required(),
    longitud: Joi.number().required(),
    exact_location: Joi.string().required(),
    toilet_status: Joi.string().required(),
    kitchen_status: Joi.string().required(),
    firepit_status: Joi.string().required(),
    parking_distances: Joi.number().required(),
    car_types: Joi.string().required(),
    plugpoint: Joi.string().required(),
    campervan_availability: Joi.string().required(),
    equipment_provided: Joi.string().required(),
    streams: Joi.string().required(),
    accomodation: Joi.string().required(),
    adventure_type: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  campsiteService
    .create(req.body)
    .then(() => res.json({ message: "Campsite Registration successful" }))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    campsite_name: Joi.string().empty(""),
    campsite_type: Joi.string().empty(""),
    description: Joi.string().empty(""),
    photo_path: Joi.string().empty(""),
    cost: Joi.number().empty(""),
    food_status: Joi.string().empty(""),
    type: Joi.string().empty(""),
    latitud: Joi.number().empty(""),
    longitud: Joi.number().empty(""),
    exact_location: Joi.string().empty(""),
    accomodation: Joi.string().empty(""),
    adventure_type: Joi.string().empty(""),
    streams: Joi.string().empty(""),
    toilet_status: Joi.string().empty(""),
    kitchen_status: Joi.string().empty(""),
    firepit_status: Joi.string().empty(""),
    parking_distances: Joi.number().empty(""),
    car_types: Joi.string().empty(""),
    plugpoint: Joi.string().empty(""),
    campervan_availability: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  campsiteService
    .update(req.params.id, req.body)
    .then((campsite) => res.json(campsite))
    .catch(next);
}

function _delete(req, res, next) {
  campsiteService
    .delete(req.params.id)
    .then(() => res.json({ message: "Campsite deleted successfully" }))
    .catch(next);
}
