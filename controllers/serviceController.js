import ErrorCustome from "../utilities/error.js";
import ServiceRepo from "../repositories/serviceRepo.js";

class ServiceController {
  constructor(Service, next) {
    this.serviceRepo = new ServiceRepo(Service);
    this.next = next;
  }

  async getAllServices(req, res) {
    try {
      const services = await this.serviceRepo.getAllService();
      res.status(200).json(services);
    } catch (error) {
      console.error("Error in getAllServices:", error);
      this.next(
        new ErrorCustome("Error fetching services.", "Service Controller", 500)
      );
    }
  }

  async deleteService(req, res) {
    const { name } = req.body;
    try {
      const result = await this.serviceRepo.deleteService(name);
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No service found with that name." });
      }
      res.status(200).json({ message: "Service deleted successfully." });
    } catch (error) {
      console.error("Error in deleteService:", error);
      this.next(
        new ErrorCustome("Error deleting service.", "Service Controller", 500)
      );
    }
  }

  async addService(req, res) {
    const { name, cost } = req.body;
    try {
      await this.serviceRepo.addService(name, cost);
      res.status(201).json({ message: "Service added successfully." });
    } catch (error) {
      console.error("Error in addService:", error);
      this.next(
        new ErrorCustome("Error adding service.", "Service Controller", 500)
      );
    }
  }

  async updateServiceCost(req, res) {
    const { name, newCost } = req.body;
    try {
      await this.serviceRepo.updateServiceCost(name, newCost);
      res.status(200).json({ message: "Service cost updated successfully." });
    } catch (error) {
      console.error("Error in updateServiceCost:", error);
      this.next(
        new ErrorCustome(
          "Error updating service cost.",
          "Service Controller",
          500
        )
      );
    }
  }
}

export default ServiceController;
