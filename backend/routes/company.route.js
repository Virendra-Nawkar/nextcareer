import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompnay, getCompnaybyId, registerCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompnay);
router.route("/get/:id").get(isAuthenticated, getCompnaybyId);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router; 