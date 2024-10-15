import { Schema,model } from "mongoose";
const AdminsUsersAppointsSchema=Schema({
    adminService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminsServices'
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      },
    date:{
        type:Date,
        validate: {
            validator: function(v) {
             let diffDate=v-Date.now();
             if(diffDate>0){
                return true;
             }
             else{
                return false;
             }
            },
            message:function(prop){
                return "the date should be bigger than this day";
            }
          },
    }
});
const AdminsUsersAppoints=model("AdminsUsersAppoints",AdminsUsersAppointsSchema);
export default AdminsUsersAppoints;