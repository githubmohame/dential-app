class UserAdminAppointController {
  constructor(userAdminAppointRepo, next, userAdminAppoint) {
    this.userAdminAppointRepo = userAdminAppointRepo;
    this.next = next;
    this.userAdminAppoint = userAdminAppoint;
  }
  async getAppointmentUser(userId) {
    return this.userAdminAppointRepo(
      this.userAdminAppoint,
      neext
    ).getUserAppoint(userId);
  }
  async getAppointmentAdmin(adminId, adminServices) {
    return this.userAdminAppointRepo(
      this.userAdminAppoint,
      neext
    ).getAdminAppoint(adminId, adminServices);
  }
  async addAppointment(userId, adminServiceId, date) {
    this.userAdminAppointRepo(this.userAdminAppoint, neext).addAppointment(
      userId,
      adminServiceId,
      date
    );
  }
  async deleteAppointment(appointmentId) {
    this.userAdminAppointRepo(this.userAdminAppoint, neext).deleteAppointment(
      appointmentId
    );
  }
  async updateAppointment(appointmentId, map) {
    this.userAdminAppointRepo(
      this.userAdminAppoint,
      this.next
    ).updateAppointment(appointmentId, map);
  }
}
