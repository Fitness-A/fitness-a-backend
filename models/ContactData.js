const mongoose = require("mongoose");

const ContactDataSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    subject: { type: String, required: false},
    message: { type: String, required: false},
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactData", ContactDataSchema);