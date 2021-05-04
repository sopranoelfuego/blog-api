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
  updatePassword
} = require("../controller/auth.js");
const { protectRoute, checkTheRole } = require("../middlewares/auth.js");
router.route("/").get(protectRoute, getUsers).delete(protectRoute,checkTheRole('admin'),deleteUsers);
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/:id").get(protectRoute, getUser);
router.route("/updateUserDetails").put(protectRoute,updateUserDetails);
router.route("/me/getme").get(protectRoute,whoIam);
router.route("/logout").post(protectRoute, logout);
router.route('/updatepassword').post(protectRoute,updatePassword)

module.exports = router;
