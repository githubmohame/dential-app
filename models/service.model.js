import Schema, { model } from 'mongoose';

const ServiceSchema=Schema({
    name:{
        type:String,
        required:true,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z]+$/.test(v);
              },
              message:function(prop){
                return "it is not a valid name";
              }
        },
    }
});

export default Service=model("Services",ServiceSchema);