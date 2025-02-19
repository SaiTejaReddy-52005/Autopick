import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  seatingCapacity: integer("seating_capacity").notNull(),
  image: text("image").notNull(),
  officialLink: text("official_link").notNull(),
  hasAutoAC: boolean("has_auto_ac").notNull(),
  hasADAS: boolean("has_adas").notNull(),
  hasKeylessEntry: boolean("has_keyless_entry").notNull(),
  hasParkingSensors: boolean("has_parking_sensors").notNull(),
  hasBlindSpotMonitoring: boolean("has_blind_spot_monitoring").notNull(),
});

export const insertCarSchema = createInsertSchema(cars);
export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof cars.$inferSelect;

export const carFilterSchema = z.object({
  minPrice: z.number().min(0),
  maxPrice: z.number().min(0),
  seatingCapacity: z.number().min(2).max(9),
  features: z.array(z.string())
});

export type CarFilter = z.infer<typeof carFilterSchema>;
