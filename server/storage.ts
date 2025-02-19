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
        name: "Nexon",
        brand: "Tata",
        price: "1199000",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://nexon.tatamotors.com/",
        hasAutoAC: true,
        hasADAS: false,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: false,
      },
      {
        id: 2,
        name: "City",
        brand: "Honda",
        price: "1589000",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.hondacarindia.com/honda-city",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 3,
        name: "XUV700",
        brand: "Mahindra",
        price: "1399000",
        seatingCapacity: 7,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://auto.mahindra.com/suv/xuv700",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 4,
        name: "Fortuner",
        brand: "Toyota",
        price: "3500000",
        seatingCapacity: 7,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.toyotabharat.com/showroom/fortuner/",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 5,
        name: "Creta",
        brand: "Hyundai",
        price: "1099000",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.hyundai.com/in/en/find-a-car/creta/highlights",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: false,
      },
      {
        id: 6,
        name: "Virtus",
        brand: "Volkswagen",
        price: "1149000",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.volkswagen.co.in/en/models/virtus.html",
        hasAutoAC: true,
        hasADAS: false,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: false,
      },
      {
        id: 7,
        name: "Safari",
        brand: "Tata",
        price: "1659000",
        seatingCapacity: 7,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://safari.tatamotors.com/",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 8,
        name: "Carnival",
        brand: "Kia",
        price: "3500000",
        seatingCapacity: 7,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.kia.com/in/our-vehicles/carnival/features.html",
        hasAutoAC: true,
        hasADAS: true,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: true,
      },
      {
        id: 9,
        name: "Thar",
        brand: "Mahindra",
        price: "1399000",
        seatingCapacity: 4,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://auto.mahindra.com/suv/thar",
        hasAutoAC: true,
        hasADAS: false,
        hasKeylessEntry: true,
        hasParkingSensors: true,
        hasBlindSpotMonitoring: false,
      },
      {
        id: 10,
        name: "Verna",
        brand: "Hyundai",
        price: "1089000",
        seatingCapacity: 5,
        image: "https://images.unsplash.com/photo-1675467129033-a2e1b188ae5b",
        officialLink: "https://www.hyundai.com/in/en/find-a-car/verna/highlights",
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