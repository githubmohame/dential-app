import ErrorCustome from "../utilities/error.js";

class UserController {
  constructor(next, userRepos, user) {
    this.next = next;
    this.userRepos = userRepos;
    this.user = user;
  }
  async getUserByEmail(email) {
    return await new this.userRepos(this.user, this.next).getUserByEmail(email);
  }
  async getUserById(id) {
    return await new this.userRepos(this.user, this.next).getUserById(id);
  }
  async createUser(email, password, name, phone) {
    try {
      return await new this.userRepos(this.user, this.next).addUser(
        email,
        password,
        name,
        phone
      );
    } catch (e) {
    }
  }
  async deleteUser(email) {
    new this.userRepos(this.user, this.next).deleteUser(email);
  }
  async updateUser(email, map) {
    return await new this.userRepos(this.user, this.next).updateUser(
      email,
      map
    );
  }
}
export default UserController;
