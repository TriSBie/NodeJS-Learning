const express = require("express");
const router = express.Router();
const validationTokenHandler = require("../middleware/validationTokenHandler");
const {
  getContact,
  createContact,
  deleteContact,
  getSpecificContact,
  updateContact,
} = require("../controller/contactController");
//This application / main functions of contact must requires the user logged in with authenticated.
//The middleware bellow will being apply for all routing methods
router.use(validationTokenHandler);
//define path and routing method with callback function
router.route("/").get(getContact).post(createContact);

// router.route("/").post(createContact);
router
  .route("/:id")
  .get(getSpecificContact)
  .delete(deleteContact)
  .put(updateContact);

module.exports = router;
