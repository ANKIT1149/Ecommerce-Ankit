import mongoose from "mongoose";

const EcomListening = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description : {
     type: String,
     required: true,
  },

  type: {
     type: String,
     required: true,
  },

  regularPrice: {
    type: Number,
    required: true,
  },

  discountPrice: {
    type: Number,
    required: true,
  },

  sellerName: {
     type: String,
     required: true
  },

  address: {
     type: String,
     required: true
  },

  contactNumber: {
     type: Number,
     required: true,
  },

  imageUrl: {
     type: Array,
     required: true
  },
   
  size: {
    type: String,
    required: true,
  },

  offer: {
    type: Boolean,
    required: true,
  },

  userRef: {
    type: String,
    required: true,
  },
  
}, {timestamps: true});

const Listening = mongoose.model('Listening', EcomListening);

export default Listening;
