const express = require("express");
const router = express.Router();

const { roles, insertRole } = require("../controller/role");

router.get("/api/roles", roles);
router.post("/api/createRoles", insertRole);

module.exports = router;
