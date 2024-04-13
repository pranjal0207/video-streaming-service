import express  from "express"
import cors from 'cors';
import home from "./routes/home.js"
import user from "./routes/user.js"
import video from "./routes/video.js"
import login from "./Routes/login.js"

const app = express();
var port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", home);
app.use("/user", user);
app.use("/video", video);
app.use("/login", login);

app.listen(port, () => {console.log("Server started on port 5001")});

