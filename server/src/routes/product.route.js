import {Router} from 'express';
import { addProduct,addProductToCart,getProducts,getCartProducts,deleteCartProduct,getSingleProduct,getUserProducts,getSellProduct,soldProduct } from '../controllers/product.controller.js';
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addproduct").post(
    upload.fields([
        {
            name: "productimage",
            maxCount: 1
        }
    ]),
    addProduct
)

router.route("/addtocart").post(addProductToCart);
router.route("/getproducts").post(getProducts);
router.route("/getcartproducts").post(getCartProducts);
router.route("/deletecartproduct").post(deleteCartProduct);
router.route("/getsingleproduct/:pid").get(getSingleProduct);
router.route("/getuserproducts").post(getUserProducts);
router.route("/getsellproduct/:pid").get(getSellProduct);
router.route("/soldproduct").post(soldProduct);


export default router;