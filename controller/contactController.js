//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContact = (req, res) => {
    res.status(200).send("<h1>Get all contacts</h1>");
};

//@desc Create a Contacts
//@route CREATE /api/contacts
//@access public - 201 (created/ updated success)
const createContact = (req, res) => {
    if () git init
    res.status(201).send(`<h1>Create a contacts </h1>`);
};

//@desc Delete a Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).send(`<h1>delete a contacts id: ${req.params.id} </h1>`);
};

//@desc Get a Contacts
//@route Get /api/contacts/:id
//@access public
const getSpecificContact = (req, res) => {
    res
        .status(200)
        .send(`<h1>get a specific contacts with id:  ${req.params.id} </h1>`);
};

//@desc Update a Contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(201).send(`<h1>Update contact with id  ${req.params.id}</h1>`);
};

module.exports = {
    getContact,
    createContact,
    deleteContact,
    getSpecificContact,
    updateContact,
};