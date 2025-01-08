import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { ArrowUpRight, TriangleAlert } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ProductsImages } from './components/ProductsImages';
import { ProductsDetails } from './components/ProductsDetails';
import axiosInstance from '@/lib/axiosInstance';
import { AuthContext } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
const PregnantShooing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState('pg-s'); // Default value
  const {user}=useContext(AuthContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Append the selected dataType to the API request URL as a query parameter
        const response = await axiosInstance.get(`/products/fetch?dataType=${selectedDataType}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [selectedDataType]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product) => {
    setIsLoading(true); // Start loading

    try {
      const userId = user?._id; // Replace this with the actual user ID
      const data = {
        userId,
        productId: product._id,
        category: product.category,
      };

      const response = await axiosInstance.post('/cart/add-item', data); // Call backend API to add the item to the cart
      console.log(response.data);
      toast.success("Added to cart!")
      window.location.reload(); // Handle success response
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Item is already on cart. or an error accured!")
    } finally {
      setIsLoading(false); // Stop loading after API call
    }
  };
  
  return (
    <>
    <div className="grid place-content-center px-4 py-24 text-black">
      <h1 className="max-w-2xl text-center text-5xl leading-snug">
      Choose{" "}
        <span className="relative">
        Models
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-3 -right-3 -top-3 bottom-0 translate-y-4"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#38bdf8"
              strokeWidth="3"
            />
          </svg>
        </span>{" "}
        for Your Little One.
      </h1>
    </div>
    <div className="container mx-auto p-4">
    {products.length === 0 ? (<div className='w-full flex items-center justify-center flex-col'>

      <TriangleAlert className='h-10 w-10 text-gray-400 stroke-1'/>
      <p className='text-gray-400'>No products available at the moment for the selected category.</p>
    </div>) :
    
    
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
            <Card
              key={product._id}
              className="group overflow-hidden rounded-xl cursor-pointer"
              onClick={() => handleSelectProduct(product)}
            >
              <CardContent className="p-0 relative aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                  <h3 className="text-white font-semibold text-lg">{product.title}</h3>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-2 group-hover:bg-white/50 duration-300">
                    <ArrowUpRight className="text-white w-10 h-10 opacity-100 group-hover:text-fuchsia-100 transition-opacity duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>}
    </div>
    {selectedProduct && (
        <div className="bg-fuchsia-100/50 backdrop-blur-xl min-h-screen w-full fixed top-0">
          <main className="grid grid-cols-1 md:grid-cols-[3fr,1fr] gap-4 p-6 min-h-screen">
            <ProductsImages relatedImages={selectedProduct.relatedImages} />
            <ProductsDetails
              title={selectedProduct.title}
              price={selectedProduct.price}
              onClose={handleCloseDetails}
              isLoading={isLoading}
              onAddToCart={() => handleAddToCart(selectedProduct)}
            />
          </main>
        </div>
      )} 
    
    </>
  )
}

export default PregnantShooing