class UserAdminAppoint {
  constructor(next, userAdminAppoint) {
    this.next = next;
    this.userAdminAppoint = userAdminAppoint;
  }
  async getUserAppoint(adminId, adminServices) {
    let services = await adminServices.find({ admin: adminId });
    // return  this.userAdminAppoint.find({user:userId});
    let res = [];
    for (let i = 0; i < services.length; i++) {
      res = [
        ...res,
        ...this.userAdminAppoint.find({ adminService: services[i] }),
      ];
    }
    return res;
  }
  async addUserAdminAppoint(userId, adminServiceId, date) {
    let userAdminAppoint = new this.userAdminAppoint({
      user: userId,
      adminService: adminServiceId,
      date: date,
    });
    let err = userAdminAppoint.validateSync();
    if (err != null) {
      let message = getErrorSchema(err);
      let err1 = new Error();
      err1.res = new ErrorCustome(message, "admin", 400);
      this.next(err1);
      return;
    }
    userAdminAppoint.save();
  }
  async deleteUserAdminAppoint(id) {
    await this.userAdminAppoint.delete({ __id: id });
  }
  async updateUserAdminAppoint(id, map) {
    await this.userAdminAppoint.update({ __id: id }, map);
  }
}
