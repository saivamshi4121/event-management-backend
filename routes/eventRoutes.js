const express = require("express");
const { getEvents, createEvent } = require("../controllers/eventController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("GET /events route hit");
    next();
}, authMiddleware, getEvents);

router.post("/", (req, res, next) => {
    console.log("POST /events route hit");
    next();
}, authMiddleware, adminMiddleware, createEvent);

module.exports = router;
