const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const bookingService = require("./booking.service");

// routes
router.get('/getBank', authorize(), getBankFPX);
router.post('/createUser', createUser, create);
router.post("/createBill", createBill, billcreate);
router.post("/createCategory", createCategory, catcreate);
router.post("/bookingCreate", bookingSchema, booking);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function bookingSchema(req, res, next) {
  const schema = Joi.object({
    // booking_id: Joi.number().required(),
    // user_id: Joi.number().required(),
    // campsite_id: Joi.number().required(),
    // status: Joi.string().required(),
    userSecretKey: Joi.string().required(),
    billCode: Joi.string().required(),
    billpaymentAmount: Joi.number().required(),
    billpaymentPayorName: Joi.string().required(),
    billpaymentPayorPhone: Joi.number().required(),
    billpaymentPayorEmail: Joi.string().required(),
    billBankID: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function booking(req, res, next) {
  console.log(req.body);
  bookingService
    .create(req.body)
    .then((booking) => res.json(booking))
    .catch(err => res.status(400).json({ err: err}));
    
  console.log(next);
}

function createUser(req, res, next){  
  const schema = Joi.object({
  enterpriseUserSecretKey: Joi.string().required(), 
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  bank: Joi.number().required(),
  accountNo: Joi.string().required(),
  accountHolderName: Joi.string().required(),
  package: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  bookingService
    .createUser(req.body)
    .then((userKey) => res.json(userKey))
    .catch((err) => res.status(400).json({ err: err }));

  console.log(next);
}

function createCategory(req, res, next) {
  const schema = Joi.object({
    userSecretKey: Joi.string().required(),
    catname: Joi.string().required(),
    catdescription: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function catcreate(req, res, next) {
  bookingService
    .createCategory(req.body)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json({ err: err }));

  console.log(next);
}

function createBill(req, res, next) {
  const schema = Joi.object({
    userSecretKey: Joi.string().required(),
    categoryCode: Joi.string().required(),
    billName: Joi.string().required(),
    billDescription: Joi.string().required(),
    billPriceSetting: Joi.number().required(),
    billPayorInfo: Joi.number().required(),
    billAmount: Joi.number().required(),
    billReturnUrl: Joi.string().required(),
    billCallbackUrl: Joi.string().required(),
    billExternalReferenceNo: Joi.string().required(),
    billTo: Joi.string().required(),
    billEmail: Joi.string().required(),
    billPhone: Joi.string().required(),
    billSplitPayment: Joi.number().required(),
    billSplitPaymentArgs: Joi.string().required(),
    billPaymentChannel: Joi.string().required(),
    billDisplayMerchant: Joi.number().required(),
    billContentEmail: Joi.string().required(),
    billChargeToCustomert: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function billcreate(req, res, next) {
  bookingService
    .createBill(req.body)
    .then((bill) => res.json(bill))
    .catch((err) => res.status(400).json({ err: err }));

  console.log(next);
}

function getBankFPX(req, res, next){
  bookingService
    .getBank()
    .then((bank) => res.json(bank))
    .catch(next);
}

function getAll(req, res, next) {
  bookingService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  bookingService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().empty(""),
    campsite_id: Joi.number().empty(""),
    status: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  bookingService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  bookingService
    .delete(req.params.id)
    .then(() => res.json({ message: "Booking deleted successfully" }))
    .catch(next);
}
