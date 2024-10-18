import { Schema ,model} from "mongoose";
import ErrorCustome from "../utilities/error.js";
//
const AdminSchema=Schema({
    name:{
        type:[String,"you should send string"],
        required:true,
        minLength: [3, 'Must be at least 6, got {VALUE}'],
        maxLength: [50,"the name is too long"],
        validate:{
            validator: function(v) {
                return /^[a-zA-Z]+$/.test(v);
              },
              message:function(prop){
                return "it is not a valid name";
              }
        },
    },
    phone: {
      unique: true,
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    email:{
        type:[String,"you should send string"],
        required:true,
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
let Admin=model("Admins",AdminSchema)
AdminSchema.pre("save",async function(next){
  let u=await Admin.find({email:this.email});
  if(u.length){
    let err1=new Error();
   err1.res=ErrorCustome("this email is already used");
    next(err1);
  }
  u=await Admin.find({phone:this.phone});
  if(u.length){
    let err1=new Error();
    err1=err1.res=ErrorCustome("this phone is already used");
    next(err1);
  }
  try {
    const salt = await genSalt(10);
    let hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
          } catch (error) {
    return next(Error(new ErrorClass("user message error","admin message error",500)));
  }
  new Error({});

});


export default Admin;
let i=new Admin();
