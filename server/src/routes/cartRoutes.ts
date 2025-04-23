import { Router } from "express";
import { clearCart, getCart, updateCart } from "../controllers/cartController";

const router = Router();

router.get("/", getCart);
router.post("/", updateCart);
router.delete("/", clearCart);

export default router;