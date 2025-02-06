
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SalesData {
  date: string;
  total: number;
}

const SalesReports = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSalesData = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("created_at, total_amount")
        .order("created_at", { ascending: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch sales data",
        });
        return;
      }

      // Group sales by date
      const groupedData = data.reduce((acc: Record<string, number>, order) => {
        const date = new Date(order.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + order.total_amount;
        return acc;
      }, {});

      // Convert to chart data format
      const chartData = Object.entries(groupedData).map(([date, total]) => ({
        date,
        total,
      }));

      setSalesData(chartData);
    };

    fetchSalesData();
  }, [toast]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales Reports</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <BarChart
                width={500}
                height={300}
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Sales (€)" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesReports;
