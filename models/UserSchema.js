// models/User.js
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // bcrypt hash
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    favourites: [{ type: String }], // array of URL strings
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
