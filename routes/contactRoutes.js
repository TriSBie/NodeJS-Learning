const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  deleteContact,
  getSpecificContact,
  updateContact,
} = require("../controller/contactController");
//define path and routing method with callback function
router.route("/").get(getContact).post(createContact);

// router.route("/").post(createContact);
router
  .route("/:id")
  .get(getSpecificContact)
  .delete(deleteContact)
  .put(updateContact);

module.exports = router;
