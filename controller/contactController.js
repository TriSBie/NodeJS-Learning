/** Wrap all async functions inside express-async-handler
 *  We don't have to using try-catch block each async function instead
 */
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//Since we work with MoongoseDB - all of method interact with is implicited as a Promise

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContact = async (req, res) => {
  //find all contact belongs to the userID
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log(contacts);
  res.status(200).json(contacts);
};

//@desc Create a Contacts
//@route CREATE /api/contacts
//@access private - 201 (created/ updated success)
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
    //user_id means when each user are logged in will contains/own his/her unique id
    user_id: req.user.id,
  });
  //get request from body and add into the collection data
  res.status(201).json(contacts);
});

//@desc Delete a Contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  // const contact = Contact.delete();
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not Found");
  }
  //if other user trying to update informations of other private contact's information
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403); //FORBIDDEN
    throw new Error("Unauthenticated fails");
  }
  const deleteContact = await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteContact);
});

//@desc Get a Contacts
//@route Get /api/contacts/:id
//@access private
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
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  /** We can't compare two object from the data we get from the contact
   *  since two objects have different between allocation and memory address
   *  req.user.id is String (create when user logged in)
   * **/

  //if other user trying to update informations of other private contact's information
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403); //FORBIDDEN
    throw new Error("Unauthenticated fails");
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
