
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  default_shipping_address: string;
  created_at: string;
}

const CustomersManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from("customer_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch customers",
        });
        return;
      }

      setCustomers(data);
    };

    fetchCustomers();
  }, [toast]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers Management</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.first_name} {customer.last_name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.default_shipping_address}</TableCell>
                <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersManagement;
