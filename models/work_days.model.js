import { Schema ,model} from "mongoose";
import ErrorCustome from "../utilities/error.js";
const TimeSchema=new Schema({ hour:{
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
    type:Number,
    required:true,
    validate: {
        validator: function(v) {
         if(v>=0&&v<60){
            return true;
         }
         return false;
        },
        message: props => `the mintue should be between 0 and 59 `
      }
}});
const WorkDaysSchema=new Schema({
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
        ref: 'admin' }
});
console.log(typeof WorkDaysSchema);
WorkDaysSchema.index({day:1,admin:true,"start.hour":true,"end.hour":true},{unique:true});
WorkDaysSchema.pre("save",function(next){
    if(this.start.hour-this.end.hour<=0){
        let err1=new Error();
        err1.res=new ErrorCustome("the time not valid")
        next(err1);

}
});
const WorkDays=model("WerkDays",WorkDaysSchema);

export default WorkDays;