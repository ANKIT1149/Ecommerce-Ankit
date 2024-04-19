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
          unique: true,
     },
     age: {
        type: String,
        require: true,
     },
     avatar: {
         type: String,
         default: 'https://tse3.mm.bing.net/th?id=OIP.xWMJdQK-Pg3nWBOC3fD7BgHaJN&pid=Api&P=0&h=180',
     }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;