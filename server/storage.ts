import { cars, type Car, type InsertCar, type CarFilter } from "@shared/schema";

export interface IStorage {
  getCars(): Promise<Car[]>;
  getFilteredCars(filter: CarFilter): Promise<Car[]>;
}

export class MemStorage implements IStorage {
  private cars: Car[];

  constructor() {
    this.cars = [
      {
        id: 1,
        name: "Model 3",
        brand: "Tesla",
        price: 39990,
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1681245027457-70100eac35e2",
        officialLink: "https://www.tesla.com/model3",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 2,
        name: "Civic",
        brand: "Honda",
        price: 22550,
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1558368718-808f08b6d9a8",
        officialLink: "https://automobiles.honda.com/civic",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: false,
      },
      // Add more mock cars here
    ];
  }

  async getCars(): Promise<Car[]> {
    return this.cars;
  }

  async getFilteredCars(filter: CarFilter): Promise<Car[]> {
    return this.cars.filter((car) => {
      const priceMatch = car.price >= filter.minPrice && car.price <= filter.maxPrice;
      const seatingMatch = car.seatingCapacity === filter.seatingCapacity;
      
      const featureMatch = filter.features.every((feature) => {
        switch (feature) {
          case "autoAC": return car.hasAutoAC;
          case "adas": return car.hasADAS;
          case "keylessEntry": return car.hasKeylessEntry;
          case "parkingSensors": return car.hasParkingSensors;
          case "blindSpotMonitoring": return car.hasBlindSpotMonitoring;
          default: return true;
        }
      });

      return priceMatch && seatingMatch && featureMatch;
    });
  }
}

export const storage = new MemStorage();
