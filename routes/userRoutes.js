const express = require("express");
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/VerifyJWT");

const router = express.Router();

router.use(verifyJWT);
router.get("/", usersController.getAllUsers);

module.exports = router;
