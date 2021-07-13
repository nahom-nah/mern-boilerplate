const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const authRouter = require("./router/authRoutes");

const app = express();

dotenv.config({ path: path.join(__dirname, "/.env") });
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

require("./config/database");
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`server is up and running on port: ${port}`);
});
