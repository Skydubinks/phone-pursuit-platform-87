
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, MessageCircle } from "lucide-react";

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
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Bonjour, je souhaite commander le produit suivant:\n\n` +
      `${product.name}\n` +
      `Marque: ${product.brand}\n` +
      `Prix: ${product.price} €`
    );
    // Ajout du numéro WhatsApp (format international sans le +)
    const whatsappUrl = `https://wa.me/33612345678?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

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
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button className="flex-1 gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" />
          Panier
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          className="flex-1 gap-2"
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
