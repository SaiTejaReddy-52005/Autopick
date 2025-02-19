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
        price: "39990",
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
        price: "22550",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1558368718-808f08b6d9a8",
        officialLink: "https://automobiles.honda.com/civic",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: false,
      },
      {
        id: 3,
        name: "XC40",
        brand: "Volvo",
        price: "36350",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675775943587-b210bb2ad9a3",
        officialLink: "https://www.volvocars.com/us/cars/xc40-electric/",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 4,
        name: "Tucson",
        brand: "Hyundai",
        price: "27250",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1681245036726-2002de7752d9",
        officialLink: "https://www.hyundaiusa.com/us/en/vehicles/tucson",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 5,
        name: "Telluride",
        brand: "Kia",
        price: "35890",
        seatingCapacity: 8,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.kia.com/us/en/telluride",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 6,
        name: "Highlander",
        brand: "Toyota",
        price: "36420",
        seatingCapacity: 8,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.toyota.com/highlander/",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 7,
        name: "CX-5",
        brand: "Mazda",
        price: "26700",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.mazdausa.com/vehicles/cx-5",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: false,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 8,
        name: "A4",
        brand: "Audi",
        price: "40300",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.audiusa.com/us/web/en/models/a4/a4-sedan/2024/overview.html",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      }
    ];
  }

  async getCars(): Promise<Car[]> {
    return this.cars;
  }

  async getFilteredCars(filter: CarFilter): Promise<Car[]> {
    return this.cars.filter((car) => {
      const carPrice = parseFloat(car.price);
      const priceMatch = carPrice >= filter.minPrice && carPrice <= filter.maxPrice;
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