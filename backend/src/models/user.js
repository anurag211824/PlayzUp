import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },

    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Password Hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Match User entered password to Hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// access token


// # 🔐 Access Token
// # An access token is a short-lived key that allows a user or app to access protected resources 
// (like your data or APIs).

// # Think of it like a temporary pass you get after logging in.

// # 🧠 Example:
// # When you log in to Instagram:
// # Instagram’s server gives your app an access token.
// # That token is then sent with every request you make (like posting a photo, liking, or commenting).
// # Once it expires (usually after 15–60 minutes), it becomes invalid.

// # 🧩 Used for:
// # Authenticating API requests
// # Identifying the logged-in user
// # Protecting endpoints from unauthorized access

// # ⚙ Example in code:
// # Authorization: Bearer <access_token>
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// refresh token
// # ♻️ Refresh Token
// # A refresh token is a long-lived key that allows you to get a new access token when the old one 
// expires — without logging in again.
// # Think of it as your permanent membership card, while the access token is your temporary entry ticket.

// # 🧠 Example:
// # You log in → Server gives:
// # access_token (valid for 15 mins)
// # refresh_token (valid for 7 days or more)
// # After 15 mins, your app automatically uses the refresh_token to request a new access_token.
// # The user stays logged in — no need to re-enter credentials.

// # 🔁 How they work together
// # Step	Action	Token Used
// # 1	User logs in	—
// # 2	Server returns both tokens --	Access + Refresh
// # 3	User uses access token for API requests	-- Access Token
// # 4	Access token expires	—
// # 5	App uses refresh token to get new access token	--- Refresh Token
// # 6	Continue session without logging in again ---	New Access Token

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
