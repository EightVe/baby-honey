import React, { useState, useEffect, useContext } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { IconShoppingCart, IconTrash } from '@tabler/icons-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import axiosInstance from '@/lib/axiosInstance'
import { AuthContext } from '@/contexts/AuthContext'
import toast from 'react-hot-toast' // Import react-hot-toast

const UserCart = () => {
  const { user } = useContext(AuthContext) // Get user context
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Data type descriptions
  const dataTypeDescriptions = {
    'bb-s': 'Baby Shooting',
    'pg-s': 'Pregnant Shooting',
    'sc-s': 'Smash Cake'
  }

  // Fetch cart items when the component mounts
  useEffect(() => {
    if (!user) return; // If no user, don't fetch cart

    const fetchCartItems = async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.get(`/cart/get`, { params: { userId: user._id } })
        setCartItems(response.data.getUserCart)
      } catch (err) {
        setError("Failed to fetch cart items.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [user])

  // Group cart items by dataType
  const groupedItems = cartItems.reduce((acc, item) => {
    const productId = item?.productId;  // Safely access productId
    if (!productId) return acc;  // If no productId, skip this item

    const { dataType } = productId;
    if (!acc[dataType]) acc[dataType] = [];
    acc[dataType].push(item);
    return acc;
  }, {})

  // Delete a single item from the cart
  const deleteItem = async (id) => {
    try {
      await axiosInstance.post('/cart/delete-item', { userId: user._id, productId: id })
      setCartItems(prevItems => prevItems.filter(item => item.productId._id !== id))
      toast.success('Item removed from cart!')
    } catch (err) {
      toast.error('Failed to remove item')
      console.error(err)
    }
  }

  // Clear the entire cart
  const clearCart = async () => {
    try {
      await axiosInstance.delete('/cart/empty', { data: { userId: user._id } })
      setCartItems([])
      toast.success('Cart cleared!')
    } catch (err) {
      toast.error('Failed to clear the cart')
      console.error(err)
    }
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.productId?.price || 0;  // Fallback to 0 if price is undefined
    const quantity = item.quantity || 0;  // Fallback to 0 if quantity is undefined
    return total + price * quantity;
  }, 0);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="transparent" size="icon" className="relative">
          <IconShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 p-2 h-4 text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>Review or modify your selected items</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[60vh] px-4">
          {isLoading ? (
            <div className="text-center py-4">Loading cart...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-4">Your cart is empty.</div>
          ) : (
            Object.keys(groupedItems).map((dataType) => (
              <div key={dataType} className="py-4">
                <h3 className="text-lg">{dataTypeDescriptions[dataType]}</h3>
                <div className="space-y-4">
                  {groupedItems[dataType].map((item) => (
                    <div key={item.productId._id} className="flex items-center space-x-4 py-2">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{item.productId.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.productId.category}</p>
                        <p className="font-medium">${item.productId.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteItem(item.productId._id)}
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </ScrollArea>

        <Separator className="my-4" />
        <div className="space-y-4 px-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            <Button className="w-full">Checkout</Button>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default UserCart
