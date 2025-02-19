import { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { carFilterSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/cars", async (_req, res) => {
    const cars = await storage.getCars();
    res.json(cars);
  });

  app.post("/api/cars/filter", async (req, res) => {
    try {
      const filter = carFilterSchema.parse(req.body);
      const cars = await storage.getFilteredCars(filter);
      res.json(cars);
    } catch (error) {
      res.status(400).json({ error: "Invalid filter parameters" });
    }
  });

  return createServer(app);
}
