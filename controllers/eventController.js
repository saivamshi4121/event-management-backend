const Event = require("../models/Event"); // Ensure you have the Event model

// ✅ Fetch all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();  // Fetch all events from DB
        res.status(200).json(events);
    } catch (error) {
        console.error("🔥 Error fetching events:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Create a new event
const createEvent = async (req, res) => {
    try {
        let { title, date, eventPlatform, eventLink, description } = req.body;

        // ✅ Trim input values to remove unnecessary spaces
        title = title?.trim();
        date = date?.trim();
        eventPlatform = eventPlatform?.trim();
        eventLink = eventLink?.trim();
        description = description?.trim();

        // ✅ Validate required fields
        if (!title || !date || !eventPlatform || !eventLink) {
            return res.status(400).json({ message: "Title, eventPlatform, and eventLink are required" });
        }

        // ✅ Save event to database
        const newEvent = new Event({ title, date, eventPlatform, eventLink, description });
        await newEvent.save();

        res.status(201).json({ message: "🎉 Event created successfully", event: newEvent });
    } catch (error) {
        console.error("🔥 Error creating event:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Export Functions
module.exports = { getEvents, createEvent };
