import Product from '../models/product.model.js';
import { redis } from '../lib/redis.js';
import cloudinary from "../lib/cloudinary.js"

export const getAllProducts =  async (req,res) => {

    try {
        const products = await Product.find({});
        res.json({products});

    } catch (error) {
        console.log("Error in getAllProcuts controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }   
}

export const getFeaturedProducts = async ( req, res) => {
    try {
      let featuredProducts = await redis.get("featuted_products")
      if(featuredProducts) {
        return res.json(JSON.parse(featuredProducts));
      }

      featuredProducts = await Product.find({isFeatured:true}).lean(); //lean returns plain javascript object instead of mongodb document
      if(!featuredProducts) {
        return res.status(404).json({message : "No Featured producuts found"});
      }
      await redis.set("featured_products", JSON.stringify(featuredProducts));
      res.json(featuredProducts);
    } catch(error) {
        console.log("Error in getFeatureProducts contoller", error.message);
        res.status(500).json({message : "Server Error", error: error.message})

    }
}

export const createProduct = async(req, res) => {
    try {
        const {name, description, price, image, category} = req.body;
        let cloudinaryResponse = null

        if(image) {
            cloudinaryResponse = await cloudinary.uploader(image, {folder: "products"})
        }
        
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })
        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({message: "Server error", error:error.message})
    }

}

export const deleteProduct = async( req, res ) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(404).json({ message: " Product not  found"});
        }

        if(product.image) {
            const publicId = product.image.split("/").pop.split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Deleted image from cloudinary")
            } catch(error) {
                console.log("Error deleting image from cloudinary")
            }
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted successfully"})
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error:error.message})
    }
}

export const getRecommendedProducts = async( req,res) => {
    try {

        const product = await Product.aggregate([
            {
                $sample: { size : 3}
            },
            {
                $project: {
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
           
        ])
        res.json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message);
        res.status(500).json({ message : "Server error" , error: error.message});
    }
}

export const getProductsByCategory = async(req, res) => {
    const { category } = req.params.category;

    try {
       const products = await Product.find({category});
        res.json(products);
    } catch( error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", error:error.message})
    }
}

export const toggleFeaturedProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            product.isFeatured = !product.isFeatured;

            const updateProduct  = await product.save();
            await updateFeaturedProductsCache();
            res.json(updateProduct);
        } else {
            res.status(404).json({ message: "Product not found"});
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", error:error.message})
    }

}

async function updateFeaturedProductsCache () {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts))
    } catch(error) {
        console.log("error in updateFeaturedProductsCache");
    }
}