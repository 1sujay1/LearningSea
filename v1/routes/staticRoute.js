const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/index.html"));
});
router.get("/about-us", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/about-us.html"));
});
router.get("/courses", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/courses.html"));
});
router.get("/contact-us", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/contact-us.html"));
});
router.get("/sign-in", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/sign-in.html"));
});
router.get("/sign-up", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/sign-up.html"));
});
router.get("/blog", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/blog.html"));
});
router.get("/blog-details", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/blog-details.html"));
});
router.get("/faq", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/faq.html"));
});
router.get("/privacy-policy", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/privacy.html"));
});
router.get("/terms-of-use", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/terms.html"));
});
router.get("/error", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/error-404.html"));
});
router.use(function (req, res) {
  res
    .status(404)
    .sendFile(path.join(__dirname + "../../../public/error-404.html"));
});

module.exports = router;
