import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarFilterForm } from "@/components/CarFilterForm";
import { CarCard } from "@/components/CarCard";
import { apiRequest } from "@/lib/queryClient";
import type { Car, CarFilter } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Recommendations() {
  const [_, setLocation] = useLocation();
  const [filter, setFilter] = useState<CarFilter | null>(null);

  const { data: filteredCars, isLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars/filter", filter],
    enabled: !!filter,
    queryFn: async () => {
      const res = await apiRequest("POST", "/api/cars/filter", filter);
      return res.json();
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CarFilterForm onFilter={setFilter} />
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCars?.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}