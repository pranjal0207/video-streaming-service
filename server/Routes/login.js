import express  from "express";
import { postUser } from "../controllers/user.js";
import { login } from "../controllers/login.js";

const router = express.Router();

router.get("/", login);
router.post("/register", postUser);

export default router;