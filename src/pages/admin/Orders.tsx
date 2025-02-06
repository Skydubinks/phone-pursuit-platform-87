
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  customer_id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: string;
  created_at: string;
  payment_method: 'card' | 'cash' | 'transfer';
}

const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch orders",
        });
        return;
      }

      setOrders(data);
    };

    fetchOrders();
  }, [toast]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders Management</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <span className={`capitalize ${
                    order.status === 'delivered' ? 'text-green-600' :
                    order.status === 'cancelled' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.total_amount} €</TableCell>
                <TableCell className="capitalize">{order.payment_method}</TableCell>
                <TableCell>{order.shipping_address}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersManagement;

