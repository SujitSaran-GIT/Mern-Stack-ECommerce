import express from "express";
import formidable from "express-formidable";

const router = express.Router()
import { authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { 
    addProduct, 
    updateProductDetails, 
    removeProduct, 
    fetchProducts, 
    fetchProductsById, 
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts
} from "../controllers/productController.js";

router.route("/").get(fetchProducts).post(authenticate,authorizeAdmin,formidable(), addProduct)

router.route("/allproducts").get(fetchAllProducts)
// remove the authorizeAdmin bcz all user will give their reviews
router.route("/:id/reviews").post(authenticate,checkId,addProductReview)

router.get("/top",fetchTopProducts)
router.get("/new",fetchNewProducts)

router.route("/:id").get(fetchProductsById).put(authenticate, authorizeAdmin, formidable(), updateProductDetails)

router.route("/:id").delete(authenticate, authorizeAdmin, removeProduct)


export default router