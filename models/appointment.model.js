import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  months: {
    year: {
      type: Number,  
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    days: {
      day: {
        type: Number,
        required: true
      },
      times: {
        timeSlot: {
          type: String,
          required: true
        },
        appointment: {
          user: {
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
          },
          note :{
            type : String
        }
        }
      }
    }
  },
  bookedTimes: {
    year: {
      type: Number,  
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    day: {
      type: Number,
      required: true
    },
    times: {
      type: [String],  
      required: true
    }
  }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
