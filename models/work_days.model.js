import { Schema ,model, models} from "mongoose";

const TimeSchema=Schema({ hour:{

    type:Number,
    required:true,
    validate: {
        validator: function(v) {
         if(v>=0&&v<24){
            return true;
         }
         return false;
        },
        message: props => `the hour should be between 0 and 23`
      }
},
mintue:{
    type:TimeSchema,
    required:true,
    validate: {
        validator: function(v) {
         if(v>=0&&v<24){
            return true;
         }
         return false;
        },
        message: props => `the hour should be between 0 and 59`
      }
}});

const WerkDaysSchema=Schema({
    start:{
        type:TimeSchema,
        required:true,
    },
    end:{
        type:TimeSchema,
        required:true,
    },
    day:{
        type:String,
        enum: {
            values: ['Sun', 'Mon',"Tue","Wed","Thu","Fri","Sat"],
            message: 'enter only the  abbreviation of week days'
          }
    },
    admin:{ 
        type: Schema.Types.ObjectId, 
        ref: 'Story' }
});
const WerkDays=model("WerkDays",WerkDaysSchema)