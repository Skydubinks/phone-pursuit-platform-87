
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 1199,
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1695578130391-929e9e24f7d7?q=80&w=1000",
    isNew: true,
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000",
    isNew: true,
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro", 
    price: 999,
    brand: "Google",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000",
  },
  {
    id: "4",
    name: "OnePlus 12",
    price: 899,
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1533228100845-08145b01de14?q=80&w=1000",
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-background py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Découvrez les derniers smartphones
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Les meilleurs téléphones au meilleur prix. Livraison gratuite et garantie 2 ans sur tous nos produits.
                  </p>
                  <div className="mt-4">
                    <Link to="/admin">
                      <Button variant="outline">
                        Accès Administrateur
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[400px] rotate-6">
                <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100">
                  <img
                    alt="Latest iPhone"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1695578130391-929e9e24f7d7?q=80&w=1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos produits vedettes</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-500">© 2024 Phone Pursuit. Tous droits réservés.</p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-sm hover:underline" href="/terms">
              Conditions
            </a>
            <a className="text-sm hover:underline" href="/privacy">
              Confidentialité
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
