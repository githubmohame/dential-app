import { Schema ,model} from "mongoose";
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
    }
});

export default Admin=model("Admins",AdminSchema);