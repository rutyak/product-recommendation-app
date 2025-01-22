const Event = require("../model/UserTracker"); 

const trackerController = async (req, res) => {
  try {
    const { eventType, eventData, timestamp, userId } = req.body;

    if (!eventType || !eventData) {
      return res.status(400).json({
        message: "Missing required fields: eventType and eventData are mandatory.",
      });
    }

    const newEvent = new Event({
      eventType,
      eventData,
      timestamp: timestamp || Date.now(), 
      userId: userId || null, 
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event tracked successfully.",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error in trackerController:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = trackerController;
