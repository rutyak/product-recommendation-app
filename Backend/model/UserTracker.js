const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
  },
  eventData: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
  userId: {
    type: String,
    required: false,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
