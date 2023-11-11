const express = require("express");
const router = express.Router();

const { roles, insertRole } = require("../controllers/role");

router.get("/api/roles", roles);
router.post("/api/createRoles", insertRole);

module.exports = router;
