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

dotenv.config({ path: path.join(__dirname, "/.env") });
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: "qid",
    cookie: {
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
    saveUninitialized: false,
    secret: process.env.SECRET,
    resave: false,
  })
);

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
