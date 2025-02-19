import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FeaturePopover } from "./FeaturePopover";
import { carFilterSchema, type CarFilter } from "@shared/schema";
import { features } from "@/lib/features";

interface CarFilterFormProps {
  onFilter: (filter: CarFilter) => void;
}

export function CarFilterForm({ onFilter }: CarFilterFormProps) {
  const form = useForm<CarFilter>({
    resolver: zodResolver(carFilterSchema),
    defaultValues: {
      minPrice: 1000000, // 10 Lakhs
      maxPrice: 2000000, // 20 Lakhs
      seatingCapacity: 5,
      features: []
    }
  });

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Cars</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFilter)} className="space-y-6">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                      placeholder="Enter minimum price"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Current: {formatPrice(field.value)}
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                      placeholder="Enter maximum price"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Current: {formatPrice(field.value)}
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seatingCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seating Capacity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={2} 
                      max={9} 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Smart Features</FormLabel>
              {features.map((feature) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(feature.id)}
                          onCheckedChange={(checked) => {
                            const value = field.value || [];
                            checked
                              ? field.onChange([...value, feature.id])
                              : field.onChange(value.filter((id) => id !== feature.id));
                          }}
                        />
                      </FormControl>
                      <span className="flex items-center">
                        {feature.name}
                        <FeaturePopover feature={feature} />
                      </span>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Search Cars
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}