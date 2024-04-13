import express  from "express"
import { getVideoLink, postVideo, getThumbnailLink, getVideo } from "../controllers/video.js";
import multer from 'multer'

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 150 * 1024 * 1024,
    },
});

router.get("/", (req, res) => {
    res.send("In video Router");
})
router.get("/:id", getVideoLink);
router.post("/newVideo", upload.array('files', 2), postVideo);
router.get("/thumbnail/:id", getThumbnailLink);
router.get("/data/:id", getVideo)

export default router;