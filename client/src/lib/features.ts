export interface Feature {
  id: string;
  name: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: "autoAC",
    name: "Automatic Climate Control",
    description: "Maintains desired temperature automatically by adjusting fan speed and temperature settings.",
  },
  {
    id: "adas",
    name: "Advanced Driver Assistance Systems",
    description: "Collection of safety features including lane departure warning, automatic emergency braking, and adaptive cruise control.",
  },
  {
    id: "keylessEntry",
    name: "Keyless Entry",
    description: "Allows you to lock and unlock your car without using a physical key.",
  },
  {
    id: "parkingSensors",
    name: "Parking Sensors",
    description: "Helps detect obstacles while parking using ultrasonic sensors.",
  },
  {
    id: "blindSpotMonitoring",
    name: "Blind Spot Monitoring",
    description: "Alerts you when vehicles are in your blind spots to prevent accidents during lane changes.",
  },
];
