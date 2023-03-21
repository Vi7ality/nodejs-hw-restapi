const { HttpError, ctrlWrapper } = require("../helpers/index");
const { Contact, schemas } = require("../models/Contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.body;
  const { page = 1, limit = 10 } = req.query;
  const skip = page * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate(
    "owner",
    "name email"
  );
  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.body;
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = page * limit;
  const result = await Contact.findById({ id, owner }, "-createdAt -updatedAt", { skip, limit });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.body;
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ ...result, status: "deleted" });
};

const updateById = async (req, res, next) => {
  const { error } = schemas.putSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  const { id } = req.params;
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
