import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },  
  ageYears: {
    type: Number,
    // required: true,
    min: 1,
    max: 110,
    default: null,
  },
  ageMonths: {
    type: Number,
    // required: true,
    min: 0,
    max: 11,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

clientSchema.pre('validate', function(next) {
  if ((this.ageYears === null || this.ageYears === undefined) && 
      (this.ageMonths === null || this.ageMonths === undefined)) {
    this.invalidate('ageYears', 'Either age in years or age in months is required');
    this.invalidate('ageMonths', 'Either age in years or age in months is required');
  }

  if ((this.ageYears !== null && this.ageYears !== undefined) && 
      (this.ageMonths !== null && this.ageMonths !== undefined)) {
    this.invalidate('ageYears', 'You can only provide age in years or age in months, not both');
    this.invalidate('ageMonths', 'You can only provide age in years or age in months, not both');
  }

  next();
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
