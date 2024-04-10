import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
     username: {
         type: String,
         required: true,
         unique: true,
     },
     email: {
         type: String,
         required: true,
         unique: true,
     },
     password: {
         type: String,
         required: true,
          
     },
     phone: {
          type: String,
          required: true,
          unique: true
     },
     age: {
         type: Boolean,
         required: true,
     }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;