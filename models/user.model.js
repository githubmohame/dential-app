import {Schema,model} from "mongoose";
import {genSalt,hash} from "bcrypt";
import ErrorClass from "../utilities/error.js";
const UserSchema=Schema({
    name:{
        tell:[],
        unique: true,
        type:[String,"you should send string"],
        required:[true,"you should send name"],
        minLength: [3, 'Must be at least 6, got {VALUE}'],
        maxLength: [50,"the name is too long"],
        validate:{
            validator: function(v) {
              //throw new Error('Need to get a Turbo Man for Christmas');
                return /^[a-zA-Z]+$/.test(v);
              },
              message:function(prop){
                return "it is not a valid name";
              }
        },
    },
    phone: {
        type: String,
        unique: true,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    email:{
        unique: true,
        type:[String,"the email not valid"],
        required:[true,"You should send email"],
        validate:{
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
              },
              message:function(prop){
                return "it is not a valid number";
              }
        }
    },
    password:{
        type:String,
        required:true,
    }
});
UserSchema.pre("save",async function(next){
  
      try {
        const salt = await genSalt(10);
        let hashedPassword = await hash(this.password, salt);
        this.password = hashedPassword;
              } catch (error) {
        return next(Error(new ErrorClass("user message error","admin message error",500)));
      }
      new Error({});

});


let User=model("User",UserSchema);
export default User;