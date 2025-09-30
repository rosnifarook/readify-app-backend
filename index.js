const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL,'http://localhost:5173'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats");
const verifyAdminToken = require("./src/middleware/verifyAdminToken");

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", verifyAdminToken, adminRoutes)


app.get("/", (req, res) => {
    res.send("Book Store Server is running!");
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => console.log("Mongodb connect successfully!"))
  .catch(err => console.log(err));

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

if (process.env.VERCEL) {
  module.exports = app; // for @vercel/node on Vercel
} else {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });
}