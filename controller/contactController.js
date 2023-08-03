/** Wrap all async functions inside express-async-handler
 *  We don't have to using try-catch block each async function instead
 */
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//Since we work with MoongoseDB - all of method interact with is implicited as a Promise

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContact = async (req, res) => {
  const contacts = await Contact.find();
  console.log(contacts);
  res.status(200).json(contacts);
};

//@desc Create a Contacts
//@route CREATE /api/contacts
//@access public - 201 (created/ updated success)
const createContact = asyncHandler(async (req, res) => {
  //app.get("/", asyncHandler(async function)*)
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const contacts = await Contact.create({
    name,
    email,
    phone,
  });
  //get request from body and add into the collection data
  res.status(201).json(contacts);
});

//@desc Delete a Contacts
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  // const contact = Contact.delete();
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not Found");
  }
  const deleteContact = await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteContact);
});

//@desc Get a Contacts
//@route Get /api/contacts/:id
//@access public
const getSpecificContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update a Contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  console.log(req.params);
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, //if true, return the modified document rather than the original
    }
  );
  res.status(201).json(updateContact);
});

module.exports = {
  getContact,
  createContact,
  deleteContact,
  getSpecificContact,
  updateContact,
};
