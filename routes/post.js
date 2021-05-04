const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  deletePosts,
  getPost,
  postByCategory
} = require("../controller/post.js");
const {protectRoute,checkTheRole} = require("../middlewares/auth.js");
const router = express.Router();
const multer = require("multer");

// define the storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getPosts)
  .post(protectRoute, upload.single("file"), checkTheRole('author','admin'),createPost)
  .delete(protectRoute,checkTheRole('admin'), deletePosts);

router
  .route("/:id")
  .get(protectRoute, getPost)
  .post(protectRoute,checkTheRole('author'), updatePost)
  .delete(protectRoute, checkTheRole('author','admin'),deletePost);

router.route("/sort/:category").post(protectRoute,postByCategory);

module.exports = router;
