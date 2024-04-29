import {Router} from "express";
import {addBid,getBids} from "../controllers/bid.controller.js";

const router = Router();

router.route("/addbid").post(addBid);
router.route("/getbids").post(getBids);

export default router;