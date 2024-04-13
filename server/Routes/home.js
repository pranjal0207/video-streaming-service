import express  from "express"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("In home Router");
})

export default router;