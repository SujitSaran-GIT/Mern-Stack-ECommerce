import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description, price, category, quantity, brand} = req.fields;
        switch (true) {
            case !name:
                return res.json({error: "Name is required"})
            case !brand:
                return res.json({error: "Brand is required"})
            case !description:
                return res.json({error: "Description is required"})
            case !price:
                return res.json({error: "Price is required"})            
            case !category:
                return res.json({error: "Category is required"})
            case !quantity:
                return res.json({error: "Quantity is required"})
            
        }

        const product = new Product({...req.fields})
        await product.save()
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const updateProductDetails = asyncHandler(async (req,res) => {
    try {
        const {name, description, price, category, quantity, brand} = req.fields;
        switch (true) {
            case !name:
                return res.json({error: "Name is required"})
            case !brand:
                return res.json({error: "Brand is required"})
            case !description:
                return res.json({error: "Description is required"})
            case !price:
                return res.json({error: "Price is required"})            
            case !category:
                return res.json({error: "Category is required"})
            case !quantity:
                return res.json({error: "Quantity is required"})
        }    
        const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(404).json(error.message)
    }
})

const removeProduct = asyncHandler(async (req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "server error"})
    }
})
export {addProduct, updateProductDetails, removeProduct}