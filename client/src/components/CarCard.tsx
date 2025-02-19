import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@shared/schema";
import { Check, ExternalLink } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const price = parseFloat(car.price).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardTitle className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{car.brand} {car.name}</h3>
              <p className="text-2xl font-bold text-primary">{price}</p>
            </div>
          </div>
        </CardTitle>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-muted-foreground">
            Seating Capacity: {car.seatingCapacity}
          </p>
          <div className="space-y-1">
            {car.hasAutoAC && (
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-primary" />
                Auto AC
              </div>
            )}
            {car.hasADAS && (
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-primary" />
                ADAS
              </div>
            )}
            {car.hasKeylessEntry && (
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-primary" />
                Keyless Entry
              </div>
            )}
            {car.hasParkingSensors && (
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-primary" />
                Parking Sensors
              </div>
            )}
            {car.hasBlindSpotMonitoring && (
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-primary" />
                Blind Spot Monitoring
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => window.open(car.officialLink, "_blank")}
        >
          View Official Page
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}