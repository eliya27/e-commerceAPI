const Express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemon = require("nodemon");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

const PORT = process.env.PORT || 2000;
dotenv.config();
const app = Express();

//DB
const connect = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("DB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("DB disconnected");
});

//Middlewares
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/ecommerceAPI/api/user/", userRoute);
app.use("/ecommerceAPI/api/auth", authRoute);
app.use("/ecommerceAPI/api/product/", productRoute);
app.use("/ecommerceAPI/api/cart/", cartRoute);
app.use("/ecommerceAPI/api/order/", orderRoute);
app.use("/ecommerceAPI/api/payment/", stripeRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something is wrong";
  return res.status(errorStatus).json({
    succcess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.statck,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`App is live on port ${PORT}`);
});
