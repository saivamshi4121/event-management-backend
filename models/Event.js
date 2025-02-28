const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    googleFormLink: String,
});

module.exports = mongoose.model("Event", EventSchema);
