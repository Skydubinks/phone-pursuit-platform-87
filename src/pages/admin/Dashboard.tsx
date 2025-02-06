
import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Box, 
  BarChart3, 
  LogOut,
  Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

const DashboardLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
  <Link
    to={to}
    className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
  >
    <Icon className="h-4 w-4" />
    {children}
  </Link>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }

      const { data: adminProfile } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!adminProfile) {
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col border-r bg-gray-100/40 dark:bg-gray-800/40 lg:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link
            className="flex items-center gap-2 font-semibold"
            to="/admin"
          >
            <Package className="h-6 w-6" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <DashboardLink to="/admin/products" icon={Package}>Products</DashboardLink>
          <DashboardLink to="/admin/orders" icon={ShoppingCart}>Orders</DashboardLink>
          <DashboardLink to="/admin/customers" icon={Users}>Customers</DashboardLink>
          <DashboardLink to="/admin/inventory" icon={Box}>Inventory</DashboardLink>
          <DashboardLink to="/admin/reports" icon={BarChart3}>Reports</DashboardLink>
        </nav>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile header with menu */}
      <div className="flex w-full flex-col lg:hidden">
        <header className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  to="/admin"
                >
                  <Package className="h-6 w-6" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                <DashboardLink to="/admin/products" icon={Package}>Products</DashboardLink>
                <DashboardLink to="/admin/orders" icon={ShoppingCart}>Orders</DashboardLink>
                <DashboardLink to="/admin/customers" icon={Users}>Customers</DashboardLink>
                <DashboardLink to="/admin/inventory" icon={Box}>Inventory</DashboardLink>
                <DashboardLink to="/admin/reports" icon={BarChart3}>Reports</DashboardLink>
              </nav>
              <div className="border-t p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-4 flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>Admin Dashboard</span>
          </div>
        </header>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
