//dear reviewer : this website is hosted & maintained by Eightve-Labs LTD registered in Dublin Co-N:97418410, this project api's are hosted on Eightve-Labs API nameservers
//if somehow the api is not connected u may switch it to local-host by going to front-end/libs/axiosInstance.js and change baseURL to '/api'.
//if the local-host is still not connecting to the api switch the baseURL to 'https://bbh-api.eightve.com/api' to use Eightve-Labs nameservers api.
//you may want to check the eightve-labs api health by going to https://bbh-api.eightve.com/api/health if response is 200 OK then everything should be connected.
//This project source code is provided only to Nisantasi Universitesi reviewer(s). if somehow this source code got into the wrong hands please contact us at ceo@eightve.com
//This project is being developed for future production. In the case of any source code leak by nisantasi Universitesi reviewer(s), "Us" "We" Eightve-Labs will take the legal actions against the university reviewer(s).
//FINAL NOTICE : this project has been fully developed by Nizzar Mohamed Hemmach, a Full-Stack (MERN) Intern, at eightve-labs ltd.

import Product from "../models/products.model.js";


export const createProduct = async (req, res) => {
  try {
    const { title, price, image, relatedImages, dataType } = req.body;

    const product = new Product({
      title,
      price,
      image,
      relatedImages,
      dataType,
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

export const fetchProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Sort by creation date (most recent first)
        res.status(200).json({ 
          message: 'Products fetched successfully', 
          products 
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
          message: 'Failed to fetch products', 
          error 
        });
      }
  };