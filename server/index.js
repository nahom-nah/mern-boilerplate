const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const authRouter = require("./router/authRoutes");
const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    cookie: {
      sameSite: "lax",
      httpOnly: true,
    },
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
);
dotenv.config({ path: path.join(__dirname, "/.env") });
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

require("./config/database");
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`server is up and running on port: ${port}`);
});
