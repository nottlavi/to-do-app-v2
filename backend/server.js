const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
//importing and connecting to db here
const database = require("./config/database").connect();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const taskRoutes = require("./routes/taskRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//the home page api
app.get("/", (req, res) => {
  res.send("server is running, go check db");
});
//the local apis
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.listen(PORT, () => {
  console.log("server started on port no.:", PORT);
});
