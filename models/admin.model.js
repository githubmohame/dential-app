import { genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";
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
                return /^[a-zA-Z ]+$/.test(v);
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
AdminSchema.post("validate",async function(doc,next){
  console.log("tell me go878")
  let u=await Admin.find({email:doc.email});
  console.log(u);
  console.log("********************************");
  if(u.length){
    let err1=new Error();
   err1.res=new ErrorCustome("this email is already used","",200);
    next(err1);
    return;
  }
  u=await Admin.find({phone:this.phone});
  if(u.length){    
    let err1=new Error();
   err1.res=new ErrorCustome("this phone is already used","",200);
    next(err1);
    return;
  }
 
});
AdminSchema.pre('save',async function(next) {
  try {
    const salt = await genSalt(10);
    let hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    console.log(this.password);
          } catch (error) {
            console.log(error)
            let err1=new Error();
            console.log(error);
            err1.res=new ErrorCustome("user message error","admin message error",500)
    return next(err1);
  }

})
let Admin=model("Admins",AdminSchema)
export default Admin;
 
 