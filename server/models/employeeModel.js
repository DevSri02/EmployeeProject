const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  mobile: { type: String, required: true, trim: true, unique: true },
  designation: {
    type: String,
    required: true,
    enum: ["Manager", "Sales", "HR"],
    trim: true,
  },
  gender: { type: String, required: true, enum: ["M", "F"], trim: true },
  course: {
    type: String,
    required: true,
    enum: ["MCA", "BCA", "BSC"],
    trim: true,
  },
  imageURL: { type: String, required: false, trim: true },
  createDate: { type: Date, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
