"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";

const dataLabels = {
  "bb-s": "Baby Shooting",
  "pr-s": "Pregnant Shooting",
  "sc-s": "Smash Cake Shooting",
};

const pricingRules = {
  "bb-s": { basePrice: 13000, extraPrice: 4500 },
  "pr-s": { basePrice: 15000, extraPrice: 5000 },
  "sc-s": { basePrice: 17000, extraPrice: 5500 },
};

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const calculateTotals = () => {
    const totals = {};
    cartItems.forEach((item) => {
      const { data, quantity } = item;
      const { basePrice, extraPrice } = pricingRules[data];

      if (!totals[data]) totals[data] = { total: 0, count: 0 };
      totals[data].count += quantity;
      totals[data].total +=
        quantity > 3
          ? basePrice + (quantity - 3) * extraPrice
          : basePrice;
    });
    return totals;
  };

  const totals = calculateTotals();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" className="flex items-center gap-2">
          <IconShoppingCart /> {cartItems.length}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <div className="mt-4">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-md"
                      />
                      <span>{dataLabels[item.data]}</span>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <IconTrash />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(totals).map((key) => (
                  <div key={key} className="flex justify-between">
                    <span>
                      {dataLabels[key]} (x{totals[key].count})
                    </span>
                    <span>${totals[key].total.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
              <div className="font-bold">
                Total: $
                {Object.values(totals)
                  .reduce((sum, curr) => sum + curr.total, 0)
                  .toLocaleString()}
              </div>
            </Card>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
