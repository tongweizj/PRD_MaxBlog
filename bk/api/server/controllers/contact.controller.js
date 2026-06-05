import Contact from '../models/contact.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json({
      message: 'Successfully created!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let contacts = await Contact.find().select('firstname lastname email');
    res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id);
    if (!contact)
      return res.status('400').json({
        error: 'Contact not found',
      });
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve contact',
    });
  }
};
const read = (req, res) => {
  //req.contact = undefined
  //req.profile.salt = undefined
  return res.json(req.contact);
};
const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact = extend(contact, req.body);
    contact.updated = Date.now();
    await contact.save();
    //user.hashed_password = undefined
    //user.salt = undefined
    res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let contact = req.contact;
    let deletedContact = await contact.deleteOne();
    //deletedContact = undefined
    return res.status(200).json({
      message: 'Successfully deleted!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// New function to remove multiple contacts
const removeMany = async (req, res) => {
  const { ids } = req.body; // Assuming IDs are sent in the request body
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: 'Please provide an array of IDs to delete.',
    });
  }
  try {
    const result = await Contact.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} contacts successfully deleted!`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default { create, contactByID, read, list, remove, removeMany, update };
