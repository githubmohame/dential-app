import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Set the default logging level
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamps in logs
    winston.format.json() // Format logs as JSON
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new winston.transports.File({ filename: "combined.log" }), // Log all messages to a file
  ],
});

export default logger;
