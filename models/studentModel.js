const mongoose = require("mongoose");
const slugify = require("slugify");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "An employee must have a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "An employee must have a last name"],
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  grade: {
    type: Number,
    required: false,
    min: 0,
    max: 12,
  },
  schoolEmail: {
    type: String,
    required: true,
  },
  personalEmail: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Inactive", "Graduate"],
  },
  customID: {
    type: String,
    required: false,
  },
  mainPhoto: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  slug: String,
  // applicationRecords: [String],
  // birthRecords: [String],
  // healthRecords: [String],
  // transcripts: [String],
  // images: [String],
  // testScores: [String],
  // otherRecords: [String],
});

studentSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  this.slug = slugify(this.fullName, { lower: true });
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
