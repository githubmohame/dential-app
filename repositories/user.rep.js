import ErrorCustome from "../utilities/error.js";
import getErrorSchema from "../utilities/get_errors_schema.js";
//import User from "../models/user.model.js";
class UserRepos {
  constructor(User, next) {
    this.next = next;
    this.User = User;
  }
  async getUserByEmail(email) {
    console.log(email);
    let res = await this.User.find({ email: email });
    console.log(res);
    if (res) {
      return res;
      //return ;
    }
    let err1 = new Error();
    err1.res = new ErrorCustome("the user not found", "User Repos", 200);
    this.next(err1);
  }
  async getUserById(id) {
    let res = await this.User.findById(id);
    console.log(res);
    if (res) {
      return res;
      //return ;
    }
    let err1 = new Error();
    err1.res = new ErrorCustome("the user not found", "admin", 200);
    await this.next(err1);
    return;
  }
  async deleteUser(email) {
    let res = await this.User.deleteOne({ email: email });
    if (res.deletedCount == 0) {
      return { error: 0, res: "User not found" };
    }
    return { error: 1, msgErr: "the user deleted" };
  }
  async addUser(email, password, name, phone) {
    let user = new this.User({
      email: email,
      password: password,
      name: name,
      phone: phone,
    });
    let err = user.validateSync();
    if (err != null) {
      let message = getErrorSchema(err);
      let err1 = new Error();
      err1.res = new ErrorCustome(message, "admin", 200);
      await this.next(err1);
      return;
    }
    try {
      await user.save();
      console.log("kkiuui");
    } catch (e) {
      console.log(e);
      this.next(e);
      return;
    }
    return { error: 0, res: "the user created" };
  }
  async updateUser(email, map1) {
    let err = await this.User.updateOne({ email: email }, map1, {
      runValidators: true,
    });
    //let user=new this.User({...user1,...map1});

    //let err=   user.validateSync();
    if (err != null) {
      let message = getErrorSchema(err);
      let err1 = new Error();
      err1.res = new ErrorCustome(message, "admin", 200);
      await this.next(err1);
      return;
    }
    return { error: 0, res: "the user update" };
  }
}

export default UserRepos;
