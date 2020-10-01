const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const DB = require("../db");
const { SALT_ROUNDS } = require("../secret");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: {
    type: String,
   // required: true,
  },
  password_records: {
    type: [
      {
        old_password: { type: String },
        new_password: { type: String },
        change_date: { type: Date, default: Date.now() },
      },
    ],
  },
  pimage: {
    type: String,
    default: "",
  },

  otp: {
    type: Number,
  },
  
  role: {
    type: String,
  },
  
  
  
});

userSchema
  .virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (val) {
    this._password = val;
     console.log("password val::",val);

    const salt = bcrypt.genSaltSync(10);

    
    
    this.passwordHash = bcrypt.hashSync(this._password, salt);
 
    if (this.isNew) {
      this.password_records = [
        {
          old_password: this.passwordHash,
          new_password: this.passwordHash,
          change_date: new Date().toDateString(),
        },
      ];
    }
  });

userSchema
  .virtual("passwordConfirmation")
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (val) {
    this._passwordConfirmation = val;
  });

userSchema.path("passwordHash").validate(function () {
  if (this._password || this._passwordConfirmation) {
    if (!validator.isByteLength(this._password, { min: 6, max: undefined })) {
      this.invalidate("password", "Password must be at least 6 characters.");
    }

    // if (this._password !== this._passwordConfirmation) {
    //   this.invalidate("passwordConfirmation", "Passwords do not match.");
    // }
  }

  if (this.isNew && !this._password) {
    this.invalidate("password", "required");
  }
}, null);

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  console.log(this.passwordHash);
  bcrypt.compare(candidatePassword, this.passwordHash, function (err, isMatch) {
    console.log(isMatch);
    if (err) return cb(err, null);
    cb(null, isMatch);
  });
};

userSchema.methods.updatePasswordHistory = function (data) {
  this.password_records.push(data);
};

module.exports = DB.customerDB.model("users", userSchema);
