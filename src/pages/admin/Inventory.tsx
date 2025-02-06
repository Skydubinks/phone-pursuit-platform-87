
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StockMovement {
  id: string;
  product_id: string;
  quantity: number;
  type: 'in' | 'out';
  reason: string;
  created_at: string;
  created_by: string;
}

const InventoryManagement = () => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStockMovements = async () => {
      const { data, error } = await supabase
        .from("stock_movements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch stock movements",
        });
        return;
      }

      // Validate and type cast the data
      const validatedData = data.map(movement => ({
        ...movement,
        type: movement.type === 'in' ? 'in' as const : 'out' as const
      }));

      setStockMovements(validatedData);
    };

    fetchStockMovements();
  }, [toast]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Movement ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockMovements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>{movement.id}</TableCell>
                <TableCell>
                  <span className={movement.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                    {movement.type.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell>{movement.reason}</TableCell>
                <TableCell>{new Date(movement.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryManagement;
