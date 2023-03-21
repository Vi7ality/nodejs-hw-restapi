const express = require("express");
const { isValidId, authenticate } = require("../../middlewares/index");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

router.put("/:id", authenticate, isValidId, ctrl.updateById);

router.patch("/:id/favorite", authenticate, isValidId, ctrl.updateFavorite);

module.exports = router;
