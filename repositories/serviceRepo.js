import ErrorCustome from "../utilities/error.js";

class ServiceRepo {
  constructor(Service) {
    this.Service = Service;
  }

  async getAllService() {
    try {
      let res = await this.Service.find();
      return res;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }

  async deleteService(name) {
    try {
      let res = await this.Service.deleteOne({ name });
      if (res.deletedCount === 0) {
        console.log("No service found with that name.");
      } else {
        console.log("Service deleted successfully.");
      }
      return res;
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  }

  async addService(name, cost) {
    const service = new this.Service({ name, cost });

    try {
      await service.save();
      console.log("Service added successfully.");
    } catch (error) {
      console.error("Error adding service:", error);
      throw error;
    }
  }

  async updateServiceCost(name, newCost) {
    try {
      let res = await this.Service.updateOne(
        { name },
        { $set: { cost: newCost } }
      );

      if (res.modifiedCount === 0) {
        console.log("No service found or cost was already the same.");
      } else {
        console.log("Service cost updated successfully.");
      }
    } catch (error) {
      console.error("Error updating service cost:", error);
      throw error;
    }
  }
}

export default ServiceRepo;
