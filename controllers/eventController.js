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
        let { name, date, location, description } = req.body;

        // ✅ Trim input values to remove unnecessary spaces
        name = name?.trim();
        date = date?.trim();
        location = location?.trim();
        description = description?.trim();

        // ✅ Validate required fields
        if (!name || !date || !location) {
            return res.status(400).json({ message: "Name, date, and location are required" });
        }

        // ✅ Save event to database
        const newEvent = new Event({ name, date, location, description });
        await newEvent.save();

        res.status(201).json({ message: "🎉 Event created successfully", event: newEvent });
    } catch (error) {
        console.error("🔥 Error creating event:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Export Functions
module.exports = { getEvents, createEvent };
