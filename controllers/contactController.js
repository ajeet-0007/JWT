const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id : req.user.id});
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are manadatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id : req.user.id
  })
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found')
    }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found')
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("Can not update")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found')
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("Can not delete")
    }
    await contact.deleteOne({_id: req.params.id});
  res.status(200).json({
    message: `Delete contact for ${req.params.id}`,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
