const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    eventPlatform: String,  // Added: Google Forms, Google Meet, Zoom, etc.
    eventLink: String       // Added: Actual link to the event (form or meeting link)
});

module.exports = mongoose.model("Event", EventSchema);
