const router = require("express").Router();

const {
  register,
  login,
  getUsers,
  deleteUsers,
  getUser,
  updateUserDetails,
  whoIam,
  logout,
} = require("../controller/auth.js");
const { protectRoute, checkTheRole } = require("../middlewares/auth.js");
router.route("/").get(protectRoute, getUsers).delete(deleteUsers);
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/:id").get(protectRoute, getUser);
router.route("/updateUserDetails").put(updateUserDetails);
router.route("/whoIam").get(whoIam);
router.route("/logout").post(protectRoute, logout);

module.exports = router;
