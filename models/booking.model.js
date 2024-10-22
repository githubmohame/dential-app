
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema( {


    appointmentId:{
        type : String, 
        required : true
    }
    ,user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true  // Duration in minutes
    },
date :{
    type : String,
    required : true
} 
})
    export const Booking = mongoose.model('Booking', bookingSchema);
