const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationWizard: { type: String },
    company_name: { type: String },
    job_title: { type: String },
    country: { type: String },
    postal_code: { type: String },
    avatar: { type: String },
    premium: { type: Boolean },
    industry: { type: String }
  },
  { timestamps: true }
);

// Defining a custom .toJSON() method on the Mongoose schema and delete the properties which we don’t want to return in the response
UserSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("users", UserSchema);
