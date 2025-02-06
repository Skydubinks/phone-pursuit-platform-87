
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    isNew?: boolean;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("product-card", className)}>
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {product.isNew && (
            <Badge className="absolute right-2 top-2" variant="secondary">
              Nouveau
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <p className="text-lg font-bold">{product.price} €</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
}
