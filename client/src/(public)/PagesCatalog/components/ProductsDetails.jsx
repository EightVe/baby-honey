import { Button } from "@/components/ui/button";
import { IconLoader, IconShoppingCart, IconX } from "@tabler/icons-react";

export function ProductsDetails({ title, price, onClose, onAddToCart,isLoading }) {
  return (
    <div className="space-y-6 bg-white/80 p-6 rounded-3xl flex flex-col justify-between">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold flex items-start justify-between">
          {title}
          <button
            onClick={onClose}
            className="bg-black text-white rounded-full p-2 hover:bg-black/90"
          >
            <IconX />
          </button>
        </h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{price} DZD</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          className="flex-1 bg-black font-normal uppercase flex items-center justify-between hover:bg-black/90"
          onClick={onAddToCart} 
          disabled={isLoading}// Call onAddToCart when clicked
        >
          
          {isLoading ? <IconLoader  className="stroke-2 h-5 w-5 animate-spin"/> : <IconShoppingCart className="stroke-2 h-5 w-5" />}
          Add to cart
        </Button>
      </div>
    </div>
  );
}
