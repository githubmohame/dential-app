
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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
date :{
    type : String,
    required : true
} ,
note :{
  type : String
}
})
    export const Booking = mongoose.model('Booking', bookingSchema);
