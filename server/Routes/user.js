import { getUser, postUser } from '../controllers/user.js';
import express  from "express"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("In user Router");
})
router.get("/:id", getUser)
router.post("/newUser", postUser)

export default router;