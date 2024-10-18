class AdminController {
  constructor(next, adminRepos, admin) {
    this.next = next;
    this.adminRepos = adminRepos;
    this.admin = admin;
  }
  async createAdmin(email, password, name, phone) {
    try {
      new this.adminRepos(this.admin, this.next).addAdmin(
        email,
        password,
        name,
        phone
      );
      res.send({ msg: "admin created" });
    } catch (e) {}
  }
  async getAdmin(email) {
    new this.adminRepos(this.user, this.next).getAdminByEmail(email);
  }
  async deleteAdmin(email) {
    new this.adminRepos(this.user, this.next).deleteAdmin(email);
  }
  async updateAdmin(email, req) {
    new this.adminRepos(this.user, this.next).updateUser(email, req.body);
  }
}
export default AdminController;
